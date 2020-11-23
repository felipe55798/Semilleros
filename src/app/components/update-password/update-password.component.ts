import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnInit {

  validation_messages = {
    'password': [
      { type: 'required', message: 'La contraseña es obligatoria.' },
      { type: 'minlength', message: 'La contraseña debe contener minimo 8 digitos'}
    ],
    'new_password': [
      { type: 'required', message: 'La contraseña es obligatoria.' },
      { type: 'minlength', message: 'La contraseña debe contener minimo 8 digitos'}
    ],
    'new_password_confirmation': [
      { type: 'required', message: 'Confirme la contraseña.' }
    ]
  }
  data = new FormGroup({
    password: new FormControl('',Validators.compose([
      Validators.required,
      Validators.minLength(8)
    ])),
    new_password: new FormControl('',Validators.compose([
      Validators.required,
      Validators.minLength(8)
    ])),
    new_password_confirmation: new FormControl('',Validators.required)
  })
  error = {
    password: null,
    new_password: null,
    new_password_confirmation : null,
  };
  sending:boolean = false;
  @Input() loggedUser : User = {};
  constructor(private authService:AuthService,
    private userService:UserService,
    private navCtrl:NavController,
    private toastController: ToastController) { }

  ngOnInit() {
  }

  resetPassword(){
    this.sending = true;
    this.userService.updatePassword(this.data.value).subscribe(
      res=>this.handleResponse(res),
      err=>this.handleError(err)
    )
  }

  async handleResponse(data){
    this.sending = false;
    this.authService.refreshUser();
    this.navCtrl.navigateRoot('/tabs/tab3');
    this.alertError(data.message, 'success', 'Hecho');
  }

  handleError(err){
    this.sending = false;
    if (err.status === 422) {
      this.error = err.error.errors;
    }else{
      this.alertError(err.error.message, 'danger', 'Error');
    }
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
