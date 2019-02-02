import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../survey/models/user.model';
import { Data } from '../survey/models/data.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  apiURL = 'https://ecsurvey2019app.azurewebsites.net/api/polldev/';
  postURL = 'https://ecsurvey2019app.azurewebsites.net/api/angularapp';

  userApiURL = 'assets/user.json';

  private static handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = 'Client-side or network error occurred: ' + error.error.message;
    } else {
      errorMessage = 'Backend returned code ' + error.status + '. ' + error.message;
    }
    // return an observable with a user-facing error message
    return throwError(errorMessage);
  }

  getFormJson(id_event: number, position_type_participant: number) {
    return this.http.get(this.apiURL + id_event + '/' + position_type_participant, {responseType: 'text'})
      .pipe(
        catchError(ApiService.handleError)
      );
  }

  postFormJson(data: Data) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    let stringData = JSON.stringify(data);
    stringData = '=' + stringData;
    console.log(stringData);
    return this.http.post(this.postURL, stringData, {headers, responseType: 'text'})
      .pipe(
        catchError(ApiService.handleError)
      );
  }

  getUserJson() {
    return this.http.get<User>(this.userApiURL)
      .pipe(
        catchError(ApiService.handleError)
      );
  }
}
