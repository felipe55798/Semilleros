import { Component, OnInit } from '@angular/core';
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
              private refreshService: RefreshService) { }

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
    console.error(error);
  }
}