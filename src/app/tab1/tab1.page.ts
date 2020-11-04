import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  slidesOpts = {
    slidesPerView:1.1,
    freeMode:true,
    spaceBetween:-10
  };

  show = false;
  constructor() {}

  showContentCard(){
    this.show = !this.show;
  }

}
