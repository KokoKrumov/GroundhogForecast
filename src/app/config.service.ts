import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ConfigService {
    configUrl = 'https://api.weatherstack.com/';
    configKeyAccess = '8041007c47c49b56b72d5dc0c62c7279';

    constructor(private http: HttpClient) {
    }

    getConfig(searchType, city, forecastDays?) {
        return this.http.get<[]>(
            this.configUrl
            + searchType
            + '?access_key=' + this.configKeyAccess
            + '&query=' + city
            // + '&forecast_days=' + forecastDays
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
