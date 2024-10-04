import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../core/post.service';
import { BlogPost } from '../../models/blog-post.model';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-blog-single-list',
  templateUrl: './blog-single-list.component.html',
  styleUrls: ['./blog-single-list.component.css'],
})
export class BlogSingleListComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  @Input() post: BlogPost | null = null;
  isOpen = false;
  blogId: string | null = null;
  loading: boolean = false;
  newCommentText: string = '';
  isExpanded: boolean = false;
  isHeartSolid = false;
  currentUserDisplayName: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.blogId = params.get('id');
      this.loadBlogDetail(this.blogId);
      this.currentUserDisplayName =
        this.authService.getCurrentUser()?.displayName || null;
    });
  }

  loadBlogDetail(id: string | null) {
    if (id) {
      this.loading = true;
      this.postService
        .getPostById(id)
        .then((post) => {
          this.post = post;
          this.loading = false;
        })
        .catch((error) => {
          console.error('Error fetching blog details:', error);
          this.loading = false;
        });
    }
  }

  editPost() {
    if (this.post) {
      console.log('Editing post:', this.post);
    }
  }

  deletePost() {
    if (this.post) {
      console.log('Deleting post:', this.post.id);
    }
  }

  likePost() {}

  addComment() {}

  toggleHeart() {
    this.isHeartSolid = !this.isHeartSolid;
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  open(post: BlogPost) {
    this.post = post;
    this.isOpen = true;
  }

  close() {
    this.closeModal.emit();
    this.router.navigate(['/blogs']);
  }
}
