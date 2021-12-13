import { ActionReducerMap } from '@ngrx/store';
import * as app from '@redux/app.reducers';


export interface AppState {
   ui: app.State;
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: app.appReducer,
};
