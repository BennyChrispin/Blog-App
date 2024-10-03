import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrl: './blog-create.component.css',
})
export class BlogCreateComponent {
  userUUID: string | null = null;
  showBlogCreateModal: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.userUUID = this.route.snapshot.paramMap.get('uuid');
    console.log('BlogCreateComponent initialized with UUID:', this.userUUID);
    this.openBlogCreateModal();
  }

  openBlogCreateModal() {
    // Logic to show the modal
    this.showBlogCreateModal = true;
  }

  closeModal() {
    this.router.navigate(['/blogs']);
  }
}
