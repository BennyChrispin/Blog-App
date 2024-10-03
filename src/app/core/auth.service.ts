import { Injectable, Inject } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  UserCredential,
} from '@angular/fire/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import {
  from,
  Observable,
  map,
  catchError,
  throwError,
  BehaviorSubject,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(@Inject(Auth) private auth: Auth) {
    // Listen for authentication state changes
    this.auth.onAuthStateChanged((user) => {
      this.currentUserSubject.next(user);
    });
  }

  register(email: string, password: string): Observable<User> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      map((userCredential: UserCredential) => {
        this.currentUserSubject.next(userCredential.user);
        return userCredential.user;
      }),
      catchError((error) => {
        if (error.code === 'auth/email-already-in-use') {
          return throwError(() => new Error('This email is already in use.'));
        }
        return throwError(() => new Error('Failed to create user account.'));
      })
    );
  }

  login(email: string, password: string): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      map((userCredential: UserCredential) => {
        this.currentUserSubject.next(userCredential.user);
        return userCredential.user;
      }),
      catchError(() =>
        throwError(() => new Error('Invalid email or password.'))
      )
    );
  }

  loginWithGoogle(): Observable<User> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider)).pipe(
      map((userCredential: UserCredential) => {
        this.currentUserSubject.next(userCredential.user);
        return userCredential.user;
      }),
      catchError(() => throwError(() => new Error('Google sign-in failed')))
    );
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  logout(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      map(() => {
        this.currentUserSubject.next(null);
      }),
      catchError(() => throwError(() => new Error('Failed to log out.')))
    );
  }
}
