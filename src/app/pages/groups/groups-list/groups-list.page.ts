import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { error } from 'protractor';
import { RefreshService } from 'src/app/services/refresh.service';
import { Group } from '../../../interfaces/group';
import { GroupsService } from '../../../services/groups.service';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.page.html',
  styleUrls: ['./groups-list.page.scss'],
})
export class GroupsListPage implements OnInit {

  groups:Group[] = [];
  constructor(public apiService: GroupsService,
              private refreshService: RefreshService,
              private toastController: ToastController) { }

  ngOnInit() {
    this.getGroups();
    this.refreshService.refresh.subscribe(
      (res:string)=>{
        if (res === "groups") {
          this.getGroups()
        }
      }
    )
  }

  getGroups() {
    this.apiService.getGroupsList().subscribe(
      response => this.handleResponse(response), 
      err => this.handleError(err)
    );
  }

  handleResponse(response) {
    this.groups = response.groups;
  }
  
  handleError(error: any) {
    this.alertError('Error en el servidor, por favor intente más tarde', 'danger', 'Error');
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