import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { PasswordService } from 'src/app/services/password.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
})
export class CodeComponent implements OnInit {

  validation_messages = {
    'token': [
        { type: 'required', message: 'El código de verificación es obligatorio.' },
        { type: 'pattern', message: 'Formato de código no válido'}
      ]
  } 
  data = new FormGroup({
    token: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('[0-9]{6}'),
      Validators.maxLength(6)
    ]))
  });
  error_unprocesable = {
    token:null
  };
  sending:boolean = false;
  @Output() response = new EventEmitter<any>();
  constructor(private passwordService:PasswordService,
              private toastController:ToastController,
              private navController:NavController) { }

  ngOnInit() {}

  find() {
    this.sending = true;
    this.passwordService.findCode(this.data.value).subscribe(
      res => this.handleResponse(res),
      err => this.handleError(err)
    )
  }

  handleResponse(response) {
    this.response.emit(response);
    this.sending = false;
  }

  handleError(error) {
    this.sending = false;
    if (error.status === 422) {
      this.error_unprocesable = error.error.errors;
    }else{
      this.alertResponse(error.error.message, 'danger', 'Error');
    }
  }

  async alertResponse(message:string, color:string, header:string) {
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

  handleKeyEvent(event){
    if (event.target.value.length > 5) {
      this.setPosition(event.target,5)
    }
  }

  setPosition(element, position){
    if (element != null) {
      if (element.createTextRange) {
        const range = element.createTextRange();
        range.move('character', position);
        range.select();
      }else{
        if (element.selectionStart) {
          element.focus();
          element.setSelectionRange(position,position);
        }else{
          element.focus();
        }
      }
    }
  }

}
