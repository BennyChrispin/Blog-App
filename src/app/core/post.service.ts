import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  // Create a Post with author's information
  async createPost(post: BlogPost) {
    const user = this.authService.getCurrentUser();
    if (user) {
      post.authorUUID = user.uid;
      post.authorDisplayName = user.displayName || 'Anonymous';
    }

    const postCollection = collection(this.firestore, 'posts');
    return addDoc(postCollection, post);
  }

  // Get all Posts
  getPosts(): Observable<BlogPost[]> {
    const postCollection = collection(this.firestore, 'posts');
    return collectionData(postCollection, { idField: 'id' }).pipe(
      map((data: BlogPost[]) => {
        return data.map((item: BlogPost) => {
          return { ...item, id: item.id };
        });
      })
    );
  }

  // like
  likePost(postId: string, userUUID: string) {
    const postDoc = doc(this.firestore, `posts/${postId}`);
    return updateDoc(postDoc, {
      likes: arrayUnion(userUUID),
    });
  }

  unlikePost(postId: string, userUUID: string) {
    const postDoc = doc(this.firestore, `posts/${postId}`);
    return updateDoc(postDoc, {
      likes: arrayRemove(userUUID),
    });
  }
}
