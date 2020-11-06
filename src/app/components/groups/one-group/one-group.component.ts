import { Component,Input, OnInit } from '@angular/core';
import { Group } from 'src/app/interfaces/group';

@Component({
  selector: 'app-one-group',
  templateUrl: './one-group.component.html',
  styleUrls: ['./one-group.component.scss'],
})
export class OneGroupComponent implements OnInit {

  @Input() group:Group = {};
  constructor() { }

  ngOnInit() {
    console.log('propiedad1 ' + this.group);
  }
}