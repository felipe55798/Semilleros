import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Seedling } from 'src/app/interfaces/seedling';
import { RefreshService } from 'src/app/services/refresh.service';
import { ToastController } from '@ionic/angular';

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
    private refreshService: RefreshService,
    private toastController: ToastController) { }

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
    this.alertError('Error en el servidor, por favor intente más tarde', 'danger', 'Error');
  }

  refreshUser() {
    this.authService.refreshUser();
  }

  doRefresh(event){
    this.refreshUser();
    event.target.complete()
  }

  async alertError(message:string, color:string, header:string) {
    const toast = await this.toastController.create({
      header,
      message,
      position: 'top',
      animated:true,
      color,
      duration:4000,
      cssClass:'alert-error'
    });
    toast.present();
  }

}
