import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Group } from 'src/app/interfaces/group';
import { Seedling } from 'src/app/interfaces/seedling';
import { AuthService } from 'src/app/services/auth.service';
import { GroupsService } from 'src/app/services/groups.service';
import { RefreshService } from 'src/app/services/refresh.service';

@Component({
  selector: 'app-single-group',
  templateUrl: './single-group.page.html',
  styleUrls: ['./single-group.page.scss'],
})
export class SingleGroupPage implements OnInit {

  id: string;
  group:Group = {};
  admin:boolean = false;

  constructor(private route: ActivatedRoute,
              private apiService: GroupsService,
              private authService:AuthService,
              private actionSheetController: ActionSheetController,
              private alertController:AlertController,
              private navCtrl:NavController,
              private toastCtrl:ToastController,
              private loadingController:LoadingController,
              private refresService: RefreshService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getGroup();
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

  async getGroup() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando información del grupo...',
      duration: 2000
    });
    await loading.present();
    return this.apiService.getGroup(this.id).subscribe(
      res => this.handleResponse(res),
      err => this.handleError(err)
    );
  }

  handleResponse(response) {
    this.group = response.group;
  }
  
  async handleError(error: any) {
    if (error.status === 404) {
      this.refresService.throwEvent('groups');
      this.navCtrl.navigateForward('/home/groups');
      const toast = await this.toastCtrl.create({
        header:error.statusText,
        message:'Registro no encontrado',
        color:'danger',
        position:'top',
        duration:2000
      })
      toast.present()
    }
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
          this.navCtrl.navigateForward(`/home/groups/edit/${this.group.id}`)
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
      message: 'Esta acción no se puede deshacer, ¿Seguro que desea eliminar el grupo de investigación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Sí, eliminar',
          cssClass:'danger_text',
          handler: () => {
            this.apiService.destroy(this.group.id).subscribe(
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

    this.navCtrl.navigateRoot('/home/groups')
  }

  async handleErrorDelete(err){
    this.handleResponseDelete(err);
  }
}