import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Seedling } from 'src/app/interfaces/seedling';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { SeedlingUserService } from 'src/app/services/seedling-user.service';
import { SeedlingsService } from 'src/app/services/seedlings.service';

@Component({
  selector: 'app-single-seedling',
  templateUrl: './single-seedling.page.html',
  styleUrls: ['./single-seedling.page.scss'],
})
export class SingleSeedlingPage implements OnInit {

  id: string;
  seedling:Seedling = {};
  teachers:User[] = [];
  students:User[] = [];
  pertenece:number = -1;
  loading:boolean = true;
  sending: boolean = false;
  constructor(private route: ActivatedRoute,
              private apiService: SeedlingsService,
              private authService: AuthService,
              private alertController: AlertController,
              private navController:NavController,
              private seelingUserService: SeedlingUserService,
              private toastController : ToastController
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getSeedling();
    console.log('Hola entré al componente');
  }

  getSeedling(){
    return this.apiService.getSeedling(this.id).subscribe(
      res => this.handleResponse(res),
      err => this.handleError(err)
    );
  }

  handleResponse(response) {
    this.seedling = response.seedling;
    this.teachers = response.teachers;
    this.students = response.students;

    this.authService.getUser().subscribe(
      res=>{
        if (res) {
          if (res.roles[0].id === 4) {
            console.log('Datos: ', this.seedling.id, 'seedlings', res.seedlings.length);
            let seedl =res.seedlings.find(seedling=>{
              return seedling.id === this.seedling.id;
            })
            if (seedl) {
              this.pertenece = seedl['pivot'].status;
            }
            this.loading = false;
          }else{
            this.loading = false;
            this.pertenece = -2;
          }
        }else{
          this.loading = false;
        }
      }
    )
  }
  
  handleError(error: any) {
    console.error(error);
  }

  participar(){
    this.authService.getUser().subscribe(
      async res=>{
        if (res) {
          console.log('Entre aqui');
          
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Confirmar',
            message: '¿Seguro que desea realizar ésta acción?',
            buttons: [
              {
                text: 'Cancelar',
                role: 'cancel',
                cssClass: 'secondary',
              }, {
                text: 'Aceptar',
                handler: () => {
                  this.sending = true;
                  const seedlingUser = {
                    'user_id' : res.id,
                    'seedling_id' : this.seedling.id
                  }
                  this.seelingUserService.createSeedlingUser(seedlingUser).subscribe(
                    res => this.handleResponseParticipate(res),
                    err => this.handleErrorParticipate(err)
                  );
                }
              }
            ]
          });
      
          await alert.present();
        }else{
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Acción requerida',
            message: 'Debes inciar sesión para poder enviar tu solicitud',
            buttons: [
              {
                text: 'Cancelar',
                role: 'cancel',
                cssClass: 'secondary'
              }, {
                text: 'Aceptar',
                handler: () => {
                  this.navController.navigateForward('/auth');
                }
              }
            ]
          });
      
          await alert.present();
        }
      }
    )
  }

  async handleResponseParticipate(res){
    this.pertenece = 0;
    this.sending = false;
    const toast = await this.toastController.create({
      header : 'Solicitud Enviada',
      duration : 3000,
      message : res.message,
      color : 'success'
    });
    toast.present();
    this.authService.refreshUser();
  }

  async handleErrorParticipate(error: any) {
    this.sending = false;
    console.log(error);
    const toast = await this.toastController.create({
      header : 'Error',
      duration : 3000,
      message : error.error.message,
      color : 'danger'
    });
    toast.present();
  }

}