import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Publication } from 'src/app/interfaces/publication';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { PublicationService } from 'src/app/services/publication.service';
import { RefreshService } from 'src/app/services/refresh.service';

const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

@Component({
  selector: 'app-form-publication',
  templateUrl: './form-publication.page.html',
  styleUrls: ['./form-publication.page.scss'],
})


export class FormPublicationPage implements OnInit {

  validation_messages = {
    'references': [
        { type: 'required', message: 'La descripción de la publicación es obligatoria.' },
    ],
    'group_id': [
      { type: 'required', message: 'El grupo de investigación es obligatorio.' },
    ],
    'link': [
      { type: 'required', message: 'El enlace de la publicacion es obligatorio.' },
      { type: 'pattern', message: 'Formato de enlace invalido.' },
    ],
  } 

  error_unprocesable: Publication = {};

  toEdit:boolean = false;

  publication = new FormGroup({
    references: new FormControl('', Validators.required),
    link: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern(reg)
    ])),
    id: new FormControl(''),
    group_id: new FormControl('',Validators.required),
    user_id: new FormControl('')
  })

  publicationToEdit:Publication = {};

  sending:boolean = false;

  loggedUser: User = null;

  constructor(private route: ActivatedRoute,
              private publicationService: PublicationService,
              private toast: ToastController,
              private refreshService: RefreshService,
              private navCtrl: NavController,
              private loadingController: LoadingController,
              private authService: AuthService) { }

  ngOnInit() {
    this.loadUser()
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadData(id)
    }
  }

  loadUser(){
    this.authService.getUser().subscribe(
      res=>{
        this.loggedUser = res   
      }
    )
  }

  async loadData(id){
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando información...',
      duration: 2000
    });
    await loading.present();
    this.publicationService.getPublication(id).subscribe(
      res=>this.handleResponse(res, loading),
      err=>this.handleError(err, loading)
    )
  }

  async handleResponse(res, loading){
    const { role, data } = await loading.onDidDismiss();
    const { references, link, id, group_id, user_id } = res.publication;
    this.publicationToEdit = res.publication;
    const publication = {
      references, 
      link, 
      id,
      group_id,
      user_id
    }
    this.publication.setValue(publication);
    this.toEdit = true;
  }

  async handleError(err, loading){
    const { role, data } = await loading.onDidDismiss();
    if (err.status === 404) {
      this.navCtrl.navigateForward('/tabs/tab1');
      const toast = await this.toast.create({
        header:err.statusText,
        message:'Registro no encontrado',
        color:'danger',
        position:'top',
        duration:2000
      })
      toast.present()
    }
  }

  create(){
    this.sending = true;
    const newPublication = {
      ...this.publication.value,
      user_id: this.loggedUser.id,
    }
    this.publicationService.createPublication(newPublication).subscribe(
      res=>this.handleResponseCreate(res),
      err=>this.handleErrorCreate(err)
    )
  }

  async handleResponseCreate(res){
    this.sending = false;
    const toast = await this.toast.create({
      message: res.message,
      duration: 2000,
      color:'success'
    });
    toast.present();
    this.publication.reset()
    this.refreshService.throwEvent('publications');
    this.navCtrl.navigateRoot('/tabs/tab1');
  }

  handleErrorCreate(err){
    this.sending = false;
    if (err.status === 422) {
      this.error_unprocesable = err.error.errors;
    }else{
      console.log(err);
    }
  }


  update(){
    this.sending = true;
    this.publicationService.updatePublication(this.publicationToEdit.id,this.publication.value).subscribe(
      res=>this.handleResponseUpdate(res),
      err=>this.handleErrorUpdate(err)
    )
  }
  
  async handleResponseUpdate(res){
    this.sending = false;
    const toast = await this.toast.create({
      message: res.message,
      duration: 2000,
      color:'success'
    });
    toast.present();
    this.publication.reset()
    this.refreshService.throwEvent('publications');
    this.navCtrl.navigateRoot('/tabs/tab1');
  }

  handleErrorUpdate(err){
    this.sending = false;
    if (err.status === 422) {
      this.error_unprocesable = err.error.errors;
    }else{
      console.log(err);
    }
  }

} 
