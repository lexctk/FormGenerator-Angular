import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../models/question.model';
import { FormGroup } from '@angular/forms';
import { FormJson } from '../models/form-json.model';

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

  constructor() { }

  ngOnInit() {
  }

  showChild() {
    const formAnswers = this.generatorForm.value['question' + this.question.id_question_dependency];

    if (!formAnswers) {
      return false;
    }

    if (formAnswers instanceof Array) {

      let answerIndex;

      for (const questionsByType of this.formJson.questions_by_types) {
        let found = false;
        for (const question of questionsByType.questions) {
          if (question.id_question === this.question.id_question_dependency) {
            question.answers.forEach((answer, index) => {
              if (answer.answer_value === this.question.question_dependency_answer) {
                answerIndex = index;
              }
            });
            found = true;
            break;
          }
        }
        if (found) {
          break;
        }
      }

      return formAnswers[answerIndex];

    } else {
      return (formAnswers === this.question.question_dependency_answer);
    }
  }
}
