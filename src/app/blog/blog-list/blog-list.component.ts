import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from '../../core/post.service';
import { BlogPost } from '../../models/blog-post.model';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css'],
})
export class BlogListComponent implements OnInit {
  trendingPosts$: Observable<BlogPost[]> | null = null;
  nonTrendingPosts$: Observable<BlogPost[]> | null = null;

  isLoadingTrending = true;
  isLoadingNonTrending = true;

  hasTrendingPosts = true; // New flag
  hasNonTrendingPosts = true; // New flag

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((posts) => {
      const trending = posts.filter((post) => post.isTrending);
      const nonTrending = posts.filter((post) => !post.isTrending);

      // Set the flag to false if no trending posts are found
      this.hasTrendingPosts = trending.length > 0;
      this.hasNonTrendingPosts = nonTrending.length > 0;

      // Simulate loading state for trending posts
      setTimeout(() => {
        if (this.hasTrendingPosts) {
          this.trendingPosts$ = new Observable((observer) => {
            observer.next(trending);
          });
        }
        this.isLoadingTrending = false;
      }, 1000);

      // Simulate loading state for non-trending posts
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
}
