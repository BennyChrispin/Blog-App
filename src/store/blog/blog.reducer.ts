import { createReducer, on } from '@ngrx/store';
import { addBookmark, removeBookmark } from '../blog/blog.actions';
import { BlogPost } from '../../app/models/blog-post.model';

export interface BookmarkState {
  bookmarkedPosts: BlogPost[];
}

export const initialState: BookmarkState = {
  bookmarkedPosts: [],
};

export const bookmarkReducer = createReducer(
  initialState,
  on(addBookmark, (state, { post }) => ({
    ...state,
    bookmarkedPosts: [...state.bookmarkedPosts, post],
  })),
  on(removeBookmark, (state, { postId }) => ({
    ...state,
    bookmarkedPosts: state.bookmarkedPosts.filter((post) => post.id !== postId),
  }))
);
