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
  getDoc,
  deleteDoc,
  getDocs,
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { AuthService } from './auth.service';
import { Comment } from '../models/blog-post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  // Create a Post with author's information
  async createPost(post: BlogPost): Promise<void> {
    const user = this.authService.getCurrentUser();
    if (user) {
      post.authorUUID = user.uid;
      post.authorDisplayName = user.displayName || 'Anonymous';
    }

    const postCollection = collection(this.firestore, 'posts');
    await addDoc(postCollection, post);
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

  // Get a Post by ID
  getPostById(postId: string): Promise<BlogPost | null> {
    const postDoc = doc(this.firestore, `posts/${postId}`);
    return getDoc(postDoc).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data() as BlogPost;
        return { ...data, id: docSnapshot.id };
      } else {
        console.log('No such document!');
        return null;
      }
    });
  }

  // Update the updatePost method to only include the fields that are required
  async updatePost(post: BlogPost): Promise<void> {
    if (!post.id) {
      throw new Error('Post ID is required for updating a post.');
    }

    const postDoc = doc(this.firestore, `posts/${post.id}`);

    // Create an object containing only the properties you want to update
    const { title, content, image, isTrending } = post;
    await updateDoc(postDoc, { title, content, image, isTrending });
  }

  // Delete a post by its ID
  async deletePost(id: string): Promise<void> {
    const postDoc = doc(this.firestore, `posts/${id}`);
    await deleteDoc(postDoc);
  }

  // Add a comment to a post in the comments sub-collection
  async addComment(postId: string, content: string): Promise<void> {
    const user = this.authService.getCurrentUser();
    if (user) {
      const comment = {
        content: content,
        authorUUID: user.uid,
        authorDisplayName: user.displayName || 'Anonymous',
        createdAt: new Date(),
      };

      const commentsCollection = collection(
        this.firestore,
        `posts/${postId}/comments`
      );
      await addDoc(commentsCollection, comment);
    }
  }

  // Retrieve comments for a post
  async getComments(postId: string): Promise<Comment[]> {
    const commentsCollection = collection(
      this.firestore,
      `posts/${postId}/comments`
    );
    const commentsSnapshot = await getDocs(commentsCollection);
    return commentsSnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() } as Comment;
    });
  }

  // Like a Post
  likePost(postId: string, userUUID: string): Promise<void> {
    const postDoc = doc(this.firestore, `posts/${postId}`);
    return updateDoc(postDoc, {
      likes: arrayUnion(userUUID),
    });
  }

  // Unlike a Post
  unlikePost(postId: string, userUUID: string): Promise<void> {
    const postDoc = doc(this.firestore, `posts/${postId}`);
    return updateDoc(postDoc, {
      likes: arrayRemove(userUUID),
    });
  }
}
