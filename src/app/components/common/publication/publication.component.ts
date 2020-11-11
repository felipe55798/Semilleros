import { Component, Input, OnInit } from '@angular/core';
import { Publication } from 'src/app/interfaces/publication';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss'],
})
export class PublicationComponent implements OnInit {
  
  @Input() publication:Publication;
  constructor() { }

  ngOnInit() {
    console.log('propiedad Seedling: ' + this.publication);
  }

}
