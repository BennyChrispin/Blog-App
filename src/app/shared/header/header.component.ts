import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../../store/auth/auth.state';
import { User } from '@angular/fire/auth';
import { selectAuthUser } from '../../../store/auth/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  user$: Observable<User | null>;

  constructor(private store: Store<{ auth: AuthState }>) {
    this.user$ = this.store.select(selectAuthUser);
  }
}
