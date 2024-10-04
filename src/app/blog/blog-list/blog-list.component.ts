import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from '../../core/post.service';
import { BlogPost } from '../../models/blog-post.model';
import { Router } from '@angular/router';

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

  constructor(private postService: PostService, private router: Router) {}

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

  toggleBookmark() {
    this.isBookmarkSolid = !this.isBookmarkSolid;
  }

  togglePaperPlane() {
    this.isPaperPlaneSolid = !this.isPaperPlaneSolid;
  }

  openModal(post: any) {
    this.router.navigate(['/blogs', post.id]);
  }
}
