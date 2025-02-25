import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const url = `${environment.url}/v1/departments`;

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  getDepartmentsList() {
    return this.http.get(url)
    .pipe(
      retry(1)
    );
  }

  getDepartment(id) {
    return this.http.get(`${url}/${id}`)
    .pipe(
      retry(1)
    );
  }

  createDepartment(department){
    return this.http.post(`${url}`,department).pipe(
      retry(1)
    )
  }

  destroy(id){
    return this.http.delete(`${url}/${id}`);
  }

  update(id,department){
    return this.http.put(`${url}/${id}`,department)
  }
}
