import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  apiURL = 'assets/form.json';

  private static handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('An error occurred:', error.error.message);
    } else {
      // Backend returned 404 or 500
      console.error(
        'Backend returned code ${error.status}, ' +
        'body was: ${error.error}');
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  getFormJSON() {
    return this.http.get<FormJSON>(this.apiURL)
      .pipe(catchError(ApiService.handleError));
  }
}

export interface Answer {
  answer_label: string;
  answer_value: string;
  type: string;
}

export interface Question {
  id_question: number;
  id_poll: number;
  label: string;
  description: string;
  order: number;
  max_size: number;
  nb_answer: number;
  mandatory: boolean;
  number: string;
  page_number: number;
  id_block: number;
  id_answer_type: string;
  id_question_type: any;
  id_question_dependency: number;
  question_dependency_answer: string;
  participant_type: string;
  answers: Answer[];
  type: string;
}

export interface Block {
  id_block: number;
  block_name: string;
  type: string;
}

export interface QuestionsByType {
  type_name: string;
  questions: Question[];
  blocks: Block[];
}

export interface FormJSON {
  id_poll: number;
  id_event: number;
  start_date: Date;
  end_date: Date;
  name: string;
  description: string;
  external_id: string;
  type: string;
  questions_by_types: QuestionsByType[];
}
