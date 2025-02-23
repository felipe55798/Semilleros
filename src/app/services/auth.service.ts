import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { catchError, map, switchMap } from "rxjs/operators";
import { Storage } from '@ionic/storage';
import { User } from '../interfaces/user';
import { NavController, ToastController } from '@ionic/angular';
import { from, Observable, throwError } from 'rxjs';
import { RefreshService } from './refresh.service';
import { error } from 'protractor';


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
              private navCtrl:NavController,
              private toastCtrl:ToastController,
              private refreshService: RefreshService) { }

  login(data){
    return this.http.post(`${url}/login`,data).pipe(
      map(async(data:any)=>{
        const info = data.authaccess;
        this.token = info.access_token;
        this.user = data.user;
        await this.setToken(info.access_token,info.refresh_token)
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
        this.user = data.user;

        this.loginEvent.emit(true)
        return data;
      })
    )
  }

  refreshToken(tokenObj){
    return this.http.post(`${url}/refresh`,tokenObj);
  }

  async setToken(token:string,refresh_token:string){
    this.token = token;
    await this.storage.set('token',token);
    await this.storage.set('refresh_token',refresh_token)
  }

  async logout(interceptor?:string, valid = true){
    if (valid) {
      this.http.get(`${url}/logout`).subscribe(
        async (res:any) => {
          const toast = await this.toastCtrl.create({
            message: res.message,
            duration: 2000,
            color:'secondary'
          });
          toast.present();
        },
        (error => {
          this.checkToken();
          return throwError(error);
        })
      );
    }
    this.user = null;
    this.token = null;
    await this.storage.clear()
    this.logoutEvent.emit(true);

    if (interceptor) {
      let message:string = "";

      switch (interceptor) {
        case 'expired':
          message = 'Su sesión ha expirado, por favor vuelve a iniciar sesión'    
          break;
        default:
          message = 'Algo ha salido mal con su sesión actual, por favor vuelva a iniciar sesión'    
          break;
      }
      const toast = await this.toastCtrl.create({
        message,
        duration: 2000,
        color:'danger',
        position:'top'
      });
      toast.present();
    }

    this.navCtrl.navigateRoot('/tabs/tab1');
  }

  async loadToken(){
    return this.token = await this.storage.get('token') || null;
  }

  async checkToken():Promise<boolean>{
    await this.loadToken()

    if (!this.token) {
      this.navCtrl.navigateRoot('/tabs')
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


  getUser():Observable<User>{
    if (this.user) {
      return new Observable(obs=>obs.next(this.user))
    }

    if (this.token) {
      return this.http.get(`${url}/me`).pipe(
        map(user=>{
          this.user = user['user']
          return user['user']
        }),
        catchError((err)=>{
          return new Observable((observer)=>{
            return observer.next(null)
          })
        })
      )
    }

    return from(this.loadToken()).pipe(
      switchMap(res=>{
        if (!res) {
          return new Observable((observer)=>{
            return observer.next(null)
          })  
        }else{
          return this.http.get(`${url}/me`).pipe(
            map(user=>{
              this.user = user['user']
              return user['user']
            }),
            catchError((err)=>{
              return new Observable((observer)=>{
                return observer.next(null)
              })
            })
          )
        }
      })
    )
  }

  async refreshUser () {
    if (!this.token) {
      await this.loadToken();
    }
    
    await this.http.get(`${url}/me`).subscribe(
      (res => {
        this.user = res['user'];
        this.refreshService.updatedUser();
      }),
      (error => {
        this.checkToken();
        return throwError(error);
      })
    )
  }

  async checkRole(role:number, role2?:number):Promise<boolean>{
    if (this.user) {
      let haveRole = this.user.roles.find(roleUser=>roleUser.id === role || roleUser.id === role2);
      if (haveRole) {
        return Promise.resolve(true)
      }else{
        this.navCtrl.navigateRoot('/tabs/tab1')
        return Promise.resolve(false)
      }
    }else{
      return new Promise(resolve=>{
        this.getUser().subscribe(
          res=>{
            if (res) {
              let haveRole = res.roles.find(roleUser=>roleUser.id === role || roleUser.id === role2);
              if (haveRole) {
                return resolve(true)
              }else{
                this.navCtrl.navigateRoot('/tabs/tab1')
                return resolve(false)
              }
            }
          }
        )
      })
    }
  }
}
