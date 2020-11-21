import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  refresh = new EventEmitter<string>();
  updated  = new EventEmitter<boolean>();

  constructor() { }

  throwEvent(type:string){
    this.refresh.emit(type);
  }

  updatedUser(){
    this.updated.emit(true);
  }

}
