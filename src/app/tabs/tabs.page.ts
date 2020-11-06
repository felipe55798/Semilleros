import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  userLoggedIn = false;
  constructor(private authService:AuthService) {}

  ngOnInit() {
    this.authService.getUser().then(user => {
      console.log("El usuario es: " + user);
      if (user.name) {
        this.userLoggedIn = true;
      }
    }).catch(err =>{
      this.authService.checkToken();
    })
  }
}
