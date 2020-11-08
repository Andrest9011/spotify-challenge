import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';
import { Subject, Observable, fromEvent, of } from 'rxjs';
import { debounceTime, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

  results: any;

  constructor(private spotify: SpotifyService) { }

  ngOnInit() {

    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(

      // get value
      map((event: any) => {
        return event.target.value;
      })
      // if character length greater then 2
      , filter(res => res.length > 2)

      // Time in milliseconds between key events
      , debounceTime(1000)

      // subscription for response
    ).subscribe((text: string) => {


      this.searchGetCall(text).subscribe((res) => {
        console.log('res', res);
        this.results = res;
      }, (err) => {
        console.log('error', err);
      });

    });
  }

  searchGetCall(term: string) {
    if (term === '') {
      return of([]);
    }
    return this.spotify.searchArtists(term);
  }

  


}
