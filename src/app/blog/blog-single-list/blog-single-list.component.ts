import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../core/post.service';
import { BlogPost } from '../../models/blog-post.model';
import { AuthService } from '../../core/auth.service';
import { BlogCreateComponent } from '../blog-create/blog-create.component';

@Component({
  selector: 'app-blog-single-list',
  templateUrl: './blog-single-list.component.html',
  styleUrls: ['./blog-single-list.component.css'],
})
export class BlogSingleListComponent implements OnInit, AfterViewInit {
  @Output() closeModal = new EventEmitter<void>();
  @Input() post: BlogPost | null = null;
  @ViewChild(BlogCreateComponent, { static: false })
  blogCreateComponent!: BlogCreateComponent;

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

  ngAfterViewInit() {
    // `blogCreateComponent` will now be initialized when modal is open
    if (this.isOpen && this.blogCreateComponent) {
      this.blogCreateComponent.post = this.post;
    }
  }

  openEditModal(post: BlogPost) {
    this.isOpen = true; // Open the modal
    setTimeout(() => {
      if (this.blogCreateComponent) {
        this.blogCreateComponent.post = post;
      }
    }, 0); // Delay to ensure child component is rendered
  }

  editPost() {
    if (this.post) {
      this.openEditModal(this.post);
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
    this.isOpen = true;

    // Delay the access to allow the component to initialize
    setTimeout(() => {
      if (this.blogCreateComponent) {
        this.blogCreateComponent.post = post;
      } else {
        console.error('BlogCreateComponent is not initialized yet.');
      }
    });
  }

  close() {
    this.isOpen = false;
    this.closeModal.emit();
    this.router.navigate(['/blogs']);
  }
}
