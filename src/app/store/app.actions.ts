import { createAction, props } from '@ngrx/store';
import { User, LoggedUser, SignIn} from '../core/models/user';
import { HttpErrorResponse } from '@angular/common/http';


export const appKey = '[App]';

export const signIn = createAction(
  `${appKey} SignIn`,
  props<{ user: SignIn }>()
);

export const signInSuccess = createAction(
  `${appKey} SignIn Success`,
  props<{ user: LoggedUser }>()
);

export const verifyToken = createAction(
  `${appKey} Verify Token`
);

export const verifyTokenSuccess = createAction(
  `${appKey} Verify Token Success`,
  props<{user: LoggedUser}>()
);

export const signUp = createAction(
  `${appKey} SignUp`,
  props<{user: User}>()
);

export const signOut = createAction(
  `${appKey} SignOut`
);

export const apiError = createAction(
  `${appKey} Api Error`,
  props<{ error: HttpErrorResponse }>()
);


