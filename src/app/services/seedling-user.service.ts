import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const url = `${environment.url}/v1`;
@Injectable({
  providedIn: 'root'
})
export class SeedlingUserService {

  constructor(private http: HttpClient) { }

  createSeedlingUser(seedlingUser) {
    return this.http.post(`${url}/seedlingUser`,seedlingUser);
  }

  setStatus(seedlingUser) {
    return this.http.put(`${url}/changeStatus`,seedlingUser);
  }
}