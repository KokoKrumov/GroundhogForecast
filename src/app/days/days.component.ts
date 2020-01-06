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
    @Output() historyList = new EventEmitter();

    error = false;
    searchType = 'forecast';
    forecastDays = 5;

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

    showConfig(searchType, cityData, forecastDays) {
        this.configService.getConfig(searchType, cityData, forecastDays)
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
                }
            );
    }

    ngOnInit() {
        this.submit();
    }

    submit() {
        this.activeRoute.queryParams.subscribe(queryParams => {
            this.showConfig(this.searchType, queryParams.city, this.forecastDays);
            this.historyList.emit(this.objWeather.historyList);
        });
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
