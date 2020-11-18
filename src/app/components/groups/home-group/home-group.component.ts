import { Component, Input, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Group } from 'src/app/interfaces/group';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { GroupsService } from 'src/app/services/groups.service';
import { RefreshService } from 'src/app/services/refresh.service';

@Component({
  selector: 'app-home-group',
  templateUrl: './home-group.component.html',
  styleUrls: ['./home-group.component.scss'],
})
export class HomeGroupComponent implements OnInit {
  slidesOpts = {
    slidesPerView:1.1,
    freeMode:true,
    spaceBetween:-10
  };
  groups:Group[] = [];

  loading:boolean = false;
  admin:boolean = false;

  @Input() user:User = null;

  constructor(private groupService:GroupsService,
              private authService:AuthService,
              private refreshService: RefreshService) { }

  ngOnInit() {
    this.validRole()
    this.authService.loginEvent.subscribe(res=>{
      if (res) {
        this.authService.getUser().subscribe(user=>{
          this.user = user;
          this.validRole()
        })
      }
    })

    this.authService.logoutEvent.subscribe(res=>{
      if (res) {
        this.user = null;
        this.admin = false;
      }
    })

    this.getGroups()

    this.refreshService.refresh.subscribe(
      (res:string)=>{
        if (res === "groups") {
          this.getGroups()
        }
      }
    )
  }

  validRole(){
    if (this.user) {
      if (this.user.roles[0].id === 1) {
        this.admin = true;
      }
    }
  }

  getGroups() {
    this.loading = true;
    this.groupService.getGroupsList().subscribe(
      response =>this.handleResponse(response), 
      err => this.handleError(err)
    );
  }
  handleResponse(response) {
    this.groups = response.groups;
    this.loading = false;
  }
  
  handleError(error: any) {
    console.error(error);
    this.loading = false;
  }

}
