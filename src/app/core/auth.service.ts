import { Injectable, Inject } from '@angular/core';
import { Auth, User, UserCredential } from '@angular/fire/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { from, Observable, map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(@Inject(Auth) private auth: Auth) {}

  register(email: string, password: string): Observable<User> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      map((userCredential: UserCredential) => userCredential.user),
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
      map((userCredential: UserCredential) => userCredential.user),
      catchError(() =>
        throwError(() => new Error('Invalid email or password.'))
      )
    );
  }

  logout(): Observable<void> {
    return from(signOut(this.auth)).pipe(
      catchError(() => throwError(() => new Error('Failed to log out.')))
    );
  }
}
