import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, from, Observable, Subject, throwError } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckTokenService implements HttpInterceptor{
  private refreshTokenInProgress = false;
  private refreshTokenSubject: Subject<any> = new BehaviorSubject<any>(null);
  
  constructor(private storage:Storage,
              private authService:AuthService) { }

  intercept(requ: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(requ).pipe(
      catchError((err)=>{
        const error = (typeof err.error !== 'object') ? JSON.parse(err.error) : err;
        if (error.status === 401 && error.error.code === "token_expired") {
          
          if (!this.refreshTokenInProgress) {
            this.refreshTokenInProgress = true;
            this.refreshTokenSubject.next(null);

            return this.getRefreshToken().pipe(
              switchMap((refresh_token)=>{
                return this.authService.refreshToken({refresh_token}).pipe(
                  switchMap((authresponse:any)=>{
                    const response = authresponse.authaccess;
                    this.authService.setToken(response.access_token,response.refresh_token);
                    this.refreshTokenInProgress = false;
                    this.refreshTokenSubject.next(authresponse['access_token']);

                    return next.handle(this.injectToken(requ))
                  }),
                  catchError(err=>{
                    this.refreshTokenInProgress = false;
                    this.authService.logout('expired');

                    return next.handle(this.injectToken(requ))
                  })
                )


              })
            )
          }else{
            return this.refreshTokenSubject.pipe(
              filter(result => result !== null),
              take(1),
              switchMap((res)=>{
                return next.handle(this.injectToken(requ))
              })
            )
          }
        }else{
          if (error.status === 401 && error.error.code === "invalid_token") {
            this.authService.logout('invalid')
            return throwError(err)
          }else{
            if (err.status === 404 && error.error.err === 'token_not_found') {
              this.authService.logout('notfound');
              return throwError(err)
            }
          }
        }
        return throwError(err)
      })
    )
  }

  getToken():Observable<String>{
    return from(this.storage.get('token'))
  }

  getRefreshToken():Observable<String>{
    return from(this.storage.get('refresh_token'))
  }


  injectToken(request:HttpRequest<any>):any{
    return this.getToken().pipe(
      map((res)=>{
        return request.clone({
          setHeaders: {
            Authorization: `Bearer ${res}`
          }
      });
      })
    )
  }
  
}
