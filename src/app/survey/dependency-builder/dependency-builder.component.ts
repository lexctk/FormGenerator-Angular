import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../models/question.model';
import { FormGroup } from '@angular/forms';
import { FormJson } from '../models/form-json.model';
import { JsonFormatService } from '../services/json-format.service';

@Component({
  selector: 'app-dependency-builder',
  templateUrl: './dependency-builder.component.html',
  styleUrls: ['./dependency-builder.component.css']
})
export class DependencyBuilderComponent implements OnInit {
  @Input() question: Question;
  @Input() formControlNames: string[];
  @Input() generatorForm: FormGroup;
  @Input() formJson: FormJson;
  @Input() activityID: number;

  constructor(private jsonFormatService: JsonFormatService) { }

  ngOnInit() {
  }

  showChild() {
    const formControlName = this.jsonFormatService.getFormControlName(
      this.formJson.id_poll,
      this.activityID,
      this.question.id_question_dependency,
      this.question.id_question_type
    );
    const formAnswers = this.generatorForm.value[formControlName];

    if (!formAnswers) {
      return false;
    }

    if (formAnswers instanceof Array) {
      return (formAnswers.indexOf(this.question.question_dependency_answer) > -1);
    } else {
      return (formAnswers === this.question.question_dependency_answer);
    }
  }
}
