import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Department } from 'src/app/interfaces/department';
import { Group } from 'src/app/interfaces/group';
import { DepartmentService } from 'src/app/services/departments.service';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.page.html',
  styleUrls: ['./add-group.page.scss'],
})
export class AddGroupPage implements OnInit {
  error_unprocesable:Group = {};

  departments:Department[] = [];

  validation_messages = {
    'name': [
        { type: 'required', message: 'El nombre del semillero es obligatorio.' },
      ],
    'description': [
      { type: 'required', message: 'La descripción del semillero es obligatoria.' }
    ],
    'department_id': [
      { type: 'required', message: 'La grupo de investigación es obligatoria.' }
    ],
  } 

  sending:boolean = false;

  group = new FormGroup({
    name: new FormControl('', Validators.required),
    department_id: new FormControl('', Validators.required),
    description: new FormControl('',Validators.required)
  })

  constructor(private DepartmentService:DepartmentService,
              private groupService: GroupsService,
              private toastCtrl: ToastController,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.getDepartments()
  }

  getDepartments(){
    this.DepartmentService.getDepartmentsList().subscribe(
      res=>this.handleResponse(res),
      err=>this.handleError(err)
    )
  }

  handleResponse(res){
    // console.log(res);
    this.departments = res.departments;

  }
  handleError(err){
    console.log(err);
  }

  createGroup(){
    this.sending = true;
    this.groupService.createGroup(this.group.value).subscribe(
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
    this.navCtrl.navigateForward('/home/groups',{
      queryParams:{
        refresh:true
      }
    })
  }
  
  async handleErrorCreate(err){
    this.sending = false;
    if (err.status === 422) {
      this.error_unprocesable = err.error.errors;
    }else{
      const toast = await this.toastCtrl.create({
        message: err.message,
        duration: 2000,
        color:'success'
      });
      toast.present();
    }
  }
}
