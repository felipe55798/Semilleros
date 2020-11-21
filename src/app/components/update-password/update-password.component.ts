import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

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
  user = new FormGroup({
    password: new FormControl('',Validators.compose([
      Validators.required,
      Validators.minLength(8)
    ])),
    new_password: new FormControl('',Validators.compose([
      Validators.required,
      Validators.minLength(8)
    ])),
    new_password_confirmation: new FormControl('',Validators.required),
    cellphone: new FormControl('',Validators.compose([
      Validators.required,
      Validators.pattern("[0-9 ]{10}")
    ]))
  })
  error:User = {};
  sending:boolean = false;
  constructor(private authService:AuthService,
    private navCtrl:NavController,
    private toastController: ToastController) { }

  ngOnInit() {}

  updatePassword(){
    this.sending = true;
    this.authService.register(this.user.value).subscribe(
      res=>this.handleResponse(res),
      err=>this.handleError(err)
    )
  }

  handleResponse(data){
    this.sending = false;
    this.navCtrl.navigateRoot('/tabs/tab1');
  }

  handleError(err){
    this.sending = false;
    if (err.status === 422) {
      this.user = err.error.errors;
    }else{
      this.alertError(err.error.message);
    }
  }

  async alertError(message:string) {
    const toast = await this.toastController.create({
      header: 'Error',
      message: message,
      position: 'top',
      animated:true,
      color:'danger',
      duration:4000,
      cssClass:'alert-error'
    });
    toast.present();
  }

}
