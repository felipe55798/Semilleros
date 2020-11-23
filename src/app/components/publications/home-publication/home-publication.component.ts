import { Component, Input, OnInit } from '@angular/core';
import { Publication } from 'src/app/interfaces/publication';
import { User } from 'src/app/interfaces/user';
import { PublicationService } from 'src/app/services/publication.service';
import { RefreshService } from 'src/app/services/refresh.service';

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
  
  current_page = 0;

  loading:boolean = false;
  @Input() user:User = null;
  
  constructor(private publicationService:PublicationService,
              private refreshService: RefreshService) { }

  ngOnInit() {
    this.refreshService.refresh.subscribe(
      (res:string)=>{
        if (res === "publications") {
          this.getPublications()
        }
      }
    )
    this.getPublications()
  }

  getPublications( event? ){
    this.loading = true;
    this.publicationService.getPublications(this.current_page).subscribe(
      res=>this.handleResponsePublication(res,event ),
      err=>this.handleErrorPublications(err)
    )
  }

  handleResponsePublication(res, event?){
    const { current_page, data } = res.publications;
    
    if (data.length == 0 && event) {
      event.target.disabled = true;
      event.target.complete();
    }
    this.current_page = current_page;
    this.publications.push(...data);
    this.loading= false;

    if (event) {
      event.target.complete();
    }
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
