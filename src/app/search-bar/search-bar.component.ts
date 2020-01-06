import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
    selector: 'search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router) {
    }

    @Output() emitCityData = new EventEmitter();

    // error: any;

    defaultWeatherType = 'celsius';
    resetCity = '';


    weatherTypes = [
        'celsius',
        'fahrenheit'
    ];


    ngOnInit() {
    }

    submit(f) {
        this.router.navigate([''], {
            queryParams: {city: f.form.value.searchBox.city}
        });

        this.resetCity = '';
    }
}
