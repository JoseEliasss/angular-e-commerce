import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from './auth.actions';

export interface AuthState {
  username: string | null;
  loggedIn: boolean;
}

const savedState = localStorage.getItem('authState');
export const initialAuthState: AuthState = savedState
  ? JSON.parse(savedState)
  : { username: null, loggedIn: false };

function saveToLocalStorage(state: AuthState): AuthState {
  localStorage.setItem('authState', JSON.stringify(state));
  return state;
}

export const authReducer = createReducer(
  initialAuthState,

  on(loginSuccess, (state, { username }) =>
    saveToLocalStorage({ ...state, username, loggedIn: true })
  ),

  on(logout, () => {
    localStorage.removeItem('authState');
    return { username: null, loggedIn: false };
  })
);
