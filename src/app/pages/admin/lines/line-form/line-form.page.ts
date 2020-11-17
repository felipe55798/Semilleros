import { Group } from './../../../../interfaces/group';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Department } from 'src/app/interfaces/department';
import { Line } from 'src/app/interfaces/line';
import { DepartmentService } from 'src/app/services/departments.service';
import { LinesService } from 'src/app/services/lines.service';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-line-form',
  templateUrl: './line-form.page.html',
  styleUrls: ['./line-form.page.scss'],
})
export class LineFormPage implements OnInit {
  error_unprocesable:Line = {};

  groups:Group[] = [];

  validation_messages = {
    'name': [
        { type: 'required', message: 'El nombre es obligatorio.' },
      ],
    'description': [
      { type: 'required', message: 'La descripción es obligatoria.' }
    ],
    'group_id': [
      { type: 'required', message: 'El grupo de investigación es obligatorio.' }
    ],
  } 

  line = new FormGroup({
    name: new FormControl('', Validators.required),
    group_id: new FormControl('', Validators.required),
    description: new FormControl('',Validators.required)
  })

  sending:boolean = false;

  

  constructor(private groupService:GroupsService,
              private lineService:LinesService,
              private toastCtrl:ToastController,
              private navCtrl:NavController) { }

  ngOnInit() {
    this.getGroups()
  }

  getGroups(){
    this.groupService.getGroupsList().subscribe(
      res=>this.handleResponse(res),
      err=>this.handleError(err)
    )
  }

  handleResponse(res){
    // console.log(res);
    this.groups = res.groups;

  }
  handleError(err){
    console.log(err);
  }

  createLine(){
    this.sending = true;
    this.lineService.createLine(this.line.value).subscribe(
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
    this.line.reset()
    this.navCtrl.navigateForward('/home/lines',{
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
