import { Component, OnInit } from '@angular/core';
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
  constructor(private groupService:GroupsService) { }

  ngOnInit() {
    this.getGroups()
  }

  getGroups() {
    this.groupService.getGroupsList().subscribe(
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
