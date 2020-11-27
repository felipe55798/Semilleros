import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Department } from 'src/app/interfaces/department';
import { Role } from 'src/app/interfaces/role';
import { User } from 'src/app/interfaces/user';
import { DepartmentService } from 'src/app/services/departments.service';
import { RefreshService } from 'src/app/services/refresh.service';
import { RoleService } from 'src/app/services/role.service';
import { UserService } from 'src/app/services/user.service';

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
    'role_id':[
      { type: 'required', message: 'El programa acádemico es obligatorio.' },
    ],
    'department_id':[
      { type: 'required', message: 'El departamento acádemico es obligatorio.' },
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
    role_id: new FormControl('',Validators.required),
    department_id: new FormControl('',Validators.required)
  })

  roles:Role[] = [];
  departments:Department[] = [];

  sending:boolean = false;

  constructor(private roleService:RoleService,
              private userService:UserService,
              private toastCtrl:ToastController,
              private navCtrl:NavController,
              private refreshService: RefreshService,
              private departmentService: DepartmentService
  ) { }

  ngOnInit() {
    this.getRoles();
    this.getDepartments();
  }

  getRoles(){
    this.sending = true;
    this.roleService.index().subscribe(
      res=>this.handleResponse(res),
      err=>this.handleError(err)
    )
  }
  handleResponse(res){
    this.sending = false;
    this.roles = res.roles;
  }

  handleError(err){
    this.sending = false;
    this.handleErrorCreate(err);
  }

  getDepartments(){
    this.departmentService.getDepartmentsList().subscribe(
      res=>this.handleResponseDepartments(res),
      err=>this.handleErrorDepartments(err)
    )
  }
  handleResponseDepartments(res){
    this.departments = res.departments;
  }

  handleErrorDepartments(err){
    this.handleErrorCreate(err);
  }

  createUser(){
    this.sending = true;
    this.userService.createUser(this.user.value).subscribe(
      res=>this.handleResponseCreate(res),
      err=>this.handleErrorCreate(err)
    )
  }

  async handleResponseCreate(res){
    this.sending = false;
    const toast = await this.toastCtrl.create({
      message: res.message,
      duration: 2000,
      color:'success',
      position:'top'
    });
    toast.present();
    this.user.reset();
    this.refreshService.throwEvent('users');
    this.navCtrl.navigateRoot('/tabs/tab1');
  }

  async handleErrorCreate(err){
    this.sending = false;
    if (err.status === 422) {
      this.error = err.error.errors;
    }else{
      const toast = await this.toastCtrl.create({
        message: err.message,
        duration: 3000,
        color:'danger'
      });
      toast.present();
    }
  }
}
