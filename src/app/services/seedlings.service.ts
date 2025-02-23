import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const url = `${environment.url}/v1/seedlings`;
@Injectable({
  providedIn: 'root'
})
export class SeedlingsService {

  constructor(private http: HttpClient) { }

  getLatest(){
    return this.http.get(`${url}/latest`);
  }

  getSeedlingsList() {
    return this.http.get(url)
    .pipe(
      retry(2)
    );
  }

  getSeedling(id) {
    return this.http.get(`${url}/${id}`)
    .pipe(
      retry(2)
    );
  }

  createSeedling(seedling){
    return this.http.post(`${url}`,seedling);
  }

  destroy(seedling_id){
    return this.http.delete(`${url}/${seedling_id}`);
  }

  update(seedling,id){
    return this.http.put(`${url}/${id}`,seedling)
  }
}