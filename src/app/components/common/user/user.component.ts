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

  ngOnInit() {} 

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
    this.update.emit(true);
    this.sending = false;
    this.showMessage(response.message, 'success');
  }

  handleError(error:any) {
    this.update.emit(true);
    this.sending = false;
    this.showMessage(error.message, 'danger');
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

  async showMessage(message, color) {
    const toast = await this.toastCtrl.create({
      message,
      color,
      duration:2000,
    })
    toast.present()
  }

  async handleResponseDestroy(res){
    this.user = null;
    this.showMessage(res.message, 'secondary');
  }
  handleErrorDestroy(err){
    this.showMessage(err.message,'danger')
  }
}
