import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Program } from 'src/app/interfaces/program';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProgramService } from 'src/app/services/program.service';
import { RefreshService } from 'src/app/services/refresh.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  
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
    id: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required),
    lastname: new FormControl('',Validators.required),
    cellphone: new FormControl('',Validators.compose([
      Validators.required,
      Validators.pattern("[0-9 ]{10}")
    ])),
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
    ]))
  })
  error:User = {};
  @Input() loggedUser : User = {};
  sending:boolean = false;
  programs:Program[] = [];

  constructor(private authService:AuthService,
    private userService: UserService,
    private navCtrl:NavController,
    private toastController: ToastController,
    private programService: ProgramService,
    private refreshService: RefreshService) { }

  ngOnInit() {
    this.getPrograms();
    this.changeValues();
  }

  getPrograms(){
    this.programService.getPrograms().subscribe(
      (res:any)=>{
        this.programs = res.programs;
      },
      (err)=>{
        this.alertError('Error en el servidor, por favor intente más tarde', 'danger', 'Error');
      }
    );
  }

  changeValues() {
    const {id, name, lastname, cellphone, email}= this.loggedUser;
    const user = {
      id, 
      name, 
      lastname,
      cellphone,
      email
    }
    this.user.setValue(user);
  }


  update(){
    this.sending = true;
    this.userService.updateUser(this.user.value, this.loggedUser.id).subscribe(
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
