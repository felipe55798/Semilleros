import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header-action',
  templateUrl: './header-action.component.html',
  styleUrls: ['./header-action.component.scss'],
})
export class HeaderActionComponent implements OnInit {
  loggedIn:boolean = false;
  loading:boolean = true;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUser().subscribe(
      user=>{
        this.loading = false;
        if (user) {
          this.loggedIn = true;
        }
      }
    )

    this.authService.loginEvent.subscribe(res=>{
      if (res) {
        this.loggedIn = true;
        this.loading = false;
      }
    })

    this.authService.logoutEvent.subscribe(res=>{
      if (res) {
        this.loggedIn = false;
        this.loading = false;
      }
    })
  }

  logout(){
    this.authService.logout()
  }

}