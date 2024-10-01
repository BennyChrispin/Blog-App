import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../../src/app/core/auth.service';
import { setUser, clearUser, register, login } from './auth.actions';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  // Effect to handle user registration
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      switchMap((action) => {
        return this.authService
          .register(action.email, action.password, action.name, action.username)
          .pipe(
            switchMap((user) => {
              return of(setUser({ user }));
            }),
            catchError((error) => {
              console.error('Registration error', error);
              return of(clearUser());
            })
          );
      })
    )
  );

  // Effect to handle user login
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          switchMap((user) => {
            return of(setUser({ user }));
          }),
          catchError((error) => {
            console.error('Login error', error);
            return of(clearUser());
          })
        );
      })
    )
  );
}
