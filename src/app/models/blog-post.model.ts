export interface BlogPost {
  id?: string;
  title: string;
  content: string;
  image: string;
  userUUID: string;
  createdAt: string;
  isBookmarked: boolean;
  isTrending: boolean;
  likes: string[];
  comments: Comment[];
}

export interface Comment {
  userUUID: string;
  content: string;
  createdAt: string;
}
