import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.page.html',
  styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {

  valid:boolean = false;
  passwordReset:any = null;
  constructor() { }

  ngOnInit() {
  }

  handleEvent(event) {
    this.valid = true;
    this.passwordReset = event.passwordReset;
  }

}
