import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInjectionService implements HttpInterceptor{

  constructor(private storage:Storage) { }

  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
    return this.getToken().pipe(
      mergeMap((token:string)=>{
        if (!token) {
          return next.handle(req)
        }
        let request = req.clone({
          setHeaders:{
            'Authorization': `Bearer ${token}`
          }
        })
        return next.handle(request)
      })
    )
  }

  getToken():Observable<String>{
    return from(this.storage.get('token'))
  }
    
}