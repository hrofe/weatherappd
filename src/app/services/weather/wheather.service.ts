import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cities, City, WeatherForcasts, WeatherInfo } from '../../interfaces/WeatherInfo';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apikey: string = "xKGurYEsXUceeUvA4OW5UJVRfw5P4FZl";

  constructor(private http: HttpClient) { }

  getDemoData() {
    return this.http.get<WeatherForcasts>('/assets/TelAvivForcastExample.json')
      .pipe(map(weathers => {
        //users
        //this.dataService.setOption("currentUser", JSON.stringify(user));
        //// this.dataService.setOption('currentUser', JSON.stringify(user));
        //if (this.currentUserSubject === undefined) {
        //  this.currentUserSubject = new BehaviorSubject(user.loginedEmployee);
        //  console.log('current User Subject', this.currentUserSubject);
        //  //this.currentUserSubject.next(user.loginedEmployee);
        //}
        //else {
        //  this.currentUserSubject.next(user.loginedEmployee);
        //}

        return weathers;

      }))
  };

  getAutoCompleteCities(value:string) {
    return this.http.get<City[]>('https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=' + this.apikey +'&q='+value)
      .pipe(map(city => {
        return city;

      }))
   }

  getInitCity() {
    return this.http.get<City>('https://dataservice.accuweather.com/locations/v1/215854?apikey=' + this.apikey +'&language=en-us&details=false')
      .pipe(map(city => {
        return city;

      }))
  }

  getInitData() {
    return this.http.get<WeatherForcasts>('https://dataservice.accuweather.com/forecasts/v1/daily/5day/215854?apikey=' + this.apikey +'&language=en-us&details=false&metric=true')
      .pipe(map(weathers => {
        return weathers;

      }))
  }

  getCityData(cityKey: string) {
    return this.http.get<WeatherForcasts>('https://dataservice.accuweather.com/forecasts/v1/daily/5day/' + cityKey + '?apikey=' + this.apikey +'&language=en-us&details=false&metric=true')
      .pipe(map(weathers => {
        return weathers;

      }))
  }
}
