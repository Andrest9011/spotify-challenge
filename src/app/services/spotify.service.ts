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
      'Authorization': 'Bearer BQDupiPlFm_i5BKKqR6tWo8Jk2xwZQ33Seqcfehx2TN0b5lr846q5Kn4G2hz26Sx8awJpEA8MY1La04D6Y8'
    });

    return this.http.get(url, {headers});

  }

  getNewReleases(){

    return this.getQuery(`browse/new-releases`) 
    .pipe( map(data => data['albums'].items));
      
  }

  getArtists(termino: string){

    return this.getQuery(`search?q=${termino}&type=album,artist,playlist,track,episode,show&limit=15`)
    .pipe(map(data => {
      console.log(data);
      return data['artists'].items;
    }));
      
  }

  getArtist(id: string){

    return this.getQuery(`artists/${id}`);
      
  }

  getTopTracks(id: string){

    return this.getQuery(`artists/${id}/top-tracks?market=us`)
    .pipe(map(data => data['tracks']));
      
  }

  getReleatedArtist(id: string){

    return this.getQuery(`artists/${id}/related-artists`)
    .pipe(map(data => data['artists']));
  }

  getAlbums(id: string){
    return this.getQuery(`artists/${id}/albums`)
    .pipe(map((data: any) => data.items));
  }
}
