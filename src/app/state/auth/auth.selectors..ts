import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './autht.reducers';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUsername = createSelector(
  selectAuthState,
  (state) => state.username
);

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state) => state.loggedIn
);
