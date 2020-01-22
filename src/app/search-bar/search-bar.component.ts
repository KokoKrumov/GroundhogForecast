import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlacesService} from '../places.service';


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

  listCities = [];

  defaultWeatherType = 'celsius';
  resetCity = '';


  weatherTypes = [
    'celsius',
    'fahrenheit'
  ];


  ngOnInit() {
  }

  searchForCity(city) {
    // this.listCities = [];
    this.places.getPlaces(city)
      .subscribe((data: any) => {
        data.predictions.map((item) => {
          this.listCities.push(item.description);
        });
      });
    console.log(this.listCities);
  }

  submit(f) {
    this.router.navigate([''], {
      queryParams: {city: f.form.value.searchBox.city}
    });

    this.resetCity = '';
  }
}
