import { Component, Input, OnInit } from '@angular/core';
import { Seedling } from 'src/app/interfaces/seedling';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { RefreshService } from 'src/app/services/refresh.service';
import { SeedlingsService } from 'src/app/services/seedlings.service';

@Component({
  selector: 'app-home-seedling',
  templateUrl: './home-seedling.component.html',
  styleUrls: ['./home-seedling.component.scss'],
})
export class HomeSeedlingComponent implements OnInit {
  seedlings: Seedling[] = [];

  slidesOpts = {
    slidesPerView:1.1,
    freeMode:true,
    spaceBetween:-10
  };

  admin:boolean = false;

  loading:boolean = false;
  @Input() user:User = null;
  constructor(private seedlingService:SeedlingsService,
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
    this.getSeedlings(); 

    this.refreshService.refresh.subscribe(
      (res:string)=>{
        if (res === "seedlings") {
          this.getSeedlings()
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

  getSeedlings() {
    this.loading = true;
    this.seedlingService.getLatest().subscribe(
      response => this.handleResponse(response), 
      err => this.handleError(err)
    );
  }

  handleResponse(response) {
    this.seedlings = response.seedlings;
    this.loading = false;
  }

  handleError(error: any) {
    console.error(error);
    this.loading = false;
  }
}
