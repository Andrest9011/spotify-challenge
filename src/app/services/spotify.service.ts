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
      'Authorization': 'Bearer BQAOuDl4GA7LxIs2o-UcLqDbzyaLIjl_go9-nIlza8uQAePAtw9yNy8fJnc_6uM3lH4BrMJiHy-SVrhbPSs'
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

  getArtist(id: string){

    return this.getQuery(`artists/${id}`);
      
  }

  getTopTracks(id: string){

    return this.getQuery(`artists/${id}/top-tracks?market=us`)
    .pipe(map(data => data['tracks']));
      
  }
}
