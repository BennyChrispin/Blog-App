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
import { BlogPost, Comment } from '../../models/blog-post.model';
import { AuthService } from '../../core/auth.service';
import { BlogCreateComponent } from '../blog-create/blog-create.component';
import { FormGroup } from '@angular/forms';
import { formatDistanceToNow } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

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
  showConfirmationModal = false;

  // A map to track like state for each post by ID
  likedPosts: { [key: string]: boolean } = {};

  isOpen = false;
  blogId: string | null = null;
  loading: boolean = false;
  newCommentText: string = '';
  isExpanded: boolean = false;
  isHeartSolid = false;
  currentUserDisplayName: string | null = null;
  currentUserId: string | null = null;
  comments: Comment[] = [];
  commentForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router,
    private authService: AuthService
  ) {}

  // Make sure to check post before loading comments
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.blogId = params.get('id');
      this.loadBlogDetail(this.blogId);
      this.currentUserDisplayName =
        this.authService.getCurrentUser()?.displayName || null;
    });
    this.currentUserId = this.authService.getCurrentUser()?.uid || null;
  }

  loadBlogDetail(id: string | null) {
    if (id) {
      this.postService
        .getPostById(id)
        .then((post) => {
          if (post && post.id) {
            this.post = post;
            this.likedPosts[post.id] =
              post.likes?.includes(this.currentUserId || '') || false;
            this.loadComments(post.id);
          } else {
            console.error('Post is null or does not have an ID.');
          }
        })
        .catch((error) => {
          console.error('Error fetching blog details:', error);
        });
    }
  }

  ngAfterViewInit() {
    if (this.isOpen && this.blogCreateComponent) {
      this.blogCreateComponent.post = this.post;
    }
  }

  openEditModal(post: BlogPost) {
    this.isOpen = true;
    setTimeout(() => {
      if (this.blogCreateComponent) {
        this.blogCreateComponent.post = post;
      }
    }, 0);
  }

  editPost() {
    if (this.post) {
      this.openEditModal(this.post);
    }
  }

  confirmDelete() {
    this.showConfirmationModal = true;
  }

  closeDeleteModal() {
    this.showConfirmationModal = false;
  }

  onDeleteConfirm() {
    if (this.post && this.post.id) {
      this.postService
        .deletePost(this.post.id)
        .then(() => {
          this.closeDeleteModal();
          this.router.navigate(['/blogs']);
        })
        .catch((error) => {
          console.error('Error deleting post:', error);
        });
    } else {
      console.error('Post or Post ID is undefined.');
    }
  }

  addComment() {
    if (!this.post) {
      console.error('Post is undefined.');
      return;
    }

    if (!this.newCommentText.trim()) {
      console.error('Comment text is empty.');
      return;
    }

    const postId = this.post.id;
    if (typeof postId === 'string') {
      this.postService
        .addComment(postId, this.newCommentText)
        .then(() => {
          this.loadComments(postId);
          this.newCommentText = '';
        })
        .catch((error) => {
          console.error('Error adding comment:', error);
        });
    } else {
      console.error('Post ID is not a valid string.');
    }
  }

  loadComments(postId: string) {
    this.postService.getComments(postId).then((comments) => {
      this.comments = comments;
    });
  }

  getRelativeTime(timestamp: any): string {
    if (timestamp instanceof Timestamp) {
      timestamp = timestamp.toDate();
    }

    const date = new Date(timestamp);

    if (isNaN(date.getTime())) {
      console.error('Invalid date:', timestamp);
      return 'Invalid date';
    }

    return formatDistanceToNow(date, { addSuffix: true });
  }

  async likePost(postId: string): Promise<void> {
    if (!this.currentUserId || !this.likedPosts.hasOwnProperty(postId)) return;

    try {
      if (this.likedPosts[postId]) {
        // Unlike the post
        await this.postService.unlikePost(postId, this.currentUserId);
        console.log('Unlike post', postId);
      } else {
        // Like the post
        await this.postService.likePost(postId, this.currentUserId);
        console.log('Like post', postId);
      }

      // Update the local like state
      this.likedPosts[postId] = !this.likedPosts[postId];

      // Reload the post to get the latest like count
      this.loadBlogDetail(postId);
    } catch (error) {
      console.error('Error updating like status:', error);
    }
  }

  toggleHeart() {
    if (this.post?.id) {
      this.isHeartSolid = !this.isHeartSolid;
      this.likePost(this.post.id);
    } else {
      console.error('Post ID is undefined');
    }
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  open(post: BlogPost) {
    this.isOpen = true;

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
