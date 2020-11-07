import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
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

  logoutEvent = new EventEmitter<boolean>();
  loginEvent = new EventEmitter<boolean>();

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

        this.loginEvent.emit(true)
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

        this.loginEvent.emit(true)
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
    console.log('Llamado');
    
    this.user = null;
    this.token = null;
    await this.storage.clear()

    this.logoutEvent.emit(true);

    this.navCtrl.navigateRoot('/tabs/tab1');
  }

  async loadToken(){
    this.token = await this.storage.get('token') || null;
  }

  async checkToken():Promise<boolean>{
    await this.loadToken()

    if (!this.token) {
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
        },
        (err)=>{
          this.logout()
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

  getUser():Promise<User>{
    if (this.user) {
      return Promise.resolve(this.user);
    }

    return this.checkToken().then(logged=>{
      if (logged) {
        return this.user
      }else{
        return null;
      }
    })
    
  }
}
