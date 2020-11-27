import { Component, Input, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
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
              private refreshService: RefreshService,
              private toastController: ToastController) { }

  ngOnInit() {
    this.refreshService.refresh.subscribe(
      (res:string)=>{
        if (res === "publications") {
          this.current_page = 0;
          this.publications = [];
          this.getPublications()
        }
      }
    )
    this.getPublications()
  }

  getPublications( event? ){
    if (!event) {
      this.loading = true;
    }
    this.publicationService.getPublications(this.current_page).subscribe(
      res=>this.handleResponsePublication(res,event ),
      err=>this.handleErrorPublications(err)
    )
  }

  handleResponsePublication(res, event?){
    const { current_page, data } = res.publications;
    this.current_page = current_page;
    
    if (data.length === 0 && event) {
      event.target.disabled = true;
      event.target.complete();
    }
    
    this.publications.push(...data);
    this.loading = false;
    if (event) {
      event.target.complete();
    }
  }

  handleErrorPublications(err){
    this.loading= false;
    this.alertError('Error en el servidor, por favor intente más tarde', 'danger', 'Error');
  }

  loadPublications(event){
    this.getPublications(event)
  }

  async alertError(message:string, color:string, header:string) {
    const toast = await this.toastController.create({
      header,
      message,
      position: 'top',
      animated:true,
      color,
      duration:4000,
      cssClass:'alert-error'
    });
    toast.present();
  }
}
