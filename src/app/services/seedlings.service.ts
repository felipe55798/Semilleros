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

  getSeedlingsList() {
    return this.http.get(url)
    .pipe(
      retry(2)
    );
  }
}
