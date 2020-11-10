import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/interfaces/department';
import { DepartmentService } from 'src/app/services/departments.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.page.html',
  styleUrls: ['./add-group.page.scss'],
})
export class AddGroupPage implements OnInit {

  departments:Department[] = [];

  constructor(private DepartmentService:DepartmentService) { }

  ngOnInit() {
    this.getDepartments()
  }

  getDepartments(){
    this.DepartmentService.getDepartmentsList().subscribe(
      res=>this.handleResponse(res),
      err=>this.handleError(err)
    )
  }

  handleResponse(res){
    console.log(res);
    this.departments = res.deparments;

  }
  handleError(err){
    console.log(err);
  }

  addDepartment(){
    
  }
}
