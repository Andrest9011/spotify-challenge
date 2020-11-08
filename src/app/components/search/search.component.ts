import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Subject, Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  results$: Observable<any>;
  subject = new Subject();

  constructor(private spotify: SpotifyService) { }

  ngOnInit(): void {
    this.results$ = this.subject.pipe(
      debounceTime(500),
      map((searchText: string) => this.spotify.getArtists(searchText))
    );
  }

  search(evt) {
    const searchText = evt.target.value;
    // emits the `searchText` into the stream. This will cause the operators in its pipe function (defined in the ngOnInit method) to be run. `debounceTime` runs and then `map`. If the time interval of 1 sec in debounceTime hasn’t elapsed, map will not be called, thereby saving the server from being called.
    this.subject.next(searchText)
}
  


}
