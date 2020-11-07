import { Component, Input, OnInit } from '@angular/core';
import { Publication } from 'src/app/interfaces/publication';
import { User } from 'src/app/interfaces/user';
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

  loading:boolean = false;
  @Input() user:User = null;
  
  constructor(private publicationService:PublicationService) { }

  ngOnInit() {
    this.getPublications()
  }

  getPublications(){
    this.loading = true;
    this.publicationService.getPublications().subscribe(
      res=>this.handleResponsePublication(res),
      err=>this.handleErrorPublications(err)
    )
  }

  handleResponsePublication(res){
    this.publications = res.publications;
    this.loading= false;
  }

  handleErrorPublications(err){
    console.log(err);
    this.loading= false;
  }

  loadPublications(event){
    setTimeout(() => {
      event.target.complete()
      event.target.disabled = true;
    }, 1000);
  }
}
