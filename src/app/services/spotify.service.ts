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
      'Authorization': 'Bearer BQAZAYNjJMQ9FFccnnNNXlVP2YrCy8_KnPskb4fhUmApnshbHVsAuXZk6_ohufLMeUg6HI1bc7IdFX1_5cI'
    });

    return this.http.get(url, {headers});

  }

  getNewReleases(){

    return this.getQuery('browse/new-releases') 
    .pipe( map(data => data['albums'].items));
      
  }

  getArtists(termino: string){

    return this.getQuery(`search?q=${termino}&type=album,artist,playlist,track,episode,show&limit=15`)
    .pipe(map(data => data['artists'].items));
      
  }

  getArtist(id: string){

    return this.getQuery(`artists/${id}`);
      
  }

  getTopTracks(id: string){

    return this.getQuery(`artists/${id}/top-tracks?market=us`)
    .pipe(map(data => data['tracks']));
      
  }
}
