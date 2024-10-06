import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from '../../core/post.service';
import { BlogPost } from '../../models/blog-post.model';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { UserWithBookmarks } from '../../../store/auth/UserWithBookmarks';
import {
  Firestore,
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit {
  trendingPosts$: Observable<BlogPost[]> | null = null;
  nonTrendingPosts$: Observable<BlogPost[]> | null = null;
  @ViewChild('blogModal') blogModal!: BlogListComponent;
  selectedPost: any;

  isLoadingTrending = true;
  isLoadingNonTrending = true;

  hasTrendingPosts = true;
  hasNonTrendingPosts = true;

  // Boolean values to toggle the state of the buttons
  isHeartSolid = false;
  isCommentSolid = false;
  isBookmarkSolid = false;
  isPaperPlaneSolid = false;

  constructor(
    private postService: PostService,
    private router: Router,
    private authService: AuthService,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((posts) => {
      const trending = posts.filter((post) => post.isTrending);
      const nonTrending = posts.filter((post) => !post.isTrending);

      this.hasTrendingPosts = trending.length > 0;
      this.hasNonTrendingPosts = nonTrending.length > 0;

      setTimeout(() => {
        if (this.hasTrendingPosts) {
          this.trendingPosts$ = new Observable((observer) => {
            observer.next(trending);
          });
        }
        this.isLoadingTrending = false;
      }, 1000);

      setTimeout(() => {
        if (this.hasNonTrendingPosts) {
          this.nonTrendingPosts$ = new Observable((observer) => {
            observer.next(nonTrending);
          });
        }
        this.isLoadingNonTrending = false;
      }, 1000);
    });
  }

  // Toggle functions for the buttons
  toggleHeart() {
    this.isHeartSolid = !this.isHeartSolid;
  }

  toggleComment() {
    this.isCommentSolid = !this.isCommentSolid;
  }

  async toggleBookmark(post: BlogPost) {
    const user = this.authService.getCurrentUser();

    if (!user) {
      console.log('User must be signed in to bookmark posts');
      return;
    }

    const userDocRef = doc(this.firestore, `users/${user.uid}`);
    const userDoc = await getDoc(userDocRef);

    // If user document does not exist, create it with an empty bookmarks array
    if (!userDoc.exists()) {
      await setDoc(userDocRef, { bookmarks: [] });
    }

    if (post.id && this.isPostBookmarked(post.id)) {
      // Proceed if post.id is defined and the post is bookmarked
      await this.unbookmarkPost(post.id!, user.uid);
      post.isBookmarked = false;
      this.isBookmarkSolid = false;
      console.log(`Unbookmarked post by user UUID: ${user.uid}`);
    } else if (post.id) {
      // Proceed if post.id is defined and the post is not bookmarked
      await this.bookmarkPost(post.id!, user.uid);
      post.isBookmarked = true;
      this.isBookmarkSolid = true;
      console.log(`Bookmarked post by user UUID: ${user.uid}`);
    }
  }

  async bookmarkPost(postId: string, userId: string) {
    const userDocRef = doc(this.firestore, `users/${userId}`);
    try {
      // Add the postId to the bookmarks array and include the user ID
      await updateDoc(userDocRef, {
        bookmarks: arrayUnion(postId),
      });
      console.log(
        `Post with ID: ${postId} bookmarked successfully by user UUID: ${userId}`
      );
    } catch (error) {
      console.error('Error bookmarking post: ', error);
    }
  }

  async unbookmarkPost(postId: string, userId: string) {
    const userDocRef = doc(this.firestore, `users/${userId}`);
    try {
      // Remove the postId from the bookmarks array
      await updateDoc(userDocRef, {
        bookmarks: arrayRemove(postId),
      });
      console.log(
        `Post with ID: ${postId} unbookmarked by user UUID: ${userId}`
      );
    } catch (error) {
      console.error('Error unbookmarking post: ', error);
    }
  }

  // Check if the post is bookmarked
  isPostBookmarked(postId: string): boolean {
    const user = this.authService.getCurrentUser() as UserWithBookmarks | null;
    if (user?.bookmarks) {
      return user.bookmarks.includes(postId);
    }
    return false;
  }

  togglePaperPlane() {
    this.isPaperPlaneSolid = !this.isPaperPlaneSolid;
  }

  openModal(post: any) {
    this.router.navigate(['/blogs', post.id]);
  }
}
