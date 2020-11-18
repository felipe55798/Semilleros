import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Department } from 'src/app/interfaces/department';
import { Group } from 'src/app/interfaces/group';
import { DepartmentService } from 'src/app/services/departments.service';
import { GroupsService } from 'src/app/services/groups.service';
import { RefreshService } from 'src/app/services/refresh.service';

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

  groupToEdit:Group = {};

  toEdit:boolean = false;

  sending:boolean = false;

  group = new FormGroup({
    name: new FormControl('', Validators.required),
    department_id: new FormControl('', Validators.required),
    description: new FormControl('',Validators.required)
  })

  constructor(private DepartmentService:DepartmentService,
              private groupService: GroupsService,
              private toastCtrl: ToastController,
              private navCtrl: NavController,
              private route: ActivatedRoute,
              private loadingController: LoadingController,
              private refreshService: RefreshService) { }

  async ngOnInit() {
    this.getDepartments()
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Cargando información...',
        duration: 2000
      });
      await loading.present();
      this.groupService.getGroup(id).subscribe(
        async (res:any)=>{
          const { role, data } = await loading.onDidDismiss();

          const { name,description,department_id } = res.group;
          const group = {
            name,
            description,
            department_id
          }
          this.groupToEdit = res.group;
          this.group.setValue(group);
          this.toEdit = true;
        },
        async err=>{
          const { role, data } = await loading.onDidDismiss();
          if (err.status === 404) {
            this.navCtrl.navigateForward('/home/groups');
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
      )
    }
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
    this.group.reset();
    this.refreshService.throwEvent('groups');
    this.navCtrl.navigateRoot('/tabs/tab1');
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

  updateGroup(){
    this.sending = true;
    this.groupService.update(this.groupToEdit.id,this.group.value).subscribe(
      res=>this.handleResponseUpdate(res),
      err=>this.handleErrorUpdate(err)
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
    this.navCtrl.navigateForward('/home/groups',{
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
      const toast = await this.toastCtrl.create({
        message: err.message,
        duration: 2000,
        color:'danger'
      });
      toast.present();
    }
  }

}
