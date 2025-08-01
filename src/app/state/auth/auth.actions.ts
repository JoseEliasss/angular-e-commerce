import { createAction, props } from '@ngrx/store';

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ username: string }>()
);

export const logout = createAction('[Auth] Logout');
