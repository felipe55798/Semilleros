import { Component, Input, OnInit } from '@angular/core';
import { Department } from 'src/app/interfaces/department';
import { Params } from '@angular/router';

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
  }

}