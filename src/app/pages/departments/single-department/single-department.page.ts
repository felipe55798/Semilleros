import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController, NavController, ToastController } from '@ionic/angular';
import { Department } from 'src/app/interfaces/department';
import { AuthService } from 'src/app/services/auth.service';
import { DepartmentService } from 'src/app/services/departments.service';

@Component({
  selector: 'app-single-department',
  templateUrl: './single-department.page.html',
  styleUrls: ['./single-department.page.scss'],
})
export class SingleDepartmentPage implements OnInit {
  admin:boolean = false;
  id: string;
  department:Department = {};
  constructor(private route: ActivatedRoute,
              private apiService: DepartmentService,
              private authService: AuthService,
              private actionSheetController: ActionSheetController,
              private alertController:AlertController,
              private navCtrl:NavController,
              private toastCtrl:ToastController
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getDepartment();
    this.checkRole()
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

  getDepartment(){
    return this.apiService.getDepartment(this.id).subscribe(
      response => this.handleResponse(response),
      err => this.handleError(err)
    );
  }

  handleResponse(response) {
    console.log(response);
    this.department = response.department;
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
          this.navCtrl.navigateForward(`/home/departments/edit/${this.department.id}`)
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
      message: 'Esta acción no se puede deshacer, ¿Seguro que desea eliminar el departamento académico?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Sí, eliminar',
          cssClass:'danger_text',
          handler: () => {
            this.apiService.destroy(this.department.id).subscribe(
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

    this.navCtrl.navigateRoot('/tabs/tab2')
  }

  async handleErrorDelete(err){
    console.log(err);
  }

}
