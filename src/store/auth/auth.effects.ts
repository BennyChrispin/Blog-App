import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../../src/app/core/auth.service';
import {
  register,
  registerSuccess,
  registerFailure,
  login,
  loginSuccess,
  loginFailure,
} from './auth.actions';
import { switchMap, catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);

  constructor(private authService: AuthService) {}

  // Effect to handle user registration
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      mergeMap(({ email, password }) =>
        this.authService.register(email, password).pipe(
          map((user) => registerSuccess({ user })),
          catchError((error) => of(registerFailure({ error: error.message })))
        )
      )
    )
  );

  // Effect to handle user login
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          map((user) => {
            console.log('Login Success Action Dispatched:', user);
            return loginSuccess({ user });
          }),
          catchError((error) => of(loginFailure({ error: error.message })))
        )
      )
    )
  );
}
