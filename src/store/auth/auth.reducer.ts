import { createReducer, on } from '@ngrx/store';
import { initialState } from './auth.state';
import { setUser, clearUser } from './auth.actions';
import { User } from 'firebase/auth';

// Create the reducer
export const authReducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => ({ ...state, user })),
  on(clearUser, (state) => ({ ...state, user: {} as User }))
);
