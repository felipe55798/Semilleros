import { Component, Input, OnInit } from '@angular/core';
import { Seedling } from 'src/app/interfaces/seedling';

@Component({
  selector: 'app-seedling',
  templateUrl: './seedling.component.html',
  styleUrls: ['./seedling.component.scss'],
})
export class SeedlingComponent implements OnInit {

  @Input() seedling:Seedling = {};
  
  constructor() { }

  ngOnInit() {
  }

}
