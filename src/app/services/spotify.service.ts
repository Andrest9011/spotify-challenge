import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map,concatMap} from 'rxjs/operators';
import { from, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  
  accessToken: {
    token: string;
    expirationDate: Date;
  } = {
    token: '',
    expirationDate: new Date()
  }

  constructor(private http: HttpClient) {
  }

  getSpotifyToken() {
    const url = 'https://accounts.spotify.com/api/token';
    const headers = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    };
    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', 'ce98df1ed08845c5b4217af00caed57b')
      .set('client_secret', '1142be234d824858b8563db8e1194ff4');

    return this.http.post(url, body, headers).toPromise().then((data: any) => {
      const expirationDate = new Date();
      expirationDate.setSeconds(expirationDate.getSeconds() + data.expires_in);
      this.accessToken = {
        token: data.access_token,
        expirationDate,
      };
      return data.access_token + '';
    });
  }

  getToken() {

    if (new Date().getTime() >= this.accessToken.expirationDate.getTime()) {
      return from(this.getSpotifyToken());
    }
    return of(this.accessToken.token); 
    
  }

  getQuery(query: string){
    const url = `https://api.spotify.com/v1/${query}`;
    return this.getToken()
      .pipe(map(token => {
        return new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
      }), concatMap(headers => this.http.get(url, {headers})));
    
  }

  getNewReleases(){

    return this.getQuery(`browse/new-releases`) 
    .pipe( map(data => data['albums'].items));
      
  }

  searchArtists(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=12`)
    .pipe(map((data: any) => {
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
