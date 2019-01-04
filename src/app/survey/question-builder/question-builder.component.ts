import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../models/question.model';
import { FormGroup } from '@angular/forms';
import { FormJson } from '../models/form-json.model';
import { JsonFormatService } from '../services/json-format.service';
import { Answer } from '../models/answer.model';

@Component({
  selector: 'app-question-builder',
  templateUrl: './question-builder.component.html',
  styleUrls: ['./question-builder.component.css']
})
export class QuestionBuilderComponent implements OnInit {
  @Input() question: Question;
  @Input() formControlNames: string[];
  @Input() generatorForm: FormGroup;
  @Input() formJson: FormJson;
  @Input() activityID: number;

  k: number;

  constructor(private jsonFormatService: JsonFormatService) { }

  ngOnInit() {
    const formControlName = this.jsonFormatService.getFormControlName(
      this.formJson.id_poll,
      this.activityID,
      this.question.id_question,
      this.question.id_question_type
    );
    this.k = this.formControlNames.indexOf(formControlName);
  }

  onChange(formControlName: string, answers: Answer[]) {
    const values = [];
    const arr = this.generatorForm.value[formControlName];

    answers.forEach((answer, i) => {
      if (arr[i]) {
        values.push(answer.answer_value);
      } else {
        values.push(null);
      }
    });
    this.generatorForm.controls[formControlName].setValue(values);
  }
}
