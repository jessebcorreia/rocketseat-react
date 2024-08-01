import { users, User } from "./users";
import { contents, ContentItem } from "./contents";

// Definindo a interface para o Post
export interface Post {
  id: number;
  author: User;
  content: ContentItem[];
  publishedAt: Date;
}

export const posts: Post[] = [
  {
    id: 1,
    author: users.jessebcorreia,
    content: contents.post1,
    publishedAt: new Date("2024-07-29T11:00:00"),
  },
  {
    id: 2,
    author: users.maykbrito,
    content: contents.post2,
    publishedAt: new Date("2024-07-25T08:37:00"),
  },
];
