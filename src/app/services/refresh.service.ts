import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  refresh = new EventEmitter<string>();

  constructor() { }

  throwEvent(type:string){
    this.refresh.emit(type);
  }

}
