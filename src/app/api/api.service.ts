import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  apiURL = 'assets/form.json';

  // TODO: define POST url
  postURL = 'postURL';

  userApiURL = 'assets/user.json';

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
    return this.http.get<FormJson>(this.apiURL)
      .pipe(catchError(ApiService.handleError));
  }

  postFormJson(data: Data) {
    return this.http.post<Data>(this.postURL, data)
      .pipe(catchError(ApiService.handleError));
  }

  getUserJson () {
    return this.http.get<User>(this.userApiURL)
      .pipe(catchError(ApiService.handleError));
  }
}
