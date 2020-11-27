import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Department } from '../interfaces/department';
import { DepartmentService } from '../services/departments.service';
import { RefreshService } from '../services/refresh.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  loading:boolean = true;

  departments: Department[]=[];
  constructor(private apiService: DepartmentService,
              private loadingController: LoadingController,
              private route:ActivatedRoute,
              private refreshService: RefreshService,
              private toastController: ToastController) {}

  ngOnInit() {
    this.refreshService.refresh.subscribe(
      (res:any)=>{
        if (res === "departments") {
          this.getDepartments()
        }
      }
    )
    this.getDepartments();
  }

  async getDepartments() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando departamentos...',
      duration: 2000
    });
    await loading.present();
    this.apiService.getDepartmentsList().subscribe(
      async response => {
        const { role, data } = await loading.onDidDismiss();
        this.handleResponse(response)
      }, 
      async err => {
        const { role, data } = await loading.onDidDismiss();
        this.handleError(err)
      }
    );
  }

  handleError(error: any) {
    this.alertError('Error en el servidor, por favor intente más tarde', 'danger', 'Error');
    this.loading = false;
  }

  handleResponse(response) {
    this.departments = response.departments;
    this.loading = false;
  }

  ionViewWillEnter(){
    let refresh: boolean = false;
    this.route.queryParams.subscribe(params => {
      refresh = params["refresh"];
      if (refresh) {
        this.getDepartments()
      }
    });
  }

  async doRefresh(event){
    await this.getDepartments()
    event.target.complete()
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
