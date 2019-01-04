export class Data {
  constructor(public id_user: number, public id_poll: number, public answer_data: AnswerData[]) {}
}

export class AnswerData {
  constructor(public id_activity: number, public id_question: number, public id_question_type: number, public answers: string[]) {}
}
