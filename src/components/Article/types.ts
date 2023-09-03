export type ArticleInfo = {
  displayName: string;
  photoURL: string | null;
  supportURL: string | null;
  createdAt: string;
  topics?: string[];
  originalSource: {
    url: string;
    textContent: string;
    title: string;
    coverImageURL: string | null;
    description: string;
  } | null;
  claims: string[];
  title: string;
  authorURL: string;
};
