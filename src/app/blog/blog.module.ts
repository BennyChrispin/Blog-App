import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { CommentSectionComponent } from './comment-section/comment-section.component';
import { BannerComponent } from './banner/banner.component';

@NgModule({
  declarations: [
    BlogListComponent,
    BlogDetailComponent,
    BlogCreateComponent,
    BlogEditComponent,
    CommentSectionComponent,
    BannerComponent,
  ],
  imports: [CommonModule],
})
export class BlogModule {}
