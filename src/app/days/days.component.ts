import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfigService} from '../config.service';
import {LocalStorageService} from '../local-storage.service';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from '@angular/router';
import {Days} from '../interfaces/days';
import {ObjWeather} from '../interfaces/obj-weather';

@Component({
    selector: 'app-days',
    templateUrl: './days.component.html',
    styleUrls: ['./days.component.scss']
})
export class DaysComponent implements OnInit {

    @Input() numberOfDays: number;
    @Output() objWeathercurrent: EventEmitter<any> = new EventEmitter();

    error = false;
    // searchType = 'forecast';
    days = this.numberOfDays;

  constructor(
    public configService: ConfigService,
    private activeRoute: ActivatedRoute,
    private localStorage: LocalStorageService,
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
        days: []
    };

    showConfig(cityData, days) {
        this.objWeather.days = [];
        this.configService.getConfig(cityData, days)
            .subscribe(
                (data: any) => {
                    if (!data) {
                        console.log('not days: ', data);
                        this.error = true;
                    } else {
                        this.objWeather.name = data.city_name;
                        this.objWeather.weatherType = '';
                        this.objWeather.region = data.state_code;
                        this.objWeather.country = data.country_code;

                        data.data.map(x => {
                            this.objWeather.days.push(
                                {
                                    temperature: x.temp,
                                    humidity: x.rh,
                                    min_temp: x.min_temp,
                                    weatherIcon: x.weather.icon,
                                    weatherDescription: x.weather.description,
                                    weatherType: '',
                                    windSpeed: x.wind_spd,
                                    max_temp: x.max_temp,
                                    datetime: x.datetime
                                }
                            );
                        });
                        this.error = false;
                        this.objWeathercurrent.emit(this.objWeather);
                        console.log('emit ', this.objWeathercurrent);
                    }
                }
            );
    }

    ngOnInit() {
        this.activeRoute.queryParams.subscribe(queryParams => {
            this.showConfig(queryParams.city, this.numberOfDays);
        });
    }
}
