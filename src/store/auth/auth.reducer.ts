import { createReducer, on } from '@ngrx/store';
import {
  setUser,
  clearUser,
  registerFailure,
  loginFailure,
  registerSuccess,
} from './auth.actions';
import { User } from 'firebase/auth';

export interface AuthState {
  user: User | null;
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
  on(registerSuccess, (state, { user }) => ({ ...state, user, error: null }))
);
