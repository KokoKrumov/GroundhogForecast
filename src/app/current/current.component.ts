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
  searchType = 'current';

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
  };

  showConfig(searchType, cityData) {
    this.configService.getConfig(searchType, cityData)
      .subscribe(
        (data: any) => {
          if (data.success === false) {
            this.objWeather.name = data.error.info;
            this.error = true;
          } else {
            this.error = false;
            this.objWeather.name = data.location.name;
            this.objWeather.weatherType = '';
            this.objWeather.weatherIcon = data.current.weather_icons[0];
            this.objWeather.region = data.location.region;
            this.objWeather.description = data.current.weather_descriptions;
            this.objWeather.country = data.location.country;
            this.objWeather.temperature = data.current.temperature;
            this.objWeather.feelsLike = data.current.feelslike;
            this.objWeather.humidity = data.current.humidity;
            this.objWeather.windSpeed = data.current.wind_speed;

            if (!this.objWeather.historyList.includes(this.objWeather.name)) {
              this.objWeather.historyList.push(this.objWeather.name);
            }
          }

          // @ToDo show 3 times?!
          console.log(data);
        }
      );
  }

  ngOnInit() {
    // this.routePathParam = this.navigationEnds
    //   .pipe(
    //     map(() => this.activeRoute.root),
    //     map(root => root.firstChild),
    //     switchMap(firstChild => {
    //       if (firstChild && firstChild.firstChild) {
    //         const targetRoute = firstChild.firstChild;
    //         return targetRoute.paramMap.pipe(map(paramMap => paramMap.get('subRoutePathParam')));
    //       } else {
    //         return of(null);
    //       }
    //     })
    //   );


    // this.activeRoute.queryParams.subscribe(queryParams => {
    //   this.showConfig(this.searchType, queryParams.city);
    //   this.historyList.emit(this.objWeather.historyList);
    //   console.log('this.error', this.error);
    //   console.log('error', this.objWeather.name);
    // });

    this.router.events.subscribe(
      (event: RouterEvent) => {
        // show data after navigation ends
        if (event instanceof NavigationEnd) {
          this.activeRoute.queryParams.subscribe(queryParams => {
            this.showConfig(this.searchType, queryParams.city);
            this.historyList.emit(this.objWeather.historyList);
            console.log('emit');
          });
        }
      }
    );
  }
}
