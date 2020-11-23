import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, LoadingController, NavController, ViewWillEnter } from '@ionic/angular';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { RefreshService } from '../services/refresh.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  user:User = null;
  constructor(private route: ActivatedRoute,
    public apiService: UserService,
    public authService: AuthService,
    public actionSheetController: ActionSheetController,
    private navCtrl:NavController,
    private refreshService: RefreshService,
    private loadingController: LoadingController) { }

  ngOnInit() {    
    this.getUser();
    this.refreshService.updated.subscribe(
      async res => {
        this.getUser();
      }
    );
    console.log(this.user);
  }

  async getUser(){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando información...',
      duration: 2000
    });
    await loading.present();
    this.authService.getUser().subscribe(
      async res => {
        this.user = res;
        const { role, data } = await loading.onDidDismiss();
      }
    );
  }
  

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Actualizar Mi Perfil',
        icon: 'arrow-forward-circle',
        handler: () => {
          this.navCtrl.navigateForward(`/home/update-profile/1`)
        }
      }, {
        text: 'Actualizar mi contraseña',
        icon: 'arrow-forward-circle',
        handler: () => {
          this.navCtrl.navigateForward(`/home/update-profile/2`)
        }
      }, {
        text: 'Cancelar',
        role: 'destructive',
        icon: 'close',
        handler: () => {
          console.log('Delete clicked');
        }
      } ]
    });
    await actionSheet.present();
  }
}