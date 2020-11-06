import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
  }

  getQuery(query: string){

    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQB7v-sfgBgkvjeZW9jFLZex83sjwHyz6_E3JcGvLB-LeJSgZJZXXBfc14NPSZofsbggLXnGrUUCOlcW4l8'
    });

    return this.http.get(url, {headers});

  }

  getNewReleases(){

    return this.getQuery('browse/new-releases') 
    .pipe( map(data => data['albums'].items));
      
  }

  getArtists(termino: string){

    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
    .pipe(map(data => data['artists'].items));
      
  }
}
