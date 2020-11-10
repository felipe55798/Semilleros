import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { Group } from '../../../interfaces/group';
import { GroupsService } from '../../../services/groups.service';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.page.html',
  styleUrls: ['./groups-list.page.scss'],
})
export class GroupsListPage implements OnInit {

  groups:Group[] = [];
  constructor(public apiService: GroupsService) { }

  ngOnInit() {
    this.getGroups();
  }

  getGroups() {
    this.apiService.getGroupsList().subscribe(
      response => this.handleResponse(response), 
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