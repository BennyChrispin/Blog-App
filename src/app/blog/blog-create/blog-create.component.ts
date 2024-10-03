import { Component, EventEmitter, Output } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../core/post.service';
import { BlogPost } from '../../models/blog-post.model';
import { AuthService } from '../../core/auth.service'; // Import AuthService to get user details

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

      // Get the current user details
      const user = this.authService.getCurrentUser();

      if (user) {
        // Create a blog post object based on the BlogPost interface
        const blogPost: BlogPost = {
          title: this.blogForm.value.title,
          content: this.blogForm.value.content,
          image: this.blogForm.value.image,
          userUUID: this.userUUID as string,
          createdAt: createdAt,
          isBookmarked: false,
          isTrending: this.blogForm.value.isTrending,
          likes: [],
          comments: [],
          authorUUID: user.uid,
          authorDisplayName: user.displayName || 'Anonymous',
        };

        try {
          await this.postService.createPost(blogPost);
          console.log('Blog post added successfully!');
          this.close();
        } catch (error) {
          console.error('Error adding blog post: ', error);
        }
      } else {
        console.error('User not authenticated.');
      }
    } else {
      console.log('Form is invalid');
      this.blogForm.markAllAsTouched();
    }
  }
}
