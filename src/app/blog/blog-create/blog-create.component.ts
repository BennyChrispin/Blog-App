import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../core/post.service';
import { BlogPost } from '../../models/blog-post.model';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css'],
})
export class BlogCreateComponent implements OnInit {
  @Input() post: BlogPost | null = null;
  imagePreview: string | null = null;
  blogForm: FormGroup;
  @Output() closeModal = new EventEmitter<void>();

  isEditMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private postService: PostService
  ) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      image: ['', Validators.required],
      isTrending: [false],
    });
  }

  ngOnInit(): void {
    if (this.post) {
      this.isEditMode = true;
      this.blogForm.patchValue({
        title: this.post.title,
        content: this.post.content,
        image: this.post.image,
        isTrending: this.post.isTrending,
      });
      this.imagePreview = this.post.image;
    }
  }

  updateImagePreview(): void {
    this.imagePreview = this.blogForm.get('image')?.value;
  }

  close() {
    this.closeModal.emit();
    this.router.navigate(['/blogs']);
  }

  async onSend() {
    if (this.blogForm.valid) {
      const createdAt = new Date().toISOString();
      const user = this.authService.getCurrentUser();

      if (user) {
        const blogPost: BlogPost = {
          id: this.post ? this.post.id : null,
          ...this.blogForm.value,
          authorDisplayName: user.displayName,
          createdAt: this.post ? this.post.createdAt : createdAt,
        };

        if (this.post) {
          // Update existing post
          await this.postService.updatePost(blogPost);
        } else {
          // Create new post
          await this.postService.createPost(blogPost);
        }

        this.close();
      }
    }
  }
}
