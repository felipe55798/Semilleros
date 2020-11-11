import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/interfaces/group';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-seedling-form',
  templateUrl: './seedling-form.page.html',
  styleUrls: ['./seedling-form.page.scss'],
})
export class SeedlingFormPage implements OnInit {

  groups:Group[] = [];

  constructor(private groupService:GroupsService) { }

  ngOnInit() {
    this.getGroups()
  }

  getGroups(){
    this.groupService.getGroupsList().subscribe(
      res=>this.handleResponse(res),
      err=>this.handleError(err)
    )
  }

  handleResponse(res){
    this.groups = res.groups;

  }
  handleError(err){
    console.log(err);
  }

  addSeedling(){
    
  }
}
