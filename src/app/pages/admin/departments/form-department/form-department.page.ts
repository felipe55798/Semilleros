import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Department } from 'src/app/interfaces/department';
import { DepartmentService } from 'src/app/services/departments.service';
import { RefreshService } from 'src/app/services/refresh.service';

@Component({
  selector: 'app-form-department',
  templateUrl: './form-department.page.html',
  styleUrls: ['./form-department.page.scss'],
})
export class FormDepartmentPage implements OnInit {
  error_unprocesable = {
    name:null,
    description:null
  };

  sending:boolean = false;

  validation_messages = {
    'name': [
        { type: 'required', message: 'El nombre del departamento es obligatorio.' },
      ],
    'description': [
      { type: 'required', message: 'La descripción del departamento es obligatoria.' }
    ],
  } 
  departmentToEdit:Department = {};
  department = new FormGroup({
    name: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    id: new FormControl('')
  })
  toEdit:boolean = false;

  constructor(private departmentService:DepartmentService,
              private navCtrl:NavController,
              private toast:ToastController,
              private refreshService: RefreshService,
              private route: ActivatedRoute,
              private loadingController: LoadingController) { }

  async ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Cargando información...',
        duration: 2000
      });
      await loading.present();
      this.departmentService.getDepartment(id).subscribe(
        async (res:any)=>{
          const { role, data } = await loading.onDidDismiss();

          const { name,description,id } = res.department;
          const department = {
            name,
            description,
            id
          }
          this.departmentToEdit = res.department;
          this.department.setValue(department);
          this.toEdit = true;
        },
        async err=>{
          const { role, data } = await loading.onDidDismiss();
          if (err.status === 404) {
            this.navCtrl.navigateForward('/tabs/tab2');
            const toast = await this.toast.create({
              header:err.statusText,
              message:'Registro no encontrado',
              color:'danger',
              position:'top',
              duration:2000
            })
            toast.present()
          }
        }
      )
    }
  }

  addDepartment(){
    this.sending = true;
    this.departmentService.createDepartment(this.department.value).subscribe(
      res=>this.handleResponse(res),
      err=>this.handleError(err)
    )
  }


  async handleResponse(res){
    this.sending = false;
    const toast = await this.toast.create({
      message: res.message,
      duration: 2000,
      color:'success'
    });
    toast.present();
    this.department.reset()
    this.refreshService.throwEvent('departments');
    this.navCtrl.navigateRoot('/tabs/tab2');
  }

  handleError(err){
    this.sending = false;
    if (err.status === 422) {
      this.error_unprocesable = err.error.errors;
    }else{
      console.log(err);
    }
  }

  updateDepartment(){
    this.sending = true;
    this.departmentService.update(this.departmentToEdit.id,this.department.value).subscribe(
      res=>this.handleResponseUpdate(res),
      err=>this.handleErrorUpdate(err)
    )
  }

  async handleResponseUpdate(res){
    this.sending = false;
    const toast = await this.toast.create({
      message: res.message,
      duration: 2000,
      color:'success'
    });
    toast.present();
    this.navCtrl.navigateForward('/tabs/tab2',{
      queryParams:{
        refresh:true
      }
    })
  }

  async handleErrorUpdate(err){
    this.sending = false;
    if (err.status === 422) {
      this.error_unprocesable = err.error.errors;
    }else{
      const toast = await this.toast.create({
        message: err.message,
        duration: 2000,
        color:'danger'
      });
      toast.present();
    }
  }
}
