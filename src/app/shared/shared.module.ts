import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UserProfileComponent } from '../auth/user-profile/user-profile.component';
import { BlogCreateComponent } from '../blog/blog-create/blog-create.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    UserProfileComponent,
    BlogCreateComponent,
  ],
  imports: [CommonModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    UserProfileComponent,
    BlogCreateComponent,
  ],
})
export class SharedModule {}
