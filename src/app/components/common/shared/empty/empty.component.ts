import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
})
export class EmptyComponent implements OnInit {

  @Input() title_message:string = "";

  constructor() { }

  ngOnInit() {}

}
