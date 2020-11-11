import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{
  show = false;
  loggedUser:User = null;
  loading:boolean = true;

  visibleButtonList:boolean = false;
  
  constructor(private authService:AuthService,
              private navCtrl:NavController) {}

  async ngOnInit() {
    this.getUser();

    this.authService.loginEvent.subscribe(res=>{
      if (res) {
        this.getUser()
      }
    })

    this.authService.logoutEvent.subscribe(res=>{
      if (res) {
        this.loggedUser = null;
      }
    })

  }

  getUser(){
    this.authService.getUser().subscribe(res=>{
      this.loading = false;
      if (res) {
        this.loggedUser = res;
      }
    })
  }

  showContentCard(){
    this.show = !this.show;
  }

  navigate(ruta:string){
    this.visibleButtonList = false;
    this.navCtrl.navigateForward(ruta);
  }
}