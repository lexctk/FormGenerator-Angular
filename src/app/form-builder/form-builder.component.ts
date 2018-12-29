import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Answer } from '../models/answer.model';
import { FormJson } from '../models/form-json.model';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
  formJson: FormJson;
  subscription: Subscription;

  generatorForm: FormGroup;

  questions: Question[] = [];
  formControlNames: string[] = [];

  errorMessageRequired = '';
  errorMessageMaxSize = '';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getJson();
  }

  getJson () {
    this.subscription = this.apiService.getFormJSON().subscribe(
      (data: FormJson) => this.success(data), (error) => this.failed(error)
    );
  }

  private success(data: FormJson) {
    this.formJson = data;
    this.initForm();
  }

  private failed(error) {
    console.error(error);
  }

  initForm () {
    const fieldsControls = {};

    if (!this.formJson.questions_by_types) {
      return;
    }
    this.errorMessageRequired = this.formJson.error_message_required;
    this.errorMessageMaxSize = this.formJson.error_message_max_size;

    for (const questionByTypes of this.formJson.questions_by_types) {
      if (!questionByTypes.questions) {
        break;
      }
      for (const question of questionByTypes.questions) {

        const formControlName = 'question' + question.id_question;

        this.questions.push(question);
        this.formControlNames.push(formControlName);

        if (question.answers) {
        }

        const validators = [];

        if (question.max_size > 0) {
          validators.push(Validators.maxLength(question.max_size));
        }

        if (question.mandatory) {
          validators.push(Validators.required);
        }

        fieldsControls[formControlName] = new FormControl(null, validators);
      }
    }

    this.generatorForm = new FormGroup(fieldsControls);
  }
}
