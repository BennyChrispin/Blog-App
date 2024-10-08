import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

// Select the auth feature
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// Select the user
export const selectAuthUser = createSelector(
  selectAuthState,
  (state) => state.user
);

// Selector Success
export const selectAuthSuccess = createSelector(
  selectAuthState,
  (state) => !!state.user && !state.error
);

// Select the error
export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);
