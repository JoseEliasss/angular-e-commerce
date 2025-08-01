import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from './auth.actions';

export interface AuthState {
  username: string | null;
  loggedIn: boolean;
}

// Load from localStorage (same as cart)
const savedState = localStorage.getItem('authState');
export const initialAuthState: AuthState = savedState
  ? JSON.parse(savedState)
  : { username: null, loggedIn: false };

// Save helper
function saveToLocalStorage(state: AuthState): AuthState {
  localStorage.setItem('authState', JSON.stringify(state));
  return state;
}

export const authReducer = createReducer(
  initialAuthState,

  // On login: update store + save
  on(loginSuccess, (state, { username }) =>
    saveToLocalStorage({ ...state, username, loggedIn: true })
  ),

  // On logout: clear localStorage
  on(logout, () => {
    localStorage.removeItem('authState');
    return { username: null, loggedIn: false };
  })
);
