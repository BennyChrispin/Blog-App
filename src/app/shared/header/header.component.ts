import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: User | null = null;
  user$: Observable<User | null>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
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
      this.router.navigate(['/blog-create', userUUID]).then(() => {});
    } else {
      // Displaying a toast if the user is not logged in
      this.toastr.error('You need to login first!', 'Authentication Required');
    }
  }
}
