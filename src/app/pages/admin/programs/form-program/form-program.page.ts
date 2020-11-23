import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Department } from 'src/app/interfaces/department';
import { Program } from 'src/app/interfaces/program';
import { User } from 'src/app/interfaces/user';
import { DepartmentService } from 'src/app/services/departments.service';
import { ProgramService } from 'src/app/services/program.service';
import { RefreshService } from 'src/app/services/refresh.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form-program',
  templateUrl: './form-program.page.html',
  styleUrls: ['./form-program.page.scss'],
})
export class FormProgramPage implements OnInit {
  sending:boolean = false;

  departments:Department[] = [];

  teachers:User[] = [];

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
    department_id: new FormControl('',Validators.required),
    coordinator_id: new FormControl(''),
    id: new FormControl('')
  })

  toEdit:boolean = false;
  programToEdit:Program = {};

  constructor(private departmentService:DepartmentService,
              private programService:ProgramService,
              private toastCtrl:ToastController,
              private navCtrl: NavController,
              private userService:UserService,
              private refreshService: RefreshService,
              private route:ActivatedRoute,
              private loadingController: LoadingController) { }

  ngOnInit() {
    this.getDepartments();
    this.getTeachers();
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProgramData(id);
    }
  }

  async loadProgramData(id){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando información...',
      duration: 2000
    });
    await loading.present();
    this.programService.getProgram(id).subscribe(
      res=>this.handleResponseLoad(res,loading),
      err=>this.handleErrorLoad(err,loading)
    )
  }

  async handleResponseLoad(res,loading){
    const { role, data } = await loading.onDidDismiss();
    const {name,description,department_id, coordinator_id, id} = res.program;
    this.programToEdit = res.program;
    const programLoaded = {
      id,
      name,
      description,
      department_id,
      coordinator_id
    }
    this.program.setValue(programLoaded);
    this.toEdit = true;
  }

  async handleErrorLoad(err,loading){
    const { role, data } = await loading.onDidDismiss();
    if (err.status === 404) {
      this.navCtrl.navigateForward('/home/programs');
      const toast = await this.toastCtrl.create({
        header:'Error',
        message:'Registro no encontrado',
        color:'danger',
        position:'top',
        duration:2000
      })
      toast.present()
    }
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

  getTeachers(){
    this.userService.getTeachers().subscribe(
      res=>this.handleResponseTeachers(res),
      err=>this.handleErrorTeachers(err)
    )
  }

  handleResponseTeachers(res){
    this.teachers = res.teachers;
  }

  handleErrorTeachers(err){
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

    this.program.reset();
    this.refreshService.throwEvent('programs');
    this.navCtrl.navigateRoot('/home/programs');
  }

  async handleErrorCreate(err){
    this.sending = false;
    if (err.status === 422) {
      this.error_unprocesable = err.error.errors;
    }else{
      const toast = await this.toastCtrl.create({
        message: err.message,
        duration: 2000,
        color:'danger',
        position:'top'
      });
      toast.present();
    }
  }

  updateProgram(){
    this.sending = true;
    this.programService.update(this.programToEdit.id,this.program.value).subscribe(
      res=>this.handleResponseCreate(res),
      err=>this.handleErrorCreate(err)
    )
  }

}
