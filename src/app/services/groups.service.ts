import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const url = `${environment.url}/v1/groups`;
@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient) { }

  getLatest(){
    return this.http.get(`${url}/latest`);
  }

  getGroupsList() {
    return this.http.get(url)
    .pipe(
      retry(2)
    );
  }

  getGroup(id){
    return this.http.get(`${url}/${id}`)
    .pipe(
      retry(2)
    );
  }

  createGroup(group){
    return this.http.post(`${url}`,group);
  }
  
  destroy(group){
    return this.http.delete(`${url}/${group}`)
  }
  
  update(group,data){
    return this.http.put(`${url}/${group}`,data)
  }

}
