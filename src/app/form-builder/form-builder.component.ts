import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable, Subscription } from 'rxjs';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormJson } from '../models/form-json.model';
import { CanComponentDeactivate } from '../services/can-component-deactivate.service';
import { Router } from '@angular/router';
import { requiredCheckboxValidator } from '../directives/required-validator.directive';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit, CanComponentDeactivate {
  formJson: FormJson;
  subscription: Subscription;
  generatorForm: FormGroup;
  formControlNames: string[] = [];
  changesSaved = false;

  constructor(private router: Router,
              private apiService: ApiService) {
  }

  ngOnInit() {
    this.getJson();
  }

  getJson () {
    this.subscription = this.apiService.getFormJSON().subscribe(
      (data: FormJson) => this.success(data), () => this.failed()
    );
  }

  private success(data: FormJson) {
    this.formJson = data;
    this.initForm();
  }

  private failed() {
    // TODO: review 404 page
    this.router.navigate(['/404']).then();
  }

  initForm () {
    const fieldsControls = {};

    if (!this.formJson.questions_by_types) {
      return;
    }

    for (const questionByTypes of this.formJson.questions_by_types) {
      if (!questionByTypes.questions) {
        break;
      }

      if (questionByTypes.blocks) {
        for (const block of questionByTypes.blocks) {
          block.index_start = -1;
          block.index_end = -1;

          questionByTypes.questions.forEach((question, index) => {
            if (question.id_block === block.id_block) {
              if (block.index_start === -1) {
                block.index_start = index;
              }
              block.index_end = index;
            }
          });
        }
      }

      for (const question of questionByTypes.questions) {

        const formControlName = 'question' + question.id_question;

        this.formControlNames.push(formControlName);

        if (question.id_answer_type !== 'CheckBoxList') {
          const validators = [];

          if (question.max_size > 0) {
            validators.push(Validators.maxLength(question.max_size));
          }

          if (question.mandatory) {
            validators.push(Validators.required);
          }
          fieldsControls[formControlName] = new FormControl(null, validators);
        } else {
          // question is a checkbox, use a custom validator and FormArray
          let answers = new FormArray([]);

          if (question.mandatory) {
            answers = new FormArray([], requiredCheckboxValidator(1));
          }

          for (const answer of question.answers) {
            if (answer) {
              answers.push(new FormControl(false));
            }
          }

          fieldsControls[formControlName] = answers;
        }
      }
    }

    this.generatorForm = new FormGroup(fieldsControls);
  }

  onSubmit() {
    if (this.generatorForm.valid) {
      this.changesSaved = true;
      console.log(this.generatorForm.value);

      // TODO post to API
      this.apiService.postFormJSON(this.generatorForm.value).subscribe();
    } else {
      // validate all form fields
      Object.keys(this.generatorForm.controls).forEach(field => {
        const control = this.generatorForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.generatorForm && this.generatorForm.dirty && !this.changesSaved) {
      return confirm(this.formJson.poll_leave_message);
    } else {
      return true;
    }
  }
}
