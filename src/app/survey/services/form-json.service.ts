import { Injectable } from '@angular/core';
import { FormJson } from '../models/form-json.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormJsonService {
  private formJson: FormJson = null;
  private numberOfPages = 0;

  formJsonChanged = new Subject<FormJson>();
  numberOfPagesChanged = new Subject<number>();

  constructor() { }

  getFormJson(): FormJson {
    return this.formJson;
  }

  setFormJson(value: FormJson) {
    this.formJson = value;
    this.formJsonChanged.next(this.formJson);
  }

  getNumberOfPages(): number {
    return this.numberOfPages;
  }

  setNumberOfPages(value: number) {
    this.numberOfPages = value;
    this.numberOfPagesChanged.next(this.numberOfPages);
  }
}
