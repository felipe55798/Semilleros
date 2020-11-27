import { Group } from './../../../../interfaces/group';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Department } from 'src/app/interfaces/department';
import { Line } from 'src/app/interfaces/line';
import { DepartmentService } from 'src/app/services/departments.service';
import { LinesService } from 'src/app/services/lines.service';
import { GroupsService } from 'src/app/services/groups.service';
import { RefreshService } from 'src/app/services/refresh.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

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
    description: new FormControl('',Validators.required),
    id: new FormControl('')
  })

  toEdit:boolean = false;
  lineToEdit:Line = {};

  sending:boolean = false;

  

  constructor(private groupService:GroupsService,
              private lineService:LinesService,
              private toastCtrl:ToastController,
              private navCtrl:NavController,
              private refreshService: RefreshService,
              private route: ActivatedRoute,
              private loadingController: LoadingController) { }

  ngOnInit() {
    this.getGroups()
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadInfoLine(id)
    }
  }

  async loadInfoLine(id){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando información...',
      duration: 2000
    });
    await loading.present();
    this.lineService.getLine(id).subscribe(
      res=>this.handleResponseLoad(res,loading),
      err=>this.handleErrorLoad(err,loading)
    )
  }


  async handleResponseLoad(res,loading){
    const { role, data } = await loading.onDidDismiss();
    const { id,name,group_id,description } = res.line;
    this.lineToEdit = res.line;
    const lineLoaded = {
      id,
      name,
      group_id,
      description
    }
    this.line.setValue(lineLoaded);
    this.toEdit = true;

  }

  async handleErrorLoad(err,loading){
    const { role, data } = await loading.onDidDismiss();
    if (err.status === 404) {
      this.navCtrl.navigateForward('/home/lines');
      const toast = await this.toastCtrl.create({
        header:err.statusText,
        message:'Registro no encontrado',
        color:'danger',
        position:'top',
        duration:2000
      })
      toast.present()
    }
  }

  getGroups(){
    this.groupService.getGroupsList().subscribe(
      res=>this.handleResponse(res),
      err=>this.handleError(err)
    )
  }

  handleResponse(res){
    this.groups = res.groups;

  }
  handleError(err){
    this.handleErrorCreate(err);
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
    this.line.reset();
    this.refreshService.throwEvent('lines');
    this.navCtrl.navigateRoot('/home/lines');
  }

  async handleErrorCreate(err){
    this.sending = false;
    if (err.status === 422) {
      this.error_unprocesable = err.error.errors;
    }else{
      const toast = await this.toastCtrl.create({
        message: err.message,
        duration: 2000,
        color:'danger'
      });
      toast.present();
    }
  }

  updateLine(){
    this.sending = true;
    this.lineService.update(this.lineToEdit.id,this.line.value).subscribe(
      res=>this.handleResponseUpdate(res),
      err=>this.handleErrorResponse(err)
    )
  }

  async handleResponseUpdate(res){
    this.sending = false;
    const toast = await this.toastCtrl.create({
      message: res.message,
      duration: 2000,
      color:'success'
    });
    toast.present();
    this.refreshService.throwEvent('lines');
    this.navCtrl.navigateForward('/home/lines')
  }

  async handleErrorResponse(err){
    this.sending =false;
    if (err.status === 422) {
      this.error_unprocesable = err.error.errors;
    }else{
      const toast = await this.toastCtrl.create({
        message: err.message,
        duration: 2000,
        color:'danger'
      });
      toast.present();
    }
  }

}
