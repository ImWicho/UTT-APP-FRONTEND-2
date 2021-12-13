import { createAction, props } from '@ngrx/store';
import { IUser } from 'app/main/interfaces/i-user';

export const saveUser = createAction('[SAVE USER] saveUser',
  props<{user: IUser}>());

export const removeUser = createAction('[REMOVE USER] removeUser');
