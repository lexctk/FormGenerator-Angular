import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../models/question.model';
import { FormGroup } from '@angular/forms';
import { FormJson } from '../models/form-json.model';

@Component({
  selector: 'app-question-builder',
  templateUrl: './question-builder.component.html',
  styleUrls: ['./question-builder.component.css']
})
export class QuestionBuilderComponent implements OnInit {
  @Input() question: Question;
  @Input() k: number;
  @Input() formControlNames: string[];
  @Input() generatorForm: FormGroup;
  @Input() formJson: FormJson;

  constructor() { }

  ngOnInit() {
  }

}
