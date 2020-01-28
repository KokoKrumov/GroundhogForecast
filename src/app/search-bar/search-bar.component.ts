import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlacesService} from '../places.service';
import {City} from '../interfaces/city';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';


@Component({
    selector: 'search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

    constructor(
        private places: PlacesService,
        private route: ActivatedRoute,
        private router: Router) {
    }

    @Output() historyList = new EventEmitter();
    myControl = new FormControl();
    listCities: string[] = [];
    filteredOptions: Observable<String[]>;

    defaultWeatherType = 'celsius';
    resetCity = '';


    weatherTypes = [
        'celsius',
        'fahrenheit'
    ];


    ngOnInit() {
        console.log(this.defaultWeatherType);
    }

    private _filter(value: string): string[] {
        const filterValue = value;

        return this.listCities.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    }

    searchForCity(city) {

        this.places.getPlaces(city)
            .subscribe((data: any) => {
                this.listCities = [];
                if (data) {
                    data.suggestions.map((item) => {
                        this.listCities.push(item);
                    });
                }
            });
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
    }

    setWeatherType(e) {
        this.defaultWeatherType = e;
    }

    submit(f) {
        this.router.navigate([''], {
            queryParams: {city: f.form.value.searchBox.city}
        });
        this.resetCity = '';


        this.historyList.emit(f.form.value.searchBox.city);
    }
}
