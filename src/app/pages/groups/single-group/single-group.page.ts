import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/interfaces/group';
import { Seedling } from 'src/app/interfaces/seedling';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-single-group',
  templateUrl: './single-group.page.html',
  styleUrls: ['./single-group.page.scss'],
})
export class SingleGroupPage implements OnInit {

  id: string;
  group:Group = {};
  constructor(private route: ActivatedRoute,
    private apiService: GroupsService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getGroup();
  }

  getGroup() {
    return this.apiService.getGroup(this.id).subscribe(
      res => this.handleResponse(res),
      err => this.handleError(err)
    );
  }

  handleResponse(response) {
    console.log(response);
    this.group = response.group;
  }
  
  handleError(error: any) {
    console.error(error);
  }
}