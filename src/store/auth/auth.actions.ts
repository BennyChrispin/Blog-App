import { createAction, props } from '@ngrx/store';
import { User } from 'firebase/auth';

// Action for setting the user
export const setUser = createAction('[Auth] Set User', props<{ user: User }>());

// Action for clearing the user (logout or error)
export const clearUser = createAction('[Auth] Clear User');

// Action for registering a new user
export const register = createAction(
  '[Auth] Register',
  props<{
    email: string;
    password: string;
    name: string;
    username: string;
  }>()
);

// Action for logging in a user
export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);
