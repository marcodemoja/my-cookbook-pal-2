import { createReducer } from "@ngrx/store";

export interface AppState {
  userName: string;
}

export const initialState: AppState = {
  userName: 'Marco'
}

export const reducer = createReducer(
  initialState
);
