import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginSuccess, logout } from './auth.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(({ username }) => {
          console.log('Effect: saving authState to localStorage');
          const stateToStore = {
            username,
            loggedIn: true,
          };
          localStorage.setItem('authState', JSON.stringify(stateToStore));
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          console.log('Effect: removing authState from localStorage');
          localStorage.removeItem('authState');
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}
}
