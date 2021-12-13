/* eslint-disable no-underscore-dangle */
import { Action, createReducer, on } from '@ngrx/store';
import { isResponsive, isLoading, stopLoading } from '@redux/app.actions';


export interface State {
    isResponsive: boolean;
    isLoading: boolean;
}

export const initialState: State = {
   isResponsive: false,
   isLoading: false
};

const _appReducer = createReducer(
  initialState,
  on(isResponsive, (state, { flag }) => ({...state, isResponsive: flag})),
  on(isLoading, (state) => ({...state, isLoading: true})),
  on(stopLoading, (state) => ({...state, isLoading: false})),

);

export const appReducer = (state: any, action: Action) => _appReducer(state, action);
