import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  show = false;
  loggedUser:User = null;
  loading:boolean = true;

  constructor(private authService:AuthService,
              private loadingController: LoadingController) {}

  async ngOnInit() {
    this.authService.getUser().then(async user=>{
      this.loggedUser = user;      
      this.loading = false;
    })
  }

  showContentCard(){
    this.show = !this.show;
  }
}