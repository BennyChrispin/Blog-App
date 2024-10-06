import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BookmarkState } from '../blog/blog.reducer';

export const selectBookmarkState =
  createFeatureSelector<BookmarkState>('bookmark');

export const selectBookmarkedPosts = createSelector(
  selectBookmarkState,
  (state: BookmarkState) => state.bookmarkedPosts
);
