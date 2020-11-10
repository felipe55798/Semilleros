import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Department } from 'src/app/interfaces/department';
import { DepartmentService } from 'src/app/services/departments.service';

@Component({
  selector: 'app-single-department',
  templateUrl: './single-department.page.html',
  styleUrls: ['./single-department.page.scss'],
})
export class SingleDepartmentPage implements OnInit {

  id: string;
  department:Department = {};
  constructor(private route: ActivatedRoute,
              private apiService: DepartmentService) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getDepartment();
  }

  getDepartment(){
    return this.apiService.getDepartment(this.id).subscribe(
      response => this.handleResponse(response),
      err => this.handleError(err)
    );
  }

  handleResponse(response) {
    console.log(response);
    this.department = response.department;
  }
  
  handleError(error: any) {
    console.error(error);
  }

}
