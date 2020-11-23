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

  getProgram(id){
    return this.http.get(`${url}/${id}`);
  }

  destroy(id){
    return this.http.delete(`${url}/${id}`);
  }

  update(program_id,program){
    return this.http.put(`${url}/${program_id}`,program);
  }
}
