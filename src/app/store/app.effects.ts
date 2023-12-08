import { inject } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { AuthenticationService } from "../core/services/authentication.service";
import * as appActions from './app.actions';
import { catchError, exhaustMap, map, of, switchMap, tap } from "rxjs";
import { LoggedUser } from "../core/models/user";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

export const signIn$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router), authSvc = inject(AuthenticationService)) => {
    return actions$.pipe(
      ofType(appActions.signIn),
      exhaustMap((action) => authSvc.signIn(action.user).pipe(
        map((res) => appActions.signInSuccess({user: res.body?.user!})),
        catchError((err: HttpErrorResponse) => {
          return [appActions.apiError(err)]
        })
      ))
    )
  }, { functional: true }
);

export const verifyToken$ = createEffect(
  (actions$ = inject(Actions), authSvc = inject(AuthenticationService)) => {
    return actions$.pipe(
    ofType(appActions.verifyToken),
    switchMap(() => authSvc.verifySessionStorageToken().pipe(
      map((user) => appActions.verifyTokenSuccess({user: user!}))
    )),
    catchError((err) => {
      return [appActions.apiError];
    })
    )
  }, { functional: true}
)

export const signOut$ = createEffect(
  (actions$ = inject(Actions), authSvc = inject(AuthenticationService)) => {
    return actions$.pipe(
      ofType(appActions.signOut),
      tap(() => authSvc.signOut())
    )
  }, { functional: true, dispatch: false}
)


