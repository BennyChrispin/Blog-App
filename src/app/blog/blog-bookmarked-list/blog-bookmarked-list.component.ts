import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PostService } from '../../core/post.service';
import { BlogPost } from '../../models/blog-post.model';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-blog-bookmarked-list',
  templateUrl: './blog-bookmarked-list.component.html',
  styleUrls: ['./blog-bookmarked-list.component.css'],
})
export class BlogBookmarkedListComponent implements OnInit {
  bookmarkedPosts: BlogPost[] = [];

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Subscribe to the current user observable
    this.authService.getCurrentUserAsync().subscribe(
      async (user) => {
        console.log('Current User:', user);

        if (user) {
          try {
            // Fetch the user's bookmarked post IDs
            const bookmarkedPostIds = await this.postService.getUserBookmarks(
              user.uid
            );
            console.log('Bookmarked Post IDs:', bookmarkedPostIds);

            // Fetch the posts based on the bookmarked IDs
            const posts = await Promise.all(
              bookmarkedPostIds.map((postId) =>
                this.postService.getPostById(postId)
              )
            );
            console.log('Fetched Posts Before Filtering:', posts);

            // Filter out null results
            this.bookmarkedPosts = posts.filter(
              (post): post is BlogPost => post !== null
            );
            console.log('Filtered Bookmarked Posts:', this.bookmarkedPosts);

            this.cd.detectChanges();
          } catch (error) {
            console.error('Error fetching bookmarked posts:', error);
          }
        } else {
          console.log('No user is signed in.');
        }
      },
      (error) => {
        console.error('Error in user subscription:', error);
      }
    );
  }

  // Toggle the bookmark status for a post
  async toggleBookmark(post: BlogPost) {
    try {
      if (post.isBookmarked) {
        await this.postService.removeBookmark(post.id!);
        post.isBookmarked = false;
      } else {
        await this.postService.addBookmark(post.id!);
        post.isBookmarked = true;
      }
      this.cd.detectChanges();
    } catch (error) {
      console.error(
        `Error toggling bookmark for post with ID ${post.id}:`,
        error
      );
    }
  }
}
