import { ActionSheetController, AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Publication } from 'src/app/interfaces/publication';
import { PublicationService } from 'src/app/services/publication.service';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AuthService } from 'src/app/services/auth.service';
import { RefreshService } from 'src/app/services/refresh.service';


@Component({
  selector: 'app-single-publication',
  templateUrl: './single-publication.page.html',
  styleUrls: ['./single-publication.page.scss'],
})
export class SinglePublicationPage implements OnInit {

  id: string;
  publication:Publication = {};
  canEdit:boolean = false;
  constructor(private route: ActivatedRoute,
              private publicationService: PublicationService,
              private iab: InAppBrowser, 
              private authService: AuthService,
              private actionSheetController: ActionSheetController,
              private navCtrl: NavController,
              private alertController: AlertController,
              private toastCtrl: ToastController,
              private loadingController: LoadingController,
              private refreshService: RefreshService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getPublication();
    this.loadUser()
  }

  loadUser(){
    this.authService.getUser().subscribe(
      user=>{
        if (user && (user.roles[0].id == 2 || user.roles[0].id == 3)) {
          this.canEdit = true;
        }
      }
    )
  }

  async getPublication() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando información...',
      duration: 2000
    });
    await loading.present();
    return this.publicationService.getPublication(this.id).subscribe(
      res => this.handleResponse(res),
      err => this.handleError(err)
    );
  }

  handleResponse(response) {
    this.publication = response.publication;
  }
  
  handleError(error: any) {
    this.alertError('Error en el servidor, por favor intente más tarde', 'danger', 'Error');
  }

  async alertError(message:string, color:string, header:string) {
    const toast = await this.toastCtrl.create({
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

  openLink(){
    const browser = this.iab.create(this.publication.link);
    browser.show();
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
          this.navCtrl.navigateForward(`/home/publications/edit/${this.publication.id}`)
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
      message: 'Esta acción no se puede deshacer, ¿Seguro que desea eliminar esta publicación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Sí, eliminar',
          cssClass:'danger_text',
          handler: () => {
            this.publicationService.destroy(this.publication.id).subscribe(
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
    this.refreshService.throwEvent('publications');
    this.navCtrl.navigateRoot('/tabs/tab1')
  }

  async handleErrorDelete(err){
    this.alertError('Error en el servidor, por favor intente más tarde', 'danger', 'Error');
  }

}