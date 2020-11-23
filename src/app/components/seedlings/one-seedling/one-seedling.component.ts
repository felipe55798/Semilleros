import { Component, Input, OnInit } from '@angular/core';
import { Seedling } from 'src/app/interfaces/seedling';

@Component({
  selector: 'app-one-seedling',
  templateUrl: './one-seedling.component.html',
  styleUrls: ['./one-seedling.component.scss'],
})
export class OneSeedlingComponent implements OnInit {

  @Input() seedling:Seedling = {};
  @Input() imgVisible:boolean = true;
  @Input() value:number = 0;
  constructor() { }

  ngOnInit() {}

}
