import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Department } from 'src/app/interfaces/department';
import { Program } from 'src/app/interfaces/program';
import { DepartmentService } from 'src/app/services/departments.service';
import { ProgramService } from 'src/app/services/program.service';

@Component({
  selector: 'app-form-program',
  templateUrl: './form-program.page.html',
  styleUrls: ['./form-program.page.scss'],
})
export class FormProgramPage implements OnInit {
  sending:boolean = false;

  departments:Department[] = [];
  error_unprocesable:Program = {};
  validation_messages = {
    'name': [
        { type: 'required', message: 'El nombre del programa es obligatorio.' },
      ],
    'department_id': [
      { type: 'required', message: 'El departamento acádemico es obligatoria.' }
    ],
    'description': [
      { type: 'required', message: 'La descripción del programa es obligatoria.' }
    ],
  } 
  program = new FormGroup({
    name: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    department_id: new FormControl('',Validators.required)
  })

  constructor(private departmentService:DepartmentService,
              private programService:ProgramService,
              private toastCtrl:ToastController,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.getDepartments()
  }

  getDepartments(){
    this.departmentService.getDepartmentsList().subscribe(
      res=>this.handleResponse(res),
      err=>this.handleError(err)
    )
  }

  handleResponse(res){
    this.departments = res.departments;

  }
  handleError(err){
    console.log(err);
  }

  addProgram(){
    this.sending = true;
    this.programService.createService(this.program.value).subscribe(
      res=>this.handleResponseCreate(res),
      err=>this.handleErrorCreate(err)
    )
  }

  async handleResponseCreate(res){
    this.sending = false;
    const toast = await this.toastCtrl.create({
      message: res.message,
      duration: 2000,
      color:'success'
    });
    toast.present();

    this.navCtrl.navigateForward('/tabs/tab1');
  }

  handleErrorCreate(err){
    this.sending = false;
    if (err.status === 422) {
      this.error_unprocesable = err.error.errors;
    }
  }

}
