import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { WeatherData } from '../weather-data';
import { MapService } from '../services/map.service';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  lat: number = 51.678418;
  city='cairo'
  CITY;
  lng: number = 7.809007;
  imgUrl='http://openweathermap.org/img/wn/10d@2x.png'
  weather={"coord":{"lon":this.lng,"lat":this.lat},
  "weather":[{"id":0,"main":"Clouds","description":"scattered clouds","icon":"03n"}],
  "base":"stations","main":{"temp":300.15,"pressure":1007,"humidity":74,"temp_min":300.15,"temp_max":300.15},
  "visibility":10000,"wind":{"speed":3.6,"deg":160},
  "clouds":{"all":40},"dt":1485790200,
  "sys":{"type":1,"id":8166,"message":0.2064,"country":"AU","sunrise":1485720272,"sunset":1485766550},"id":2172797,"name":"Cairns","cod":200}

  constructor(
    private weatherService:WeatherService,
    private loadCtrl:LoadingController,
    public toastController: ToastController
  ) {}
  ngOnInit(){
   
  }

  ionViewDidEnter(){
    this.loadCtrl.create({message:'loading'})
    .then(loadEl=>{
      
      loadEl.present();
      this.getlocation();
      loadEl.dismiss();
    });
    
   
  }
  

  getlocation(){
    if('geolocation' in navigator){
      navigator.geolocation.watchPosition((location)=>{
        this.lat=location.coords.latitude;
        this.lng=location.coords.longitude;

        this.weatherService.getWeather(this.lat,this.lng).subscribe(data=>{
          this.weather=data;
        console.log(data);
        
          
        });
      });
    }
  }

  getCityWeather(city){
   
    this.weatherService.getWeatherByCityName(city).subscribe(data=>{

      console.log(data);

    });
  }


  search(event){
    
    this.CITY=event.target.value;
    console.log(this.CITY);
    this.loadCtrl.create({message:'searching ...'})
    .then(loadEL=>{
      loadEL.present();
      
      this.weatherService.getWeatherByCityName(this.CITY).subscribe(
        data=>{
          if(data){
            this.weather=data;
          }
          else{
            console.log("Errror");
            
          }
        },
        err=>{
          console.log(err);
          
         this.toastController.create({message:"invalid place ",duration:3000})
         .then(toastEl=>{
           toastEl.present();
           
         });
   
        }
       );

       loadEL.dismiss();


    });

    
  
      
  }

}
