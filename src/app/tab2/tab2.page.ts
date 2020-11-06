import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { error } from 'protractor';
import { Department } from '../interfaces/department';
import { AuthService } from '../services/auth.service';
import { DepartmentService } from '../services/departments.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  loading:boolean = true;

  departments: Department[]=[];
  constructor(private apiService: DepartmentService,
              private loadingController: LoadingController) {}

  ngOnInit() {
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
    console.error(error);
    this.loading = false;
  }

  handleResponse(response) {
    this.departments = response.departments;
    this.loading = false;
  }
}
