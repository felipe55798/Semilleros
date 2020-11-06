import { Component, OnInit } from '@angular/core';
import { Seedling } from 'src/app/interfaces/seedling';
import { SeedlingsService } from 'src/app/services/seedlings.service';

@Component({
  selector: 'app-home-seedling',
  templateUrl: './home-seedling.component.html',
  styleUrls: ['./home-seedling.component.scss'],
})
export class HomeSeedlingComponent implements OnInit {
  seedlings: Seedling[] = [];

  slidesOpts = {
    slidesPerView:1.1,
    freeMode:true,
    spaceBetween:-10
  };

  constructor(private seedlingService:SeedlingsService) { }

  ngOnInit() {}

  getSeedlings() {
    this.seedlingService.getSeedlingsList().subscribe(
      response => this.handleResponse(response), 
      err => this.handleError(err)
      );
  }

  handleResponse(response) {
    console.log(response);
    this.seedlings = response.seedlings;
  }

  handleError(error: any) {
    console.error(error);
  }
}
