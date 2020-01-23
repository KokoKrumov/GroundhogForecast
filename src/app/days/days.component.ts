import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ConfigService} from '../config.service';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {ObjWeather} from '../interfaces/obj-weather';

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

  showConfig(cityData, country, days) {
    // this.configService.getConfig(cityData, country, days)
    //   .subscribe(
    //
    //     (data: any) => {
    //       if (data.success === false) {
    //         this.objWeather.name = data.error.info;
    //         this.error = true;
    //       } else {
    //         this.error = false;
    //         this.objWeather.name = data.location.name;
    //       }
    //     }
    //   );
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
