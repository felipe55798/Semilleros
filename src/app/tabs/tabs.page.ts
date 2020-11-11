import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
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
    this.authService.getUser().subscribe(
      res=> {
        if (res) {
          this.userLoggedIn = true
        }
      }
    )

    this.authService.logoutEvent.subscribe(res=>{
      if (res) {
        this.userLoggedIn = false;
      }
    })

    this.authService.loginEvent.subscribe(res=>{
      if (res) {
        this.userLoggedIn = true;
      }
    })
  }
}
