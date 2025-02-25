import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const url = `${environment.url}/v1/publications`

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(private http:HttpClient) { }

  getPublications(page:number){
    return this.http.get(`${url}?page=${page+1}`);
  }

  getPublication(id) {
    return this.http.get(`${url}/${id}`);
  }

  createPublication(publication){
    return this.http.post(`${url}`,publication);
  }

  updatePublication(publication_id, publication){
    return this.http.put(`${url}/${publication_id}`,publication);
  }

  destroy(publication_id){
    return this.http.delete(`${url}/${publication_id}`);
  }
}
