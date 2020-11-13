import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Program } from 'src/app/interfaces/program';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProgramService } from 'src/app/services/program.service';

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
    ],
    'program_id':[
      { type: 'required', message: 'El programa acádemico es obligatorio.' },
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
    program_id: new FormControl('',Validators.required)
  })

  error:User = {};

  sending:boolean = false;

  programs:Program[] = [];

  constructor(private authService:AuthService,
              private navCtrl:NavController,
              private toastController: ToastController,
              private programService: ProgramService) { }

  ngOnInit() {
    this.programService.getPrograms().subscribe(
      (res:any)=>{
        this.programs = res.programs;
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  register(){
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
