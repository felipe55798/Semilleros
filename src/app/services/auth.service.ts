import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { map } from "rxjs/operators";
import { Storage } from '@ionic/storage';
import { User } from '../interfaces/user';
import { NavController } from '@ionic/angular';


const url = `${environment.url}/auth`;


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token:string = null;
  user:User = null;

  constructor(private http:HttpClient,
              private storage:Storage,
              private navCtrl:NavController) { }

  login(data){
    return this.http.post(`${url}/login`,data).pipe(
      map((data:any)=>{
        const info = data.authaccess;
        this.setToken(info.access_token,info.refresh_token)
        
        this.token = info.access_token;
        this.user = info.user;

        return data;
      })
    )
  }

  register(user){
    return this.http.post(`${url}/signup`,user).pipe(
      map((data:any)=>{
        const info = data.authaccess;
        this.storage.set('token',info.access_token);
        this.storage.set('refresh_token',info.refresh_token)
        this.token = info.access_token;
        this.user = info.user;

        return data;
      })
    )
  }

  refreshToken(tokenObj){
    return this.http.get(`${URL}/refresh`,tokenObj);
  }

  setToken(token:string,refresh_token:string){
    this.storage.set('token',token);
    this.storage.set('refresh_token',refresh_token)
  }

  async logout(){
    this.user = null;
    this.token = null;
    await this.storage.clear()

    this.navCtrl.navigateRoot('/tabs/tab1');
  }
}
