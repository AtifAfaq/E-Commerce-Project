// import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, empty } from 'rxjs';
import { map, take, filter } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
interface State {
  id: number;
  name: string;
  countryId: number;
}
interface Country {
  id: number;
  name: string;
}


export class CountriesService {

  constructor(private http: HttpClient) { }

  public getCountries(): Observable<Country[]> {
    return this.http.get('./assets/data.json')
      .pipe(
        map(data => data["countries"])
      );
  }

  public getStates(countryId: number): Observable<State[]> {
    return this.http.get('./assets/data.json')
      .pipe(
        map(data => data["states"]),
        map(states => states.filter(state => state.countryId == countryId))
      );
  }
}
