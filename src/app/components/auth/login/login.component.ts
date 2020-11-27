import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  error_unprocesable = {
    email:null,
    password:null
  };
  validation_messages = {
    'email': [
        { type: 'required', message: 'El correo es obligatorio' },
        { type: 'pattern', message: 'Formato de correo incorrecto.' }
      ],
      'password': [
        { type: 'required', message: 'La contraseña es obligatoria.' }
      ],
  } 

  data = new FormGroup({
    email: new FormControl('',Validators.compose([
      Validators.required,
      Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
    ])),
    password: new FormControl('',Validators.required)
  })

  sending:boolean = false;


  constructor(private authService:AuthService,
              private navCtrl:NavController,
              public toastController: ToastController) { }

  ngOnInit() {}

  login(){
    if (this.sending) {
      return;
    }
    this.sending = true;
    this.authService.login(this.data.value).subscribe(
      res=>this.handleResponse(res),
      err=>this.handleError(err)
    )
  }

  handleResponse(data){
    this.sending = false;
    this.navCtrl.navigateRoot('/tabs/tab1',{
      animated:true,
      animationDirection:'forward',
    });
  }

  handleError(err){
    this.sending = false;
    if (err.status === 422) {
      this.error_unprocesable = err.error.errors;
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
