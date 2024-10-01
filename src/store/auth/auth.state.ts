import { User } from 'firebase/auth';

// Define the AuthState interface
export interface AuthState {
  user: User;
  loading: boolean;
  error: string | null;
}

// Initialize the initialState
export const initialState: AuthState = {
  user: {} as User,
  loading: false,
  error: null,
};
