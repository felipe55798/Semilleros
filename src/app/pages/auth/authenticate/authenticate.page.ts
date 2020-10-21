import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.page.html',
  styleUrls: ['./authenticate.page.scss'],
})
export class AuthenticatePage implements OnInit {

  option:string = "login";

  constructor() { }

  ngOnInit() {
  }

  cambio(event){
    this.option = event.detail.value;
  }
}
