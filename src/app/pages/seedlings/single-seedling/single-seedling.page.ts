import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Seedling } from 'src/app/interfaces/seedling';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { RefreshService } from 'src/app/services/refresh.service';
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
  teacher:User = {};
  students:User[] = [];
  pertenece:number = -1;
  loading:boolean = true;
  sending: boolean = false;
  admin:boolean = false;


  constructor(private route: ActivatedRoute,
              private apiService: SeedlingsService,
              private authService: AuthService,
              private alertController: AlertController,
              private navController:NavController,
              private seelingUserService: SeedlingUserService,
              private toastController : ToastController,
              private actionSheetController: ActionSheetController,
              private navCtrl:NavController,
              private toastCtrl:ToastController,
              private loadingController: LoadingController,
              private refreshService: RefreshService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getSeedling();
    this.checkRole();
  }

  checkRole(){
    this.authService.getUser().subscribe(
      res=>{
        if (res) {
          if (res.roles[0].id === 1) {
            this.admin = true;
          }
        }
      }
    )
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      mode:'ios',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.delete()
        }
      }, {
        text: 'Editar información',
        icon: 'create',
        handler: () => {
          this.navCtrl.navigateForward(`/home/seedlings/edit/${this.seedling.id}`)
        }
      },{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

  async delete(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirme su acción',
      message: 'Esta acción no se puede deshacer, ¿Seguro que desea eliminar este semillero?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Sí, eliminar',
          cssClass:'danger_text',
          handler: () => {
            this.apiService.destroy(this.seedling.id).subscribe(
              res=>this.handleResponseDelete(res),
              err=>this.handleErrorDelete(err)
            )
          }
        }
      ]
    });
    await alert.present();
  }

  async handleResponseDelete(res){
    const toast = await this.toastCtrl.create({
      message:res.message,
      color:'secondary',
      position:'bottom',
      duration:3000
    })
    toast.present()
    this.refreshService.throwEvent('seedlings');
    this.navCtrl.navigateRoot('/home/seedlings')
  }

  async handleErrorDelete(err){
    this.alertError('Error en el servidor, por favor intente más tarde', 'danger', 'Error');
  }

  async getSeedling(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando información...',
      duration: 2000
    });
    await loading.present();
    return this.apiService.getSeedling(this.id).subscribe(
      res => this.handleResponse(res),
      err => this.handleError(err)
    );
  }

  handleResponse(response) {
    this.seedling = response.seedling;
    this.teacher = response.teacher;
    this.students = response.students;

    this.authService.getUser().subscribe(
      res=>{
        if (res) {
          if (res.roles[0].id === 4) {
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
  
  async handleError(error: any) {
    if (error.status === 404) {
      const toast = await this.toastCtrl.create({
        message:'Registro no encontrado',
        header:'Error',
        duration:2000,
        position:'top',
        color:'danger'
      })
      toast.present();
      this.navCtrl.navigateForward('/home/seedlings');
    }
  }

  participar(){
    this.authService.getUser().subscribe(
      async res=>{
        if (res) {
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
    const toast = await this.toastController.create({
      header : 'Error',
      duration : 3000,
      message : error.error.message,
      color : 'danger'
    });
    toast.present();
  }

  async alertError(message:string, color:string, header:string) {
    const toast = await this.toastController.create({
      header,
      message,
      position: 'top',
      animated:true,
      color,
      duration:4000,
      cssClass:'alert-error'
    });
    toast.present();
  }

}