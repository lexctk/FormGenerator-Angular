import { Injectable } from '@angular/core';
import { AnswerData, Data } from '../models/data.model';
import { UserService } from '../../authentication/user.service';

@Injectable({
  providedIn: 'root'
})
export class JsonFormatService {

  constructor(private userService: UserService) { }

  private pollString = 'pid-';
  private activityString = '-aid-';
  private questionString = '-qid-';
  private questionTypeString = '-tid-';

  getFormControlName (pollID: number, activityID: number, questionID: number, questionTypeID: number): string {
    return (this.pollString + pollID
      + this.activityString + activityID
      + this.questionString + questionID
      + this.questionTypeString + questionTypeID);
  }

  getReplyFromForm (values: Object): Data {
    const answer = [];
    let pid: number;

    Object.keys(values).forEach(field => {
      const answers = values[field];
      let answer_data = [];

      if (answers instanceof Array) {
        answer_data = answers;
      } else {
        answer_data.push(<string> answers);
      }

      const ids = field.split('-');
      pid = Number(ids[1]);

      answer.push(new AnswerData (Number(ids[3]), Number(ids[5]), Number(ids[7]), answer_data));
    });

    return new Data(this.userService.getUser().user_id, pid, answer);
  }
}
