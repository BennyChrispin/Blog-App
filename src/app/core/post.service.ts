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

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private firestore: Firestore) {}

  // Create a Post
  async createPost(post: BlogPost) {
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
