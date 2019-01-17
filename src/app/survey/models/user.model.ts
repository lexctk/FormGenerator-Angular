import { Activity } from './activity.model';

export class User {
  constructor(public user_id: number, public username: string, public id_event: number, public position_type_participant: number,
              public activity: Activity[]) {}
}
