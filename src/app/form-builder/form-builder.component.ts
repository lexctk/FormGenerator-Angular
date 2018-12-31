import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable, Subscription } from 'rxjs';
import { FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FormJson } from '../models/form-json.model';
import { Question } from '../models/question.model';
import { Block } from '../models/block.model';
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

  questions: Question[] = [];
  blocks: Block[] = [];
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
      (data: FormJson) => this.success(data), (error) => this.failed(error)
    );
  }

  private success(data: FormJson) {
    this.formJson = data;
    this.initForm();
  }

  private failed(error) {
    this.router.navigate(['/404']);
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
      // each type is a block!
      this.blocks.push(new Block(-1, questionByTypes.type_name, questionByTypes.type_name));

      if (questionByTypes.blocks) {
        for (const block of questionByTypes.blocks) {
          this.blocks.push(block);
        }
      }

      for (const question of questionByTypes.questions) {

        const formControlName = 'question' + question.id_question;

        this.questions.push(question);
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
          let answers;

          if (question.mandatory) {
            answers = new FormArray([], requiredCheckboxValidator(1));
          } else {
            answers = new FormArray([]);
          }

          for (const answer of question.answers) {
            answers.push(new FormControl(null));
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
      // this.apiService.postFormJSON(this.generatorForm.value).subscribe();
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
