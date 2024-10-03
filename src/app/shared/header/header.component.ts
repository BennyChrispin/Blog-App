import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: User | null = null;
  user$: Observable<User | null>;
  showBlogCreateModal: boolean = false;
  constructor(private authService: AuthService, private router: Router) {
    this.user$ = this.authService.currentUser$;
  }
  ngOnInit() {
    this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  openBlogCreateModal() {
    if (this.user) {
      const userUUID = this.user.uid;
      this.router.navigate(['/blog-create', userUUID]);
      this.showBlogCreateModal = true;
    } else {
      console.error('User is not logged in');
    }
  }

  closeBlogCreateModal() {
    this.showBlogCreateModal = false;
  }
}
