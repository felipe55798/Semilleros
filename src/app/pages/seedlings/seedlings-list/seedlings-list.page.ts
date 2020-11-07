import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { Seedling } from 'src/app/interfaces/seedling';
import { SeedlingsService } from 'src/app/services/seedlings.service';

@Component({
  selector: 'app-seedlings-list',
  templateUrl: './seedlings-list.page.html',
  styleUrls: ['./seedlings-list.page.scss'],
})
export class SeedlingsListPage implements OnInit {

  seedlings:Seedling[] = [];
  constructor(public apiService:SeedlingsService) { }

  ngOnInit() {
    this.getSeedlings();
  }

  getSeedlings() {
    this.apiService.getSeedlingsList().subscribe(
      response => this.handleResponse(response), 
      err => this.handleError(err)
    );
  }

  handleResponse(response) {
    console.log(response.seedlings);
    this.seedlings = response.seedlings;
  }
  
  handleError(error: any) {
    console.error(error);
  }

}
