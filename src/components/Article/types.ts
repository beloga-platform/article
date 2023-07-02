export type ArticleInfo = {
  displayName: string;
  photoURL: string | null;
  supportURL: string | null;
  createdAt: string;
  topics?: string[];
  originalAuthor: string | null;
  originalURL: string | null;
  claims: string[];
  title: string;
  authorURL: string;
};
