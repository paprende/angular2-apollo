import { List, Map } from 'Immutable';

// models
export interface Post {
  id: number;
  title?: string;
  author?: AuthorMap;
  votes?: number;
}

export interface Author {
  id: number;
  firstName?: string;
  lastName?: string;
  posts?: List<PostMap>;
}

// types
export type PostMap = Map<any, Post>;
export type AuthorMap = Map<any, Author>;
