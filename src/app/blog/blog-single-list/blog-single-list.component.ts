import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../../core/post.service';
import { BlogPost } from '../../models/blog-post.model';

@Component({
  selector: 'app-blog-single-list',
  templateUrl: './blog-single-list.component.html',
  styleUrls: ['./blog-single-list.component.css'],
})
export class BlogSingleListComponent implements OnInit {
  @Input() post: BlogPost | null = null;
  isOpen = false;
  blogId: string | null = null;
  loading: boolean = false;
  newCommentText: string = '';
  @Output() closeModal = new EventEmitter<void>();

  isHeartSolid = false;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.blogId = params.get('id');
      this.loadBlogDetail(this.blogId);
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
      // Implement your logic for editing the post
      // You might want to navigate to an edit page or open an edit modal
      console.log('Editing post:', this.post);
    }
  }

  deletePost() {
    // if (this.post) {
    //   // Implement the logic to delete the post using PostService
    //   this.postService
    //     .deletePost(this.post.id)
    //     .then(() => {
    //       console.log('Post deleted successfully');
    //       this.close(); // Optionally close the modal after deletion
    //     })
    //     .catch((error: any) => {
    //       console.error('Error deleting post:', error);
    //     });
    // }
  }

  likePost() {
    // if (this.post && this.post.authorUUID) {
    //   this.postService
    //     .likePost(this.post.id, this.post.authorUUID)
    //     .then(() => {
    //       console.log('Post liked successfully');
    //       // Optionally refresh the post to update likes count
    //     })
    //     .catch((error) => {
    //       console.error('Error liking post:', error);
    //     });
    // }
  }

  addComment() {
    // if (this.post && this.newCommentText) {
    //   const newComment = {
    //     author: 'Current User', // Replace with actual current user's name
    //     text: this.newCommentText,
    //   };
    //   this.postService
    //     .addComment(this.post.id, newComment)
    //     .then(() => {
    //       console.log('Comment added successfully');
    //       this.newCommentText = ''; // Clear the input after adding
    //       this.loadBlogDetail(this.post.id); // Refresh post to show new comment
    //     })
    //     .catch((error) => {
    //       console.error('Error adding comment:', error);
    //     });
    // }
  }

  // Toggle functions for the buttons
  toggleHeart() {
    this.isHeartSolid = !this.isHeartSolid;
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
