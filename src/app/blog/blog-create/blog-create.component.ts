import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css'],
})
export class BlogCreateComponent {
  userUUID: string | null = null;

  @Output() closeModal = new EventEmitter<void>();

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.userUUID = this.route.snapshot.paramMap.get('uuid');
    console.log('BlogCreateComponent initialized with UUID:', this.userUUID);
  }

  // Function to close the modal and navigate back to blogs
  close() {
    this.router.navigate(['/blogs']);
  }
}
