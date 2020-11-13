import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.page.html',
  styleUrls: ['./users-form.page.scss'],
})
export class UsersFormPage implements OnInit {

  error:User = {};

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

  constructor() { }

  createUser(){

  }

  ngOnInit() {
  }

}
