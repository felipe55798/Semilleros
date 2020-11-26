import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { PasswordService } from 'src/app/services/password.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {

  validation_messages = {
    'email': [
        { type: 'required', message: 'El correo es obligatorio.' },
        { type: 'pattern', message: 'Formato de correo incorrecto.' }
      ]
  } 
  data = new FormGroup({
    email: new FormControl('', Validators.compose([
      Validators.required, 
      Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
    ]))
  });
  error_unprocesable = {
    email:null
  };
  sending:boolean = false;
  constructor(private passwordService:PasswordService,
              private toastController:ToastController,
              private navController:NavController) { }

  ngOnInit() {
  }

  resetPassword(){
    this.sending = true;
    this.passwordService.resetPassword(this.data.value).subscribe(
      res => this.handleResponse(res),
      err => this.handleError(err)
    )
  }

  handleResponse(response) {
    this.sending = false;
    this.navController.navigateForward('/auth/recover');
    this.alertResponse(response.message, 'success', 'Hecho');
  }

  handleError(error) {
    this.sending = false;
    console.error(error);
    if (error.status === 422) {
      this.error_unprocesable = error.error.errors;
    }else{
      console.log(error);
      this.alertResponse(error.error.message, 'danger', 'Error');
    }
  }

  async alertResponse(message:string, color:string, header:string) {
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
