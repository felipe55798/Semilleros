import { Component } from '@angular/core';
import { error } from 'protractor';
import { Group } from '../interfaces/group';
import { Publication } from '../interfaces/publication';
import { Seedling } from '../interfaces/seedling';
import { GroupsService } from '../services/groups.service';
import { PublicationService } from '../services/publication.service';
import { SeedlingsService } from '../services/seedlings.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  publications:Publication[] = [];
  groups:Group[] = [];
  seedlings: Seedling[] = [];
  
  slidesOpts = {
    slidesPerView:1.1,
    freeMode:true,
    spaceBetween:-10
  };

  show = false;
  constructor(public apiService: GroupsService,
              public apiSeedling: SeedlingsService,
              private publicationService:PublicationService) {}

  ngOnInit() {
    this.getGroups();
    this.getSeedlings();
  }

  showContentCard(){
    this.show = !this.show;
  }

  getGroups() {
    this.apiService.getGroupsList().subscribe(
      response => this.handleResponse(response), 
      err => this.handleError(err)
      );
  }
  handleResponse(response) {
    console.log(response.groups);
    this.groups = response.groups;
  }
  
  handleError(error: any) {
    console.error(error);
  }

  getSeedlings() {
    this.apiSeedling.getSeedlingsList().subscribe(
      response => this.handleResponseSeedling(response), 
      err => this.handleError(err)
      );
  }

  getPublications(){
    this.publicationService.getPublications().subscribe(
      res=>this.handleResponsePublication(res),
      err=>this.handleErrorPublications(err)
    )
  }

  handleResponsePublication(res){
    this.publications = res.publications;
  }

  handleErrorPublications(err){
    console.log(err);
  }

  handleResponseSeedling(response) {
    console.log(response);
    this.seedlings = response.seedlings;
  }

  loadPublications(event){
    setTimeout(() => {
      event.target.complete()
      event.target.disabled = true;
    }, 1000);
  }

}