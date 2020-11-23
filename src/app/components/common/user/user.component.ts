import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { SeedlingUserService } from 'src/app/services/seedling-user.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  @Input() user:User = null;
  @Input() edit:boolean = true;
  @Input() admin:boolean = false;
  @Output() update = new EventEmitter<boolean>();
  sending:boolean = false;
  
  constructor(private seedling_user_service:SeedlingUserService,
              private userService: UserService,
              private toastCtrl: ToastController,
              private alertController: AlertController) { }

  ngOnInit() {
    console.log(this.user);
  } 

  aceptar() {
    let data = {
      seedling_user: this.user['pivot'].id,
      status: 1
    };
    if (!this.sending) {
      this.sending = true;
      this.seedling_user_service.setStatus(data).subscribe(
        res => this.handleResponse(res),
        err => this.handleError(err)
      );
    }
  }

  rechazar() {
    let data = {
      seedling_user: this.user['pivot'].id,
    };
    if (!this.sending) {
      this.sending = true;
      this.seedling_user_service.deleteSeedlingUser(data).subscribe(
        res => this.handleResponse(res),
        err => this.handleError(err)
      ); 
    }
  }

  handleResponse(response) {
    this.user = null;
    console.log('Cualquier cosa');
    this.update.emit(true);
    this.sending = false;
  }

  handleError(error:any) {
    console.error(error);
    this.update.emit(true);
    this.sending = false;
  }

  async destroy(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirme su acción!',
      message: 'Esta acción no se puede deshacer, ¿Está seguro que desea eliminar el usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Sí, eliminar',
          handler: () => {
            this.sending = true;
            this.userService.destroy(this.user).subscribe(
              res=>this.handleResponseDestroy(res),
              err=>this.handleErrorDestroy(err)
            )
          }
        }
      ]
    });

    await alert.present();
  }

  async handleResponseDestroy(res){
    this.user = null;
    this.sending = false;
    const toast = await this.toastCtrl.create({
      message:res.message,
      duration:2000,
      color:'secondary'
    })
    toast.present()
  }
  async handleErrorDestroy(err){
    this.sending = false;
    const toast = await this.toastCtrl.create({
      message:err.message,
      duration:2000,
      color:'danger'
    })
    toast.present()
  }
}
