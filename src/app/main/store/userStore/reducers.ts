/* eslint-disable no-underscore-dangle */
import { Action, createReducer, on } from '@ngrx/store';
import { AppState } from '@redux/init.reducer';
import { IUser } from 'app/main/interfaces/i-user';
import { removeUser, saveUser } from './actions';

export interface State {
    user: IUser | null;
}

export interface AppStateWithUser extends AppState{
    user: State;
}

export const initialState: State = {
   user: null,
};

const _userReducerReducer = createReducer(initialState,
    on(saveUser, (state, { user }) => ({ ...state, user })),
    on(removeUser, (state) => ({...state, user : null}))
);

export const userReducerReducer = (state: any, action: Action) => _userReducerReducer(state, action);
