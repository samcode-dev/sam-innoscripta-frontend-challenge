import axios from 'axios';
import type { NewsArticle, NewsApiArticle, NYTArticle, GuardianArticle, GuardianCategory, NYTCategory } from '../types';

const NEWS_API_KEY = 'a3906f4f790f4f2b8c917eb2f3a5621d';
const NYT_API_KEY = 'uvXeQ3yYDdhDsKcSfRWkUAtOHN6tIVYe';
const GUARDIAN_API_KEY = '4046aeeb-f1f2-4cd6-b463-b799546cbb77';

// NewsAPI
const newsApiClient = axios.create({
  baseURL: 'https://newsapi.org/v2',
  headers: {
    Authorization: NEWS_API_KEY,
  },
});

// NYT API
const nytClient = axios.create({
  baseURL: 'https://api.nytimes.com/svc/news/v3',
});

// Guardian API
const guardianClient = axios.create({
  baseURL: 'https://content.guardianapis.com',
});

const DEFAULT_IMAGE_URL = 'https://via.placeholder.com/400x200?text=No+Image+Available';

// Fetch Guardian categories
export const fetchGuardianCategories = async (): Promise<GuardianCategory[]> => {
  const response = await guardianClient.get<{ response: { results: GuardianCategory[] } }>('/sections', {
    params: {
      'api-key': GUARDIAN_API_KEY,
    },
  });
  return response.data.response.results;
};

// Fetch NYT categories
export const fetchNYTCategories = async (): Promise<NYTCategory[]> => {
  const response = await nytClient.get<{ results: NYTCategory[] }>('/content/section-list.json', {
    params: {
      'api-key': NYT_API_KEY,
    },
  });
  return response.data.results;
};

// Fetch NewsAPI articles
export const fetchNewsApiArticles = async (
  query?: string,
  category?: string,
  from?: string,
  to?: string,
  author?: string
): Promise<NewsArticle[]> => {
  const params: Record<string, string> = {};

  if (query) params.q = query;
  if (category) params.category = category;
  if (from) params.from = from;
  if (to) params.to = to;
  if (author) params.author = author;

  // Use /everything for search queries, /top-headlines for categories or default
  const endpoint = query ? '/everything' : '/top-headlines';

  // Add country=us only for /top-headlines (default or category selection)
  if (!query && endpoint === '/top-headlines') {
    params.country = 'us';
  }

  const response = await newsApiClient.get<{ articles: NewsApiArticle[] }>(endpoint, {
    params: {
      ...params,
      pageSize: 20,
    },
  });

  return response.data.articles.map((article) => ({
    id: article.url,
    source: { id: article.source.id || 'unknown', name: article.source.name },
    title: article.title,
    description: article.description,
    url: article.url,
    imageUrl: article.urlToImage || DEFAULT_IMAGE_URL,
    publishedAt: article.publishedAt,
    author: article.author || undefined,
  }));
};

// Fetch NYT articles
export const fetchNYTArticles = async (section = 'all'): Promise<NewsArticle[]> => {
  const response = await nytClient.get<{ results: NYTArticle[] }>(`/content/all/${section}.json`, {
    params: {
      'api-key': NYT_API_KEY,
    },
  });

  return response.data.results
    .filter((article) => article.title && article.abstract)
    .map((article) => ({
      id: article.uri,
      source: { id: 'nyt', name: 'New York Times' },
      title: article.title,
      description: article.abstract,
      url: article.url,
      imageUrl: article.multimedia?.[0]?.url || DEFAULT_IMAGE_URL,
      publishedAt: article.published_date,
      author: article.byline?.replace(/^By /, '') || undefined,
    }));
};

// Fetch Guardian articles
export const fetchGuardianArticles = async (
  query?: string,
  section?: string,
  from?: string,
  to?: string,
  author?: string
): Promise<NewsArticle[]> => {
  const params: Record<string, string> = {
    'api-key': GUARDIAN_API_KEY,
    'show-fields': 'thumbnail',
  };

  if (query) params.q = query;
  if (section) params.section = section;
  if (from) params['from-date'] = from;
  if (to) params['to-date'] = to;
  if (author) params['author'] = author;

  const response = await guardianClient.get<{ response: { results: GuardianArticle[] } }>('/search', { params });

  return response.data.response.results.map((article) => ({
    id: article.id,
    source: { id: 'guardian', name: 'The Guardian' },
    title: article.webTitle,
    description: '',
    url: article.webUrl,
    imageUrl: article.fields?.thumbnail || DEFAULT_IMAGE_URL,
    publishedAt: article.webPublicationDate,
  }));
};