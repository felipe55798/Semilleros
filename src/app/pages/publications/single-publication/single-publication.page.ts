import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Publication } from 'src/app/interfaces/publication';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-single-publication',
  templateUrl: './single-publication.page.html',
  styleUrls: ['./single-publication.page.scss'],
})
export class SinglePublicationPage implements OnInit {

  id: string;
  publication:Publication = {};
  constructor(private route: ActivatedRoute,
    private publicationService: PublicationService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getPublication();
  }

  getPublication() {
    console.log(this.id);
    
    return this.publicationService.getPublication(this.id).subscribe(
      res => this.handleResponse(res),
      err => this.handleError(err)
    );
  }

  handleResponse(response) {
    console.log(response);
    this.publication = response.publication;
  }
  
  handleError(error: any) {
    console.error(error);
  }

}
