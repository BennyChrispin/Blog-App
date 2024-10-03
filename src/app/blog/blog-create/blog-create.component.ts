import { Component, EventEmitter, Output } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../core/post.service';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css'],
})
export class BlogCreateComponent {
  userUUID: string | null = null;
  imagePreview: string | null = null;
  blogForm: FormGroup;

  @Output() closeModal = new EventEmitter<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: Auth,
    private fb: FormBuilder,
    private postService: PostService
  ) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userUUID = this.route.snapshot.paramMap.get('uuid');
    console.log('BlogCreateComponent initialized with UUID:', this.userUUID);
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
      console.log('Sending blog post', this.blogForm.value);

      // Get the current timestamp
      const createdAt = new Date().toISOString();

      const blogPost = {
        title: this.blogForm.value.title,
        content: this.blogForm.value.content,
        image: this.blogForm.value.image,
        userUUID: this.userUUID,
        createdAt: createdAt,
        isBookmarked: false,
      };

      try {
        await this.postService.createPost(blogPost, null);
        console.log('Blog post added successfully!');
        this.close();
      } catch (error) {
        console.error('Error adding blog post: ', error);
      }
    } else {
      console.log('Form is invalid');
      this.blogForm.markAllAsTouched();
    }
  }
}
