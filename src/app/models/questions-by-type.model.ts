import { Question } from './question.model';
import { Block } from './block.model';

export class QuestionsByType {

  constructor ( public type_name: string, public type_id: number, public questions: Question[], public blocks: Block[]) {}
}
