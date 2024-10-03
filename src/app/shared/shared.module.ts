import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserProfileComponent } from '../auth/user-profile/user-profile.component';
import { BlogCreateComponent } from '../blog/blog-create/blog-create.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    UserProfileComponent,
    BlogCreateComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    UserProfileComponent,
    BlogCreateComponent,
  ],
})
export class SharedModule {}
