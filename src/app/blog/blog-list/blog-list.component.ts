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

  expandedPosts: { [index: number]: boolean } = {};

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    // Fetch all posts
    this.postService.getPosts().subscribe((posts) => {
      // Separate trending and non-trending posts
      const trending = posts.filter((post) => post.isTrending);
      const nonTrending = posts.filter((post) => !post.isTrending);

      this.trendingPosts$ = new Observable((observer) => {
        observer.next(trending);
      });

      this.nonTrendingPosts$ = new Observable((observer) => {
        observer.next(nonTrending);
      });
    });
  }

  togglePostContent(index: number): void {
    this.expandedPosts[index] = !this.expandedPosts[index];
  }

  isPostExpanded(index: number): boolean {
    return !!this.expandedPosts[index];
  }
}
