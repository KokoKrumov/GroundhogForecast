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

    @Input() objWeather: any;
    // @Output() historyList = new EventEmitter();

    // error = false;
    // days = 1;

    constructor(
        // public configService: ConfigService,
        // private activeRoute: ActivatedRoute,
        // private router: Router,
    ) {
    }

    // objWeather: ObjWeather = {
    //     weatherType: '',
    //     name: '',
    //     weatherIcon: '',
    //     region: '',
    //     country: '',
    //     temperature: undefined,
    //     description: '',
    //     feelsLike: undefined,
    //     humidity: undefined,
    //     windSpeed: undefined,
    //     days: []
    // };

    // showConfig(cityData, days) {
    //     this.configService.getConfig(cityData, days)
    //         .subscribe(
    //             (data: any) => {
    //                 if (!data) {
    //                     // @ToDo ма малки градове, които weather api-то не отчита
    //                     this.error = true;
    //                     console.log('not current day ', data);
    //                 } else {
    //                     this.error = false;
    //                     this.objWeather.name = data.city_name;
    //                     this.objWeather.weatherType = '';
    //                     this.objWeather.region = data.state_code;
    //                     this.objWeather.country = data.country_code;
    //                     this.objWeather.weatherIcon = data.data[0].weather.icon;
    //                     this.objWeather.description = data.data[0].weather.description;
    //                     this.objWeather.temperature = data.data[0].temp;
    //                     this.objWeather.feelsLike = data.data[0].app_max_temp;
    //                     this.objWeather.humidity = data.data[0].rh;
    //                     this.objWeather.windSpeed = data.data[0].wind_spd;
    //                 }
    //             }
    //         );
    // }

    ngOnInit() {
        // this.activeRoute.queryParams.subscribe(queryParams => {
        //     this.showConfig(queryParams.city, this.days);
        // });
        console.log('cur ', this.objWeather);
    }
}
