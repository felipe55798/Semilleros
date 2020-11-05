import { Component, Input, OnInit } from '@angular/core';
import { Department } from 'src/app/interfaces/department';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent implements OnInit {

  @Input() department:Department = {};
  @Input() value:number = 0;
  constructor() { }

  ngOnInit() {
    console.log('p1 ' + this.department + ' p2 ' + this.value);
  }

}
