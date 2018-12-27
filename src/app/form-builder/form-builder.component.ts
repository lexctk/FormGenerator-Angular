import { Component, OnInit } from '@angular/core';
import { ApiService, FormJSON } from './api.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
  formJSON: FormJSON;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getFormJSON().subscribe(
      (data: FormJSON) => this.formJSON = { ...data }
    );
  }
}
