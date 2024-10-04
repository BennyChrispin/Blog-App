import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    // Get the ID from the route parameters
    this.route.paramMap.subscribe((params) => {
      this.blogId = params.get('id');
      this.loadBlogDetail(this.blogId);
    });
  }

  loadBlogDetail(id: string | null) {
    if (id) {
      this.postService
        .getPostById(id)
        .then((post) => {
          this.post = post;
        })
        .catch((error) => {
          console.error('Error fetching blog details:', error);
        });
    }
  }

  open(post: BlogPost) {
    this.post = post;
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }
}
