import { Component, Input, OnInit } from '@angular/core';
import { Line } from 'src/app/interfaces/line';

@Component({
  selector: 'app-one-line',
  templateUrl: './one-line.component.html',
  styleUrls: ['./one-line.component.scss'],
})
export class OneLineComponent implements OnInit {

  @Input() line:Line = {};
  @Input() value:number = 0;
  constructor() { }

  ngOnInit() {
    console.log('Propiedad Seddling: ' + this.line);
  }
}