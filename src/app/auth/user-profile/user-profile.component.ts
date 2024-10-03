import { Component, Input } from '@angular/core';
import { User } from 'firebase/auth';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  @Input() user: User | null = null;
  isOpen: boolean = false;

  constructor(private authService: AuthService) {}

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  formatCreationTime(creationTime: string | undefined): string {
    if (!creationTime) return '';

    // Create a Date object from the creation time
    const date = new Date(creationTime);

    // Format the date to MM/DD/YYYY
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }

  logout() {
    this.authService.logout();
    this.closeModal();
  }
}
