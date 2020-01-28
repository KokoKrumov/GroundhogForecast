import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ConfigService} from '../config.service';
import {LocalStorageService} from '../local-storage.service';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {Days} from '../interfaces/days';

@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.scss']
})
export class DaysComponent implements OnInit {

  // @Input() weatherDataFromTabs: any;
  // @Output() historyList = new EventEmitter();

  error = false;
  // searchType = 'forecast';
  days = 5;

  constructor(
    public configService: ConfigService,
    private activeRoute: ActivatedRoute,
    private localStorage: LocalStorageService,
    private router: Router,
  ) {
  }

  objWeatherDay: Days[] = [{
    weatherType: '',
    max_temp: undefined,
    min_temp: undefined,
    weatherIcon: '',
    weatherDescription: '',
    humidity: undefined,
    windSpeed: undefined,
  }];

  showConfig(cityData, country, days) {
    this.configService.getConfig(cityData, country, days)
      .subscribe(
        (data: any) => {
          if (!data) {
            console.log('not days: ', data);
            this.error = true;
          } else {
            data.data.map(x => {
              this.objWeatherDay.push(
                {
                  humidity: x.rh,
                  min_temp: x.min_temp,
                  weatherIcon: x.weather.icon,
                  weatherDescription: x.weather.description,
                  weatherType: '',
                  windSpeed: x.wind_spd,
                  max_temp: x.max_temp
                }
              );
            });
            this.error = false;
          }
        }
      );
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(queryParams => {
      this.showConfig(queryParams.city, queryParams.country, this.days);
    });
  }

  submit() {
    // this.activeRoute.queryParams.subscribe(queryParams => {
    //   this.showConfig(this.searchType, queryParams.city, this.forecastDays);
    //   this.historyList.emit(this.objWeather.historyList);
    // });
    // console.log('click')
    // this.router.events.subscribe(
    //     (event: RouterEvent) => {
    //         // show data after navigation ends
    //         if (event instanceof NavigationEnd) {
    //             this.activeRoute.queryParams.subscribe(queryParams => {
    //                 this.showConfig(this.searchType, queryParams.city, this.forecastDays);
    //                 this.historyList.emit(this.objWeather.historyList);
    //             });
    //         }
    //     }
    // );
  }
}
