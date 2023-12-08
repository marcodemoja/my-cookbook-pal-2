import { createFeature, createReducer, on } from "@ngrx/store";
import { LoggedUser } from "../core/models/user";
import * as appActions from './app.actions';

export interface AppState {
  user: LoggedUser|null;
}

export const initialState: AppState = {
  user: null
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



