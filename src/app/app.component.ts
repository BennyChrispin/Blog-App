import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Blogs';

  constructor(public router: Router) {}

  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }

  isRegisterRoute(): boolean {
    return this.router.url === '/register';
  }

  isBlogRoute(): boolean {
    return this.router.url === '/blogs' || this.router.url === '/profile';
  }
}
