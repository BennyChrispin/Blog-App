import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/auth/auth.state';
import { Auth, User, UserCredential } from '@angular/fire/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { from, Observable, map, switchMap, catchError, throwError } from 'rxjs';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    @Inject(Auth) private auth: Auth,
    private firestore: Firestore,
    private store: Store<AuthState>
  ) {}

  // Register method that returns the User object and stores additional user data
  register(
    email: string,
    password: string,
    name: string,
    username: string
  ): Observable<User> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      switchMap((userCredential: UserCredential) => {
        const user = userCredential.user;

        // Store additional user details in Firestore
        const userRef = doc(this.firestore, `users/${user.uid}`);
        return from(
          setDoc(userRef, { name, username, email: user.email })
        ).pipe(map(() => user));
      }),
      catchError((error) => {
        console.error('Registration error:', error); // Log the error
        return throwError(() => new Error(error)); // Pass the error to the component
      })
    );
  }

  // Login method that returns only the User object
  login(email: string, password: string): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      map((userCredential: UserCredential) => userCredential.user)
    );
  }

  // Logout method
  logout(): Observable<void> {
    return from(signOut(this.auth));
  }
}
