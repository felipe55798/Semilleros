import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PublicationService } from 'src/app/services/publication.service';

const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

@Component({
  selector: 'app-form-publication',
  templateUrl: './form-publication.page.html',
  styleUrls: ['./form-publication.page.scss'],
})


export class FormPublicationPage implements OnInit {

  toEdit:boolean = false;

  publication = new FormGroup({
    references: new FormControl('', Validators.required),
    link: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern(reg)
    ])),
    id: new FormControl('')
  })

  constructor(private route: ActivatedRoute,
              private publicationService: PublicationService) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadData(id)
    }
  }

  loadData(id){
    this.publicationService.getPublication(id).subscribe(
      res=>this.handleResponse(res),
      err=>this.handleError(err)
    )
  }

  handleResponse(res){
    const { references, link, id } = res.publication;
    const publication = {

    }

  }

  handleError(err){

  }


}
