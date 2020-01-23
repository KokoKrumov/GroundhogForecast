import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, NavigationEnd, ResolveEnd, Router, RouterEvent} from '@angular/router';

import {ConfigService} from '../config.service';
import {ObjWeather} from '../interfaces/obj-weather';
import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {

  // @Input() weatherDataFromTabs: any;
  @Output() historyList = new EventEmitter();

  error = false;
  days = 1;

  navigationEnds: Observable<NavigationEnd>;
  routePathParam: Observable<string>;

  constructor(
    public configService: ConfigService,
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) {
  }

  objWeather: ObjWeather = {
    weatherType: '',
    name: '',
    weatherIcon: '',
    region: '',
    country: '',
    temperature: undefined,
    description: '',
    feelsLike: undefined,
    humidity: undefined,
    windSpeed: undefined,
    historyList: [],
    days: []
  };

  showConfig(cityData, country, days) {
    this.configService.getConfig(cityData, country, days)
      .subscribe(
        (data: any) => {
          // console.log('data ', data);
          if (!data) {
            // @ToDo изкарай лист с autocomlpleated градове както на sinoptik
            // @ToDo ма малки градове, които weather api-то не отчита

            //   this.objWeather.name = data.error.info;
            this.error = true;
            console.log('null e');
          } else {
            this.error = false;
            this.objWeather.name = data.city_name;
            this.objWeather.weatherType = '';
            this.objWeather.weatherIcon = data.data[0].weather.icon;
            this.objWeather.region = data.state_code;
            this.objWeather.description = data.data[0].weather.description;
            this.objWeather.country = data.country_code;
            this.objWeather.temperature = data.data[0].temp;
            this.objWeather.feelsLike = data.data[0].app_max_temp;
            this.objWeather.humidity = data.data[0].rh;
            this.objWeather.windSpeed = data.data[0].wind_spd;

            if (!this.objWeather.historyList.includes(this.objWeather.name)) {
              // @ToDo make history list work
              this.objWeather.historyList.push(this.objWeather.name);
            }
          }
        }
      );
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(queryParams => {
      this.showConfig(queryParams.city, queryParams.country, this.days);
      this.historyList.emit(this.objWeather.historyList);
      console.log('this.error', this.error);
      console.log('error', this.objWeather.name);
    });

    // this.router.events.subscribe(
    //   (event: RouterEvent) => {
    //     // show data after navigation ends
    //     if (event instanceof NavigationEnd) {
    //       this.activeRoute.queryParams.subscribe(queryParams => {
    //         this.showConfig(this.searchType, queryParams.city);
    //         this.historyList.emit(this.objWeather.historyList);
    //         console.log('emit');
    //       });
    //     }
    //   }
    // );
  }
}
