import { Component, Input, OnInit } from '@angular/core';
import { Program } from 'src/app/interfaces/program';

@Component({
  selector: 'app-one-program',
  templateUrl: './one-program.component.html',
  styleUrls: ['./one-program.component.scss'],
})
export class OneProgramComponent implements OnInit {

  @Input() program:Program = {};
  @Input() imgVisible:boolean = true;
  constructor() { }

  ngOnInit() {
    console.log('propiedad1 ' + this.program);
  }

}
