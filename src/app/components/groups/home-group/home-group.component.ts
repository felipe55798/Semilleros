import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Group } from 'src/app/interfaces/group';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-home-group',
  templateUrl: './home-group.component.html',
  styleUrls: ['./home-group.component.scss'],
})
export class HomeGroupComponent implements OnInit {
  slidesOpts = {
    slidesPerView:1.1,
    freeMode:true,
    spaceBetween:-10
  };
  groups:Group[] = [];
  constructor(private groupService:GroupsService,
              private loadingController: LoadingController) { }

  ngOnInit() {
    this.getGroups()
  }

  async getGroups() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    this.groupService.getGroupsList().subscribe(
      async response => {
        const { role, data } = await loading.onDidDismiss();
        this.handleResponse(response)
      }, 
      err => this.handleError(err)
      );
  }
  handleResponse(response) {
    console.log(response.groups);
    this.groups = response.groups;
  }
  
  handleError(error: any) {
    console.error(error);
  }

}
