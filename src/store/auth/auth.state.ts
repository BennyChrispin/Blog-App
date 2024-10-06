import { UserWithBookmarks } from './UserWithBookmarks';

export interface AuthState {
  user: UserWithBookmarks | null;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  error: null,
};
