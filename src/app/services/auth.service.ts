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
      map(async(data:any)=>{
        const info = data.authaccess;
        await this.setToken(info.access_token,info.refresh_token)
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

  async setToken(token:string,refresh_token:string){
    await this.storage.set('token',token);
    await this.storage.set('refresh_token',refresh_token)
  }

  async logout(){
    this.user = null;
    this.token = null;
    await this.storage.clear()

    this.navCtrl.navigateRoot('/tabs/tab1');
  }

  async loadToken(){
    this.token = await this.storage.get('token') || null;
  }

  async checkToken():Promise<boolean>{
    await this.loadToken()

    if (!this.token) {
      await this.logout()
      return Promise.resolve(false);
    }

    if (this.user) {
      return Promise.resolve(true);
    }

    return new Promise(resolve=>{
      this.http.get(`${url}/me`).subscribe(
        (res:any)=>{
          this.user = res.user;
          return resolve(true);
        }
      )
    })
  }

  async noLoggedIn(){
    await this.loadToken()
    if (this.user || this.token) {
      this.navCtrl.navigateRoot('/tabs/tab1')
      return false;
    }else{
      return true;
    }
  }

  async getUser() {
    console.log("El usuario: " + this.user);
    
    return this.loadUser();
    console.log("El usuario 2: " + this.user);
  }

  async loadUser(){
    console.log("El token: " + this.token);
    await this.loadToken();
    console.log("El token 2: " + this.token);
    if (this.token) {
      if (!this.user) {
        console.log("El token: 3 " + this.token);
        return this.http.get(`${url}/me`).subscribe(
          (res:any)=>{
            this.user = res.user;
            console.log("El Usuario cargado es: " + this.user);
          }
        )
      }else{
        return this.user;
      }
    }else{
      this.checkToken();
    }
  }
}
