import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ConfigService {
    // configUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=API_KEY';
    configUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
    configKeyAccess = '9d272f49baa54cb18637c2a64ca23340';

    constructor(private http: HttpClient) {
    }

    getConfig(city: string, country: string, days: number) {
        return this.http.get<[]>(
            this.configUrl
            + '?city=' + city
            + ',' + country
            + '&days=' + days
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
