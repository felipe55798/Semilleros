import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const url = `${environment.url}/auth`;
@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private httpClient:HttpClient) { }

  resetPassword(data) {
    return this.httpClient.post(`${url}/resetPassword`, data);
  }

  findCode(data){
    console.log(data);
    return this.httpClient.get(`${url}/findToken/${data.token}`);
  }

  recoverPassword(data) {
    return this.httpClient.post(`${url}/recoverPassword`, data);
  }
}
