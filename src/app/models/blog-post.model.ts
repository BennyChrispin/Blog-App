export interface BlogPost {
  id?: string;
  title: string;
  content: string;
  image: string;
  userUUID: string;
  createdAt: string;
  isBookmarked: boolean;
  isTrending: boolean;
  authorDisplayName: string;
  authorUUID: string;
  likes: string[];
  comments: Comment[];
}

export interface Comment {
  id?: string;
  userUUID: string;
  authorDisplayName: string;
  photoURL: string;
  content: string;
  createdAt: Date;
}
