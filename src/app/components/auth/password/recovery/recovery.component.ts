import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { PasswordService } from 'src/app/services/password.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss'],
})
export class RecoveryComponent implements OnInit {

  @Input() resetPassword = {};
  validation_messages = {
    'password': [
      { type: 'required', message: 'La contraseña es obligatoria.' },
      { type: 'minlength', message: 'La contraseña debe contener minimo 8 digitos'}
    ],
    'password_confirmation': [
      { type: 'required', message: 'Confirme la contraseña.' }
    ]
  }
  data = new FormGroup({
    password: new FormControl('',Validators.compose([
      Validators.required,
      Validators.minLength(8)
    ])),
    password_confirmation: new FormControl('',Validators.required),
    email: new FormControl('', Validators.required),
    token: new FormControl('', Validators.required)
  })
  error = {
    email: null,
    token: null,
    password: null,
    password_confirmation : null,
  };
  sending:boolean = false;
  constructor(private passwordService:PasswordService,
              private navCtrl:NavController,
              private toastController: ToastController) { }

  ngOnInit() {
    this.data.get('email').setValue(this.resetPassword['email'])
    this.data.get('token').setValue(this.resetPassword['token'])
  }

  recoverPassword(){
    this.sending = true;
    this.passwordService.recoverPassword(this.data.value).subscribe(
      res => this.handleResponse(res),
      err => this.handleError(err)
    )
  }

  async handleResponse(response){
    this.sending = false;
    this.alertResponse(response.message, 'success', 'Restablecimiento Correcto');
    this.navCtrl.navigateRoot('/auth')
  }

  handleError(error) {
    this.sending = false;
    console.error(error);
    if (error.status === 422) {
      this.error = error.error.errors;
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
