import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const url = `${environment.url}/v1`

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getTeachers(){
    return this.http.get(`${url}/teachers`);
  }

  createUser(user){
    return this.http.post(`${url}/users`,user);
  }
  
  getUser(id){
    return this.http.get(`${url}/users/${id}`)
    .pipe(
      retry(2)
    );
  }

  updateUser(user, id){
    return this.http.put(`${url}/users/${id}`,user);
  }

  updatePassword(data){
    return this.http.put(`${url}/updatePassword`,data);
  }

  destroy(user){
    return this.http.delete(`${url}/users/${user.id}`);
  }
}