import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  validation_messages = {
    'name': [
      { type: 'required', message: 'El nombre es obligatorio.' }
    ],
    'lastname': [
      { type: 'required', message: 'El apellido es obligatorio.' }
    ],
    'email': [
        { type: 'required', message: 'El correo es obligatorio.' },
        { type: 'pattern', message: 'Formato de correo incorrecto.' }
      ],
    'password': [
      { type: 'required', message: 'La contraseña es obligatoria.' },
      { type: 'minlength', message: 'La contraseña debe contener minimo 8 digitos'}
    ],
    'password_confirmation': [
      { type: 'required', message: 'Confirme la contraseña.' }
    ],
    'cellphone':[
      { type: 'required', message: 'El número de celular es obligatorio.' },
      { type: 'pattern', message: 'Formato incorrecto.' }
    ]
  }

  user = new FormGroup({
    name: new FormControl('',Validators.required),
    lastname: new FormControl('',Validators.required),
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
    ])),
    password: new FormControl('',Validators.compose([
      Validators.required,
      Validators.minLength(8)
    ])),
    password_confirmation: new FormControl('',Validators.required),
    cellphone: new FormControl('',Validators.compose([
      Validators.required,
      Validators.pattern("[0-9 ]{10}")
    ])),
    program_id: new FormControl(1)
  })

  error:User = {};

  constructor(private authService:AuthService,
              private navCtrl:NavController,
              public toastController: ToastController) { }

  ngOnInit() {}

  register(){
    this.authService.register(this.user.value).subscribe(
      res=>this.handleResponse(res),
      err=>this.handleError(err)
    )
  }

  handleResponse(data){
    this.navCtrl.navigateRoot('/tabs/tab1');
  }

  handleError(err){
    if (err.status === 422) {
      this.error = err.error.errors;
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
