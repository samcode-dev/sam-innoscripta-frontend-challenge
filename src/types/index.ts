export interface NewsSource {
  id: string;
  name: string;
}

export interface NewsArticle {
  id: string;
  source: NewsSource;
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  publishedAt: string;
  author?: string;
}

export interface NewsApiArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
}

export interface NYTArticle {
  uri: string;
  title: string;
  abstract: string;
  url: string;
  multimedia: Array<{
    url: string;
    format: string;
    height: number;
    width: number;
    type: string;
    subtype: string;
    caption: string;
    copyright: string;
  }>;
  published_date: string;
  byline: string;
}

export interface GuardianArticle {
  id: string;
  webTitle: string;
  webUrl: string;
  fields: {
    thumbnail: string;
  };
  webPublicationDate: string;
}