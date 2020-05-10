import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

   _url=`http://api.openweathermap.org/data/2.5/weather`;
   key='4dbccbf79d4d278c8794f441f03b2c09';

  constructor(
    private http:HttpClient
  ) { }

  getWeather(lat,lon){
    let params=new HttpParams()
    .set('lat',lat)
    .set('lon',lon)
    .set('units','imperial')
    .set('appid',this.key);

    return this.http.get<any>(this._url,{params});


  }

  getWeatherByCityName(city:string){

    let params=new HttpParams()
    .set('q',city)
    .set('units','imperial')
    .set('appid',this.key);

    return this.http.get<any>(this._url,{params});

  }


}
