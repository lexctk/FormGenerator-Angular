import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { Observable, Subscription } from 'rxjs';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormJson } from '../models/form-json.model';
import { CanComponentDeactivate } from '../services/can-component-deactivate.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { requiredCheckboxValidator } from '../directives/required-validator.directive';
import { UserService } from '../../authentication/user.service';
import { User } from '../models/user.model';
import { Question } from '../models/question.model';
import { JsonFormatService } from '../services/json-format.service';
import { FormJsonService } from '../services/form-json.service';
import { QuestionsByType } from '../models/questions-by-type.model';
import { Activity } from '../models/activity.model';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit, CanComponentDeactivate, OnDestroy {
  generatorForm: FormGroup;
  formControlNames: string[];
  changesSaved = false;

  numberOfPagesSubscription: Subscription;
  numberOfPages: number;

  formJsonSubscription: Subscription;
  formJson: FormJson;

  userSubscription: Subscription;
  user: User;

  currentPage: number;
  questionType: QuestionsByType;
  activity: Activity;

  buttonText: string;

  private fieldsControls;

  constructor(private router: Router,
              private apiService: ApiService,
              private userService: UserService,
              private jsonFormatService: JsonFormatService,
              private formJsonService: FormJsonService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.currentPage = +params['id'];

      this.user = this.userService.getUser();
      this.userSubscription = this.userService.userChanged.subscribe((user: User) => {
        this.user = user;
      });

      this.formJson = this.formJsonService.getFormJson();
      this.formJsonSubscription = this.formJsonService.formJsonChanged.subscribe( (formJson: FormJson) => {
        this.formJson = formJson;
      });

      this.numberOfPages = this.formJsonService.getNumberOfPages();
      this.numberOfPagesSubscription = this.formJsonService.numberOfPagesChanged.subscribe((numberOfPages: number) => {
        this.numberOfPages = numberOfPages;
      });

      if (this.currentPage < this.numberOfPages - 1) {
        this.buttonText = 'Next';
      } else {
        this.buttonText = 'Submit';
      }

      this.formControlNames = [];
      this.fieldsControls = {};

      this.initForm();
    });
  }

  private initForm () {
    if (!this.formJson.questions_by_types) {
      return;
    }

    let page = 0;

    for (const questionByTypes of this.formJson.questions_by_types) {
      if (questionByTypes.questions.length <= 0) {
        continue;
      }

      for (const a of this.user.activity) {
        if (questionByTypes.type !== a.activity_type) {
          continue;
        }

        if (page === this.currentPage) {
          this.questionType = questionByTypes;
          this.activity = a;

          if (questionByTypes.blocks && questionByTypes.blocks.length > 0) {
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

          for (const activityID of a.activity_ids) {
            this.initQuestions (activityID, questionByTypes.questions);
          }
        }
        page++;

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

      const data = this.jsonFormatService.getReplyFromForm(this.generatorForm.value);
      this.apiService.postFormJson(data).subscribe();

      console.log(data);

      if (this.currentPage < this.numberOfPages - 1) {
        this.currentPage++;
        this.router.navigate(['/survey/' + this.currentPage]).then();
      } else {
        this.router.navigate(['/thank-you']).then();
      }
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
    this.formJsonSubscription.unsubscribe();
    this.numberOfPagesSubscription.unsubscribe();
  }
}
