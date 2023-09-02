import { ArticleInfo } from "../components/Article/types";

export const extractContent = (
  document: Document
): ArticleInfo & { htmlContent: string } => {
  const content = document.querySelector("div[id='noscript-copy']");

  const doc = document.createElement("div");
  doc.innerHTML = content!.innerHTML;
  const data = JSON.parse(doc.querySelector("div[id='metadata']")!.innerHTML);

  const photoURL = data.userInfo.photoURL || null;
  const displayName = data.userInfo.displayName;
  const createdAt = data.createdAt;
  const topics = data.topics;
  const supportURL = data.userInfo.supportURL || null;

  const originalSource = data.originalSource || null;
  const authorURL = data.userInfo.authorURL;
  const claims = data.claims;
  const title = data.title;

  return {
    photoURL,
    displayName,
    createdAt,
    supportURL,
    topics,
    originalSource,
    claims,
    title,
    authorURL,
    htmlContent: doc.querySelector("article")!.innerHTML,
  };
};
