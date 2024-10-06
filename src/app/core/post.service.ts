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
  query,
  where,
  QuerySnapshot,
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { AuthService } from './auth.service';
import { Comment } from '../models/blog-post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  getTrendingPosts(): Observable<BlogPost[]> | null {
    throw new Error('Method not implemented.');
  }
  constructor(private firestore: Firestore, private authService: AuthService) {}

  // Modify your method to subscribe to currentUser$
  async createPost(post: BlogPost): Promise<void> {
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        post.authorUUID = user.uid;
        post.authorDisplayName = user.displayName || 'Anonymous';

        const postCollection = collection(this.firestore, 'posts');
        addDoc(postCollection, post)
          .then(() => {
            console.log('Post created successfully!');
          })
          .catch((error) => {
            console.error('Error creating post:', error);
          });
      } else {
        console.error('No user logged in');
      }
    });
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

  // Add bookmark (store postId)
  async addBookmark(postId: string): Promise<void> {
    const bookmarkCollection = collection(this.firestore, 'bookmarks');
    await addDoc(bookmarkCollection, {
      postId,
      createdAt: new Date(),
    });
    console.log(`Bookmarked post with ID: ${postId}`);
  }

  // Remove bookmark by postId
  async removeBookmark(postId: string): Promise<void> {
    const bookmarkCollection = collection(this.firestore, 'bookmarks');
    const bookmarkQuery = query(
      bookmarkCollection,
      where('postId', '==', postId)
    );

    const querySnapshot = await getDocs(bookmarkQuery);
    querySnapshot.forEach(async (docSnapshot) => {
      const docRef = doc(this.firestore, `bookmarks/${docSnapshot.id}`);
      await deleteDoc(docRef);
      console.log(`Unbookmarked post with ID: ${postId}`);
    });
  }

  // Fetches bookmarked post IDs for a user
  getUserBookmarks(userId: string): Promise<string[]> {
    const bookmarkCollection = collection(
      this.firestore,
      `users/${userId}/bookmarks`
    );
    return getDocs(bookmarkCollection)
      .then((snapshot: QuerySnapshot) => {
        const bookmarks: string[] = [];
        snapshot.forEach((doc: QueryDocumentSnapshot) => {
          bookmarks.push(doc.id);
        });
        return bookmarks;
      })
      .catch((error: any) => {
        console.error('Error fetching bookmarks:', error);
        return [];
      });
  }

  // Get multiple posts by their IDs
  async getPostsByIds(postIds: string[]): Promise<BlogPost[]> {
    const posts: BlogPost[] = [];

    for (const postId of postIds) {
      const post = await this.getPostById(postId);
      if (post) {
        posts.push(post);
      }
    }

    return posts;
  }

  // Like Post
  async likePost(postId: string, userUUID: string): Promise<void> {
    const postDoc = doc(this.firestore, `posts/${postId}`);
    await updateDoc(postDoc, {
      likes: arrayUnion(userUUID),
    });
    console.log(
      'Liked post:',
      postId,
      'Likes updated:',
      (await getDoc(postDoc)).data()?.['likes']
    );
  }

  // unLike Post
  async unlikePost(postId: string, userUUID: string): Promise<void> {
    const postDoc = doc(this.firestore, `posts/${postId}`);
    await updateDoc(postDoc, {
      likes: arrayRemove(userUUID),
    });
    console.log('Unliked post:', postId, 'by user:', userUUID);
  }
}
