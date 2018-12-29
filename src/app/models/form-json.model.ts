import { QuestionsByType } from './questions-by-type.model';

export class FormJson {

  constructor (public id_poll: number, public id_event: number, public start_date: Date, public end_date: Date,
               public name: string, public description: string, public external_id: string, public type: string,
               public number_of_pages: number, public error_message_required: string, public error_message_max_size: string,
               public questions_by_types: QuestionsByType[]) {}
}
