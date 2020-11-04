import { Component } from '@angular/core';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  departments: any;
  constructor(public apiService: ServiceService,) {}

  ngOnInit() {
    this.getDepartments();
  }

  getDepartments() {
    //Get saved list of students
    this.apiService.getDepartmentsList().subscribe(response => {
      this.departments = response;
      console.log(response);
    })
  }

}
