import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BannerComponent } from './banner/banner.component';
import { BlogSingleListComponent } from './blog-single-list/blog-single-list.component';
import { SharedModule } from '../shared/shared.module';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BlogListComponent,
    BannerComponent,
    BlogSingleListComponent,
    ConfirmationModalComponent,
  ],
  imports: [CommonModule, SharedModule, FormsModule],
})
export class BlogModule {}
