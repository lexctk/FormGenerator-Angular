import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FormJson } from '../survey/models/form-json.model';
import { User } from '../survey/models/user.model';
import { Data } from '../survey/models/data.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  apiURL = 'https://ecsurvey2019app.azurewebsites.net/api/polldev/35';

  postURL = 'https://ecsurvey2019app.azurewebsites.net/api/angularapp';

  userApiURL = 'assets/user.json';

  // TODO: change error for response: text
  private static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side or network error occurred:', error.error.message);
    } else {
      console.error('Backend returned code ${error.status}, ' + 'body was: ${error.error}');
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  getFormJson() {
    return this.http.get(this.apiURL, {responseType: 'text'})
      .pipe(catchError(ApiService.handleError));
  }

  postFormJson(data: Data) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    let stringData = JSON.stringify(data);
    stringData = '=' + stringData;
    console.log(stringData);
    return this.http.post(this.postURL, stringData, { headers, responseType: 'text'})
      .pipe(catchError(ApiService.handleError));
  }

  getUserJson () {
    return this.http.get<User>(this.userApiURL)
      .pipe(catchError(ApiService.handleError));
  }
}
