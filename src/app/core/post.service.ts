import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private firestore: Firestore) {}

  // Create a Post
  async createPost(post: any, imageUrl: string | null) {
    // If there is an image URL, add it to the post
    if (imageUrl) {
      post.image = imageUrl; // Add the image URL to the post
    }

    const postCollection = collection(this.firestore, 'posts');
    return addDoc(postCollection, post);
  }

  // Get all Posts
  getPosts(): Observable<any[]> {
    const postCollection = collection(this.firestore, 'posts');
    return collectionData(postCollection, { idField: 'id' }).pipe(
      map((data: any) => {
        return data.map((item: any) => {
          return { ...item, id: item.id };
        });
      })
    );
  }
}
