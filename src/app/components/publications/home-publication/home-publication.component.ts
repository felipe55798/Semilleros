import { Component, OnInit } from '@angular/core';
import { Publication } from 'src/app/interfaces/publication';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-home-publication',
  templateUrl: './home-publication.component.html',
  styleUrls: ['./home-publication.component.scss'],
})
export class HomePublicationComponent implements OnInit {
  publications:Publication[] = [];
  
  slidesOpts = {
    slidesPerView:1.1,
    freeMode:true,
    spaceBetween:-10
  };

  constructor(private publicationService:PublicationService) { }

  ngOnInit() {}

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

  loadPublications(event){
    setTimeout(() => {
      event.target.complete()
      event.target.disabled = true;
    }, 1000);
  }
}
