import { createAction, props } from '@ngrx/store';
import { User } from 'firebase/auth';

// Set the user after login or register
export const setUser = createAction('[Auth] Set User', props<{ user: User }>());

// Clear the user (logout)
export const clearUser = createAction('[Auth] Clear User');

// Registration actions
export const register = createAction(
  '[Auth] Register',
  props<{ email: string; password: string }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ user: User }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

// Login actions
export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);
