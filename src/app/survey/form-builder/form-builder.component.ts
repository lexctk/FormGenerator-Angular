import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { Observable, Subscription } from 'rxjs';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormJson } from '../models/form-json.model';
import { CanComponentDeactivate } from '../services/can-component-deactivate.service';
import { Router } from '@angular/router';
import { requiredCheckboxValidator } from '../../directives/required-validator.directive';
import { UserService } from '../../authentication/user.service';
import { User } from '../models/user.model';
import { Question } from '../models/question.model';
import { JsonFormatService } from '../services/json-format.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit, CanComponentDeactivate, OnDestroy {
  formJson: FormJson;
  generatorForm: FormGroup;
  formControlNames: string[] = [];
  changesSaved = false;

  userSubscription: Subscription;
  user: User;

  private fieldsControls = {};

  constructor(private router: Router,
              private apiService: ApiService,
              private userService: UserService,
              private jsonFormatService: JsonFormatService) {
  }

  ngOnInit() {
    this.getJson();
    this.user = this.userService.getUser();
    this.userSubscription = this.userService.userChanged.subscribe((user: User) => {
      this.user = user;
    });
  }

  getJson () {

  }

  private success(data: FormJson) {
    this.formJson = data;
    this.initForm();
  }

  private failed() {
    this.router.navigate(['/404']).then();
  }

  private initForm () {
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

      for (const a of this.user.activity) {
        if (questionByTypes.type_name === a.activity_type) {
          for (const activityID of a.activity_ids) {
            this.initQuestions (activityID, questionByTypes.questions);
          }
        }
      }
    }

    this.generatorForm = new FormGroup(this.fieldsControls);
  }

  private initQuestions(activityID: number, questions: Question[]) {

    for (const question of questions) {
      const formControlName = this.jsonFormatService.getFormControlName(
        this.formJson.id_poll,
        activityID,
        question.id_question,
        question.id_question_type);

      this.formControlNames.push(formControlName);

      if (question.id_answer_type !== 'CheckBoxList') {
        const validators = [];

        if (question.max_size > 0) {
          validators.push(Validators.maxLength(question.max_size));
        }

        if (question.mandatory) {
          validators.push(Validators.required);
        }
        this.fieldsControls[formControlName] = new FormControl(null, validators);
      } else {
        // question is a checkbox, use a custom validator and FormArray
        let answers = new FormArray([]);

        if (question.mandatory) {
          answers = new FormArray([], requiredCheckboxValidator(1));
        }

        for (const answer of question.answers) {
          if (answer) {
            answers.push(new FormControl(null));
          }
        }

        this.fieldsControls[formControlName] = answers;
      }
    }
  }

  onSubmit() {
    let valid = true;

    Object.keys(this.generatorForm.controls).forEach(field => {

      const control = this.generatorForm.get(field);
      if (!control.valid && !!document.getElementById(field)) {
        valid = false;
      }
      control.markAsTouched({ onlySelf: true });
    });

    if (valid) {
      this.changesSaved = true;

      // TODO post to API
      const data = this.jsonFormatService.getReplyFromForm(this.generatorForm.value);
      console.log(data);
      // this.apiService.postFormJson(data).subscribe();
    }
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.generatorForm && this.generatorForm.dirty && !this.changesSaved) {
      return confirm(this.formJson.poll_leave_message);
    } else {
      return true;
    }
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  isParticipant(typeName: string): boolean {
    return this.user.activity.map(activity => activity.activity_type).indexOf(typeName) > -1;
  }
}
