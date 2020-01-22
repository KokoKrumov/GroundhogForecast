import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  // configUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Vict&types=(cities)&key=YOUR_API_KEY';
  // configKeyAccess = 'AIzaSyCIzwBOAAmCP5apZzSUYZqvwF7I6zS4gGg';
  configUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=';
  configKeyAccess = 'AIzaSyBcDN4xUDTaEzz3wo5uretcWTc0IZ13mSA';

  constructor(private http: HttpClient) {
  }

  getPlaces(city) {
    return this.http.get<[]>(
      this.configUrl
      + city
      + 'language=en'
      + '&key=' + this.configKeyAccess
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.message}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
