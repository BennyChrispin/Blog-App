import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogCreateComponent } from './blog/blog-create/blog-create.component';
import { BlogSingleListComponent } from './blog/blog-single-list/blog-single-list.component';
import { BlogBookmarkedListComponent } from './blog/blog-bookmarked-list/blog-bookmarked-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'blogs', component: BlogListComponent },
  { path: 'blogs/bookmarked', component: BlogBookmarkedListComponent },
  { path: 'blogs/:id', component: BlogSingleListComponent },
  {
    path: 'blog-create/:uuid',
    component: BlogCreateComponent,
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
