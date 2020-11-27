import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.page.html',
  styleUrls: ['./single-user.page.scss'],
})
export class SingleUserPage implements OnInit {

  id: string;
  user:User = null;
  constructor(private route: ActivatedRoute,
    public apiService: UserService,
    private toastController: ToastController) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getUser();
  }

  getUser(){
    return this.apiService.getUser(this.id).subscribe(
      res => this.handleResponse(res),
      err => this.handleError(err)
    );
  }

  handleResponse(response) {
    this.user = response.user;
  }
  
  handleError(error: any) {
    this.alertError('Error en el servidor, por favor intente más tarde', 'danger', 'Error');
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