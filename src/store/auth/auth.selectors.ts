import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

// Select the auth feature
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// Select the user
export const selectAuthUser = createSelector(
  selectAuthState,
  (state) => state.user
);

// Select the error
export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);
