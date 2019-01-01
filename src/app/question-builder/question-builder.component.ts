import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../models/question.model';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormJson } from '../models/form-json.model';

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

  k: number;

  constructor() { }

  ngOnInit() {
    this.k = this.formControlNames.indexOf('question' + this.question.id_question);
  }
}
