import { Component, OnInit } from '@angular/core';
import { ApiService, FormJSON } from '../api/api.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
  formJSON: FormJSON;
  subscription: Subscription;

  generatorForm: FormGroup;

  questionsDescription: string[] = [];
  questionsLabel: string[] = [];
  questionsType: string[] = [];
  questionsNumber: string[] = [];
  formControlNames: string[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getJson();
  }

  getJson () {
    this.subscription = this.apiService.getFormJSON().subscribe(
      (data: FormJSON) => this.success(data), (error) => this.failed(error)
    );
  }

  private success(data: FormJSON) {
    this.formJSON = data;
    this.initForm();
  }

  private failed(error) {
    console.error(error);
  }

  initForm () {
    const fieldsControls = {};

    if (!this.formJSON.questions_by_types) {
      return;
    }

    for (const questionByTypes of this.formJSON.questions_by_types) {
      if (!questionByTypes.questions) {
        break;
      }
      for (const question of questionByTypes.questions) {

        const formControlName = 'question' + question.id_question;

        this.questionsDescription.push(question.description);
        this.questionsLabel.push(question.label);
        this.questionsType.push(question.id_answer_type);
        this.questionsNumber.push(question.number);
        this.formControlNames.push(formControlName);

        if (question.mandatory) {
          fieldsControls[formControlName] = new FormControl(null, Validators.required);
        } else {
          fieldsControls[formControlName] = new FormControl(null);
        }
      }
    }

    this.generatorForm = new FormGroup(fieldsControls);
  }
}
