import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ActionSheetController, NavController, ToastController, AlertController } from '@ionic/angular';
import { Program } from 'src/app/interfaces/program';
import { AuthService } from 'src/app/services/auth.service';
import { ProgramService } from 'src/app/services/program.service';
import { RefreshService } from 'src/app/services/refresh.service';

@Component({
  selector: 'app-single-program',
  templateUrl: './single-program.page.html',
  styleUrls: ['./single-program.page.scss'],
})
export class SingleProgramPage implements OnInit {

  program: Program = {};
  admin:boolean = false;
  constructor(private route: ActivatedRoute,
              private programService: ProgramService,
              private loadingController: LoadingController,
              private authService: AuthService,
              private actionSheetController: ActionSheetController,
              private navCtrl: NavController,
              private toastCtrl: ToastController,
              private alertController: AlertController,
              private refreshService: RefreshService) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.getProgram(id);
    this.loadUser();
  }

  loadUser(){
    this.authService.getUser().subscribe(
      user=>{
        if (user && user.roles[0].id === 1) {
          this.admin = true;
        }
      }
    )
  }

  async getProgram(id){
    const loading = await this.loadingController.create({
      message:'Cargando información',
      spinner:'crescent',
      animated:true,
      duration: 2000,
      mode:'ios'
    })
    loading.present()
    this.programService.getProgram(id).subscribe(
      res=>this.handleResponse(res,loading),
      err=>this.handleError(err,loading)
    )
  }

  async handleResponse(res,loading){
    await loading.onDidDismiss()
    this.program = res.program;
  }

  async handleError(err,loading){
    await loading.onDidDismiss()
    if (err.status === 404) {
      const toast = await this.toastCtrl.create({
        header:'Error',
        message: 'Registro no encontrado',
        duration:3000,
        color:'danger',
      })
      toast.present();

      this.navCtrl.navigateForward('/home/programs');
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
          this.navCtrl.navigateForward(`/home/programs/edit/${this.program.id}`)
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
      message: 'Esta acción no se puede deshacer, ¿Seguro que desea eliminar este programa académico?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Sí, eliminar',
          cssClass:'danger_text',
          handler: () => {
            this.programService.destroy(this.program.id).subscribe(
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
    this.refreshService.throwEvent('programs');
    this.navCtrl.navigateRoot('/home/programs')
  }

  async handleErrorDelete(err){
    this.handleErrorDelete(err);
  }

}
