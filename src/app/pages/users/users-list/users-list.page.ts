import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Seedling } from 'src/app/interfaces/seedling';
import { RefreshService } from 'src/app/services/refresh.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.page.html',
  styleUrls: ['./users-list.page.scss'],
})
export class UsersListPage implements OnInit {

  teachers:User[] = [];
  seedlings:Seedling[] = [];
  admin:boolean = false;
  specific:boolean = false;
  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private refreshService: RefreshService) { }

  ngOnInit() {
    this.getTeachersList();
    this.refreshUser();
    this.getUserInfo();
    this.refreshService.updated.subscribe(
      res => this.getUserInfo()
    )
  }

  getTeachersList(){
    this.userService.getTeachers().subscribe(
      res => this.handleResponse(res),
      err => this.handleError(err)
    );
  }

  getUserInfo(){
    this.authService.getUser().subscribe(
      res => {
        if (res) {
          if (res.roles[0].id === 1) {
            this.admin = true;
          }else{
            if (res.roles[0].id === 3 || res.roles[0].id === 2) {
              this.specific = true;
              this.seedlings = res.assigned_seedlings;
            }
          }
        }
      }
    )
  }

  handleResponse(response) {
    this.teachers = response.teachers;
  }
  
  handleError(error: any) {
    console.error(error);
  }

  refreshUser() {
    this.authService.refreshUser();
  }

  doRefresh(event){
    this.refreshUser();
    event.target.complete()
  }

}
