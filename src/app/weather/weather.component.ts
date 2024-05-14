import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather/wheather.service';
import { Cities, City, WeatherForcasts, WeatherInfo } from '../interfaces/WeatherInfo';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit {
  public weathers: WeatherForcasts = {} as WeatherForcasts;
  public currentWeather: WeatherInfo = {} as WeatherInfo;
  public currentCity: City = {} as City;

  control = new FormControl('');
  cities: City[] = [];
  filteredCities: Observable<City[]> | undefined;
  
  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {

    this.filteredCities = this.control.valueChanges.pipe(
      map(value => this._filter(value || '')),
    );

    this.weatherService.getInitCity().subscribe(city => {
      this.currentCity = city;
      console.log("Current City", city);
    });

    this.weatherService.getInitData().subscribe(weathers => {
      this.weathers = weathers;
      this.currentWeather = this.weathers.DailyForecasts[0]; 
      console.log("Weathers Forcast", this.weathers);
      console.log("current Weather", this.currentWeather);
    });
    console.log("Weathers Forcast", this.weathers);



    console.log("~~~  Weather Component Loaded ~~~");

  }

  updateWeather(city: City) {
    this.currentCity = city;
    this.weatherService.getCityData(city.Key).subscribe(weathers => {
      this.weathers = weathers;
      this.currentWeather = this.weathers.DailyForecasts[0];
      console.log("Update Weathers Forcast", this.weathers);
      console.log(" Update current Weather", this.currentWeather);
    });
  }

  private _filter(value: string): City[] {
    const filterValue = this._normalizeValue(value);
    console.log("value", filterValue);
    this.weatherService.getAutoCompleteCities(filterValue).subscribe(cities => {
      this.cities = cities;
      console.log("retured Cities", this.cities);
    })
   // return this.cities.filter(street => this._normalizeValue(street).includes(filterValue));
    return this.cities;
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}


 


