import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserProfileComponent } from '../auth/user-profile/user-profile.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, UserProfileComponent],
  imports: [CommonModule],
  exports: [HeaderComponent, FooterComponent, UserProfileComponent],
})
export class SharedModule {}
