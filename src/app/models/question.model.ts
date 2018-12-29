import { Answer } from './answer.model';

export class Question {

  constructor (public id_question: number, public id_poll: number, public label: string, public description: string,
               public order: number, public max_size: number, public nb_answer: number, public mandatory: boolean,
               public number: string, public page_number: number, public id_block: number, public id_answer_type: string,
               public id_question_type: string, public id_question_dependency: number, public question_dependency_answer: string,
               public participant_type: string, public answers: Answer[], public type_name: string) { }
}
