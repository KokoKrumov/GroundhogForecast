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

  @Output() emitCityData = new EventEmitter();
  myControl = new FormControl();
  listCities: City[] = [];
  filteredOptions: Observable<City[]>;

  defaultWeatherType = 'celsius';
  resetCity = '';


  weatherTypes = [
    'celsius',
    'fahrenheit'
  ];


  ngOnInit() {
  }

  private _filter(value: string): City[] {
    const filterValue = value;

    return this.listCities.filter(option => option.city.toLowerCase().indexOf(filterValue) === 0);
  }

  searchForCity(city) {
    // this.listCities = [];
    this.places.getPlaces(city)
      .subscribe((data: any) => {
        data.predictions.map((item) => {
          this.listCities.push({city: item.terms[0].value, country: item.terms[1].value});
        });
      });
      this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
      );
    console.log(this.listCities);
  }

  submit(f) {
    this.router.navigate([''], {
      queryParams: {city: f.form.value.searchBox.city}
    });

    this.resetCity = '';
  }
}
