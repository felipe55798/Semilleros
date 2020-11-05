import { Component } from '@angular/core';
import { error } from 'protractor';
import { Department } from '../interfaces/department';
import { DepartmentService } from '../services/departments.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  departments: Department[]=[];
  constructor(public apiService: DepartmentService) {}

  ngOnInit() {
    this.getDepartments();
  }

  getDepartments() {
    //Get saved list of students
    this.apiService.getDepartmentsList().subscribe(
      response => this.handleResponse(response), 
      err => this.handleError(err)
      );
  }

  handleError(error: any) {
    console.error(error);
  }

  handleResponse(response) {
    console.log(response);
    this.departments = response.departments;
  }
}
