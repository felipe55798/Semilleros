import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Group } from 'src/app/interfaces/group';
import { Seedling } from 'src/app/interfaces/seedling';
import { User } from 'src/app/interfaces/user';
import { GroupsService } from 'src/app/services/groups.service';
import { RefreshService } from 'src/app/services/refresh.service';
import { SeedlingsService } from 'src/app/services/seedlings.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-seedling-form',
  templateUrl: './seedling-form.page.html',
  styleUrls: ['./seedling-form.page.scss'],
})
export class SeedlingFormPage implements OnInit {

  error_unprocesable:Seedling = {};

  groups:Group[] = [];

  teachers:User[] = []

  validation_messages = {
    'name': [
        { type: 'required', message: 'El nombre del semillero es obligatorio.' },
      ],
    'description': [
      { type: 'required', message: 'La descripción del semillero es obligatoria.' }
    ],
    'group_id': [
      { type: 'required', message: 'La grupo de investigación es obligatoria.' }
    ],
    'teacher_id': [
      { type: 'required', message: 'El encargado del semillero es obligatorio' }
    ],
  } 

  seedlingToEdit:Seedling = {};

  toEdit:boolean = false;

  sending:boolean = false;

  seedling = new FormGroup({
    name: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    group_id: new FormControl('',Validators.required),
    teacher_id: new FormControl('',Validators.required),
    id: new FormControl('')
  })

  constructor(private groupService:GroupsService,
              private seedLingService:SeedlingsService,
              private toastCtrl: ToastController,
              private navCtrl: NavController,
              private userService: UserService,
              private refreshService: RefreshService,
              private route: ActivatedRoute,
              private loadingController: LoadingController,
  ) { }

  async ngOnInit() {
    this.getGroups();
    this.getTeachers();

    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Cargando información...',
        duration: 2000
      });
      await loading.present();
      this.seedLingService.getSeedling(id).subscribe(
        async (res:any)=>{
          const { role, data } = await loading.onDidDismiss();

          const { name,description,group_id,teacher_id, id } = res.seedling;
          const seedling = {
            name,
            description,
            group_id,
            teacher_id,
            id
          }
          this.seedlingToEdit = res.seedling;
          this.seedling.setValue(seedling);
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
    this.handleErrorCreate(err);
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

  addSeedling(){
    this.sending = true;
    this.seedLingService.createSeedling(this.seedling.value).subscribe(
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
    this.seedling.reset();
    this.refreshService.throwEvent('seedlings');
    this.navCtrl.navigateRoot('/home/seedlings');
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

  updateSeedling(){
    this.sending = true;
    this.seedLingService.update(this.seedling.value,this.seedlingToEdit.id).subscribe(
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
    this.refreshService.throwEvent('seedlings');
    this.navCtrl.navigateForward('/home/seedlings')
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
