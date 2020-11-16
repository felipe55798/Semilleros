import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Seedling } from 'src/app/interfaces/seedling';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
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
  constructor(private route: ActivatedRoute,
              private apiService: SeedlingsService,
              private authService: AuthService,
              private alertController: AlertController,
              private navController:NavController
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getSeedling();
  }

  getSeedling(){
    return this.apiService.getSeedling(this.id).subscribe(
      res => this.handleResponse(res),
      err => this.handleError(err)
    );
  }

  handleResponse(response) {
    console.log(response);
    this.seedling = response.seedling;
    this.teachers = response.teachers;
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
  
  handleError(error: any) {
    console.error(error);
  }

  participar(){
    this.authService.getUser().subscribe(
      async res=>{
        if (res) {
          const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Confirm!',
            message: 'Message <strong>text</strong>!!!',
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
                handler: (blah) => {
                  console.log('Confirm Cancel: blah');
                }
              }, {
                text: 'Okay',
                handler: () => {
                  
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

}
