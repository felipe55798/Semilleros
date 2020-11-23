import { Component, Input, OnInit } from '@angular/core';
import { Group } from 'src/app/interfaces/group';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {

  @Input() group:Group = {};
  constructor() { }

  ngOnInit() {
  }

}
