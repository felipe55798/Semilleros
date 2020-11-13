import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Group } from 'src/app/interfaces/group';
import { Seedling } from 'src/app/interfaces/seedling';
import { GroupsService } from 'src/app/services/groups.service';
import { SeedlingsService } from 'src/app/services/seedlings.service';

@Component({
  selector: 'app-seedling-form',
  templateUrl: './seedling-form.page.html',
  styleUrls: ['./seedling-form.page.scss'],
})
export class SeedlingFormPage implements OnInit {

  error_unprocesable:Seedling = {};

  groups:Group[] = [];

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
  } 

  sending:boolean = false;

  seedling = new FormGroup({
    name: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    group_id: new FormControl('',Validators.required)
  })

  constructor(private groupService:GroupsService,
              private seedLingService:SeedlingsService,
              private toastCtrl: ToastController,
              private navCtrl: NavController) { }

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
    this.groups = res.groups;

  }
  handleError(err){
    console.log(err);
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
    this.navCtrl.navigateForward('/home/seedlings',{
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
