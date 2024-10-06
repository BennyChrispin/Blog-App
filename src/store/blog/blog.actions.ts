import { createAction, props } from '@ngrx/store';
import { BlogPost } from '../../app/models/blog-post.model';

export const addBookmark = createAction(
  '[Bookmark] Add Bookmark',
  props<{ post: BlogPost }>()
);

export const removeBookmark = createAction(
  '[Bookmark] Remove Bookmark',
  props<{ postId: string }>()
);
