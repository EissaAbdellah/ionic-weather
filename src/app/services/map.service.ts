import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    private http:HttpClient
  ) { }

  getMap(){
    return this.http.get<any>(`https://www.mapquestapi.com/staticmap/v5/map?key=P6UqimKP8Pls9mBA4ye2Ev1kYE9lRg2e&center=
    {{weather.name}}&zoom=10&type=hyb&size=600,300@2x'`);
  }

}
