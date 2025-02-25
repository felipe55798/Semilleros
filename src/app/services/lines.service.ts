import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const url = `${environment.url}/v1/lines`;
@Injectable({
  providedIn: 'root'
})
export class LinesService {

  
  constructor(private http: HttpClient) { }

  getLinesList() {
    return this.http.get(url)
    .pipe(
      retry(2)
    );
  }

  getLine(id){
    return this.http.get(`${url}/${id}`)
    .pipe(
      retry(2)
    );
  }

  createLine(line){
    return this.http.post(`${url}`,line);
  }

  destroy(line){
    return this.http.delete(`${url}/${line}`)
  }

  update(line_id, line){
    return this.http.put(`${url}/${line_id}`,line);
  }
}
