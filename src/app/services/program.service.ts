import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const url = `${environment.url}/v1/programs`;

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  constructor(private http:HttpClient) { }

  getPrograms(){
    return this.http.get(`${url}`);
  }

  createService(program){
    return this.http.post(`${url}`,program);
  }
}
