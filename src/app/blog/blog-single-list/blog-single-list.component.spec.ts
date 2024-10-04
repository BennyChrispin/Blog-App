import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogSingleListComponent } from './blog-single-list.component';

describe('BlogSingleListComponent', () => {
  let component: BlogSingleListComponent;
  let fixture: ComponentFixture<BlogSingleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogSingleListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogSingleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
