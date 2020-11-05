import { Component } from '@angular/core';
import { error } from 'protractor';
import { Group } from '../interfaces/group';
import { GroupsService } from '../services/groups.service';

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
  constructor(public apiService: GroupsService) {}

  ngOnInit() {
    this.getGroups();
  }

  showContentCard(){
    this.show = !this.show;
  }

  getGroups() {
    //Get saved list of students
    this.apiService.getGroupsList().subscribe(
      response => this.handleResponse(response), 
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

}
