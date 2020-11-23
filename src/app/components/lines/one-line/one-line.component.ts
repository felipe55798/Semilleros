import { Component, Input, OnInit } from '@angular/core';
import { Line } from 'src/app/interfaces/line';
import { RefreshService } from 'src/app/services/refresh.service';

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
  }
}