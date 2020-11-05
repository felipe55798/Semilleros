import { Component } from '@angular/core';
import { error } from 'protractor';
import { Group } from '../interfaces/group';
import { Seedling } from '../interfaces/seedling';
import { GroupsService } from '../services/groups.service';
import { SeedlingsService } from '../services/seedlings.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  slidesOpts = {
    slidesPerView:1.1,
    freeMode:true,
    spaceBetween:-10
  };

  show = false;
  groups: Group[] = [];
  seedlings: Seedling[] = [];
  constructor(public apiService: GroupsService,
              public apiSeedling: SeedlingsService) {}

  ngOnInit() {
    this.getGroups();
    this.getSeedlings();
  }

  showContentCard(){
    this.show = !this.show;
  }

  getGroups() {
    this.apiService.getGroupsList().subscribe(
      response => this.handleResponse(response), 
      err => this.handleError(err)
      );
  }

  getSeedlings() {
    this.apiSeedling.getSeedlingsList().subscribe(
      response => this.handleResponseSeedling(response), 
      err => this.handleError(err)
      );
  }

  handleError(error: any) {
    console.error(error);
  }

  handleResponse(response) {
    console.log(response);
    this.groups = response.groups;
  }

  handleResponseSeedling(response) {
    console.log(response);
    this.seedlings = response.seedlings;
  }

}