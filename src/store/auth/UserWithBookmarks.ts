import { User as FirebaseUser } from 'firebase/auth';

// Extend Firebase User to include bookmarks
export interface UserWithBookmarks extends FirebaseUser {
  bookmarks?: string[];
}
