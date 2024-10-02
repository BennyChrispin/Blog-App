import { User } from 'firebase/auth';

export interface AuthState {
  user: User | null;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  error: null,
};
