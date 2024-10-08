import { createReducer, on } from '@ngrx/store';
import {
  setUser,
  clearUser,
  registerFailure,
  loginFailure,
  registerSuccess,
  loginSuccess,
} from './auth.actions';
import { UserWithBookmarks } from './UserWithBookmarks';

export interface AuthState {
  user: UserWithBookmarks | null;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => ({ ...state, user, error: null })),
  on(clearUser, (state) => ({ ...state, user: null, error: null })),
  on(registerFailure, loginFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(registerSuccess, (state, { user }) => ({ ...state, user, error: null })),
  // When login is successful, update the user state
  on(loginSuccess, (state, { user }) => {
    console.log('Login Success in Reducer:', user);
    return { ...state, user, error: null };
  })
);
