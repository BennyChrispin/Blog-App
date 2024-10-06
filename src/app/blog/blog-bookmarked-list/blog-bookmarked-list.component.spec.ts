import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogBookmarkedListComponent } from './blog-bookmarked-list.component';

describe('BlogBookmarkedListComponent', () => {
  let component: BlogBookmarkedListComponent;
  let fixture: ComponentFixture<BlogBookmarkedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogBookmarkedListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogBookmarkedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
