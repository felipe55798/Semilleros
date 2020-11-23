import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController, NavController, ToastController } from '@ionic/angular';
import { Line } from 'src/app/interfaces/line';
import { AuthService } from 'src/app/services/auth.service';
import { LinesService } from 'src/app/services/lines.service';
import { RefreshService } from 'src/app/services/refresh.service';

@Component({
  selector: 'app-single-line',
  templateUrl: './single-line.page.html',
  styleUrls: ['./single-line.page.scss'],
})
export class SingleLinePage implements OnInit {

  id: string;
  line:Line = {};
  admin:boolean = false;
  constructor(private route: ActivatedRoute,
              private apiService: LinesService,
              private authService: AuthService,
              private actionSheetController: ActionSheetController,
              private navCtrl: NavController,
              private alertController: AlertController,
              private toastCtrl: ToastController,
              private refreshService: RefreshService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getLine();
    this.loadUser()
  }

  loadUser(){
    this.authService.getUser().subscribe(
      user=>{
        if (user && user.roles[0].id === 1)  {
          this.admin = true;
        }
      }
    )
  }

  getLine() {
    return this.apiService.getLine(this.id).subscribe(
      res => this.handleResponse(res),
      err => this.handleError(err)
    );
  }

  handleResponse(response) {
    this.line = response.line;
  }
  
  handleError(error: any) {
    console.error(error);
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
          this.navCtrl.navigateForward(`/home/lines/edit/${this.line.id}`)
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
      message: 'Esta acción no se puede deshacer, ¿Seguro que desea eliminar la linea de investigación?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Sí, eliminar',
          cssClass:'danger_text',
          handler: () => {
            this.apiService.destroy(this.line.id).subscribe(
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
    this.refreshService.throwEvent('lines');
    this.navCtrl.navigateRoot('/home/lines')
  }

  async handleErrorDelete(err){
    console.log(err);
  }

}
