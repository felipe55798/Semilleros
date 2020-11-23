import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { Seedling } from 'src/app/interfaces/seedling';
import { AuthService } from 'src/app/services/auth.service';
import { RefreshService } from 'src/app/services/refresh.service';
import { SeedlingsService } from 'src/app/services/seedlings.service';

@Component({
  selector: 'app-seedlings-list',
  templateUrl: './seedlings-list.page.html',
  styleUrls: ['./seedlings-list.page.scss'],
})
export class SeedlingsListPage implements OnInit {
  admin:boolean = false;

  seedlings:Seedling[] = [];
  constructor(private apiService:SeedlingsService,
              private refreshService: RefreshService,
              private authService: AuthService) { }

  ngOnInit() {
    this.getSeedlings();
    this.loadUser()
    this.refreshService.refresh.subscribe(
      (res:string)=>{
        if (res === "seedlings") {
          this.getSeedlings()
        }
      }
    )
  }

  loadUser(){
    this.authService.getUser().subscribe(
      user=>{
        if (user && user.roles[0].id === 1) {
          this.admin = true;
        }
      }
    )
  }

  getSeedlings() {
    this.apiService.getSeedlingsList().subscribe(
      response => this.handleResponse(response), 
      err => this.handleError(err)
    );
  }

  handleResponse(response) {
    this.seedlings = response.seedlings;
  }
  
  handleError(error: any) {
    console.error(error);
  }

}
