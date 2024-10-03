import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css'],
})
export class BlogCreateComponent {
  userUUID: string | null = null;
  imagePreview: string | null = null;

  @Output() closeModal = new EventEmitter<void>();

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.userUUID = this.route.snapshot.paramMap.get('uuid');
    console.log('BlogCreateComponent initialized with UUID:', this.userUUID);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  close() {
    this.closeModal.emit();
    this.router.navigate(['/blogs']);
  }
}
