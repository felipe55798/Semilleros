import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { DepartmentService } from 'src/app/services/departments.service';

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
  department = new FormGroup({
    name: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required)
  })

  constructor(private departmentService:DepartmentService,
              private navCtrl:NavController,
              private toast:ToastController) { }

  ngOnInit() {
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
    this.navCtrl.navigateForward('/tabs/tab2',{
      queryParams:{
        refresh:true
      }
    })
  }

  handleError(err){
    this.sending = false;
    if (err.status === 422) {
      this.error_unprocesable = err.error.errors;
    }else{
      console.log(err);
    }
  }
}
