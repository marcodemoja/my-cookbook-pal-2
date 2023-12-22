import { createFeature, createReducer, on } from "@ngrx/store";
import { LoggedUser } from "../core/interfaces/user";
import * as appActions from './app.actions';

export interface AppState {
  user: LoggedUser|null;
  showSpinner: boolean;
}

export const initialState: AppState = {
  user: null,
  showSpinner: false
}

export const reducer = createReducer(
  initialState,
  on(appActions.signInSuccess, (state: AppState, {user}) => ({...state, user})),
  on(appActions.verifyTokenSuccess, (state: AppState, {user}) => ({...state, user})),
  on(appActions.signOut, (state: AppState) => ({...state, user: null}))

);

export const appState = createFeature({
  name: 'app',
  reducer
})



