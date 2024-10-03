import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private firestore: Firestore) {}

  // Create a Post
  createPost(post: any) {
    const postCollection = collection(this.firestore, 'posts');
    return addDoc(postCollection, post);
  }

  // Get all Post
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
  // Get Post by id
  // getPost(id: string): Observable<any> {
  //   const postRef = doc(this.firestore, 'posts', id);
  //   return doc(postRef)
  //     .get()
  //     .pipe(
  //       map((doc: any) => {
  //         return { id: doc.id, ...doc.data() };
  //       })
  //     );
  // }
}
