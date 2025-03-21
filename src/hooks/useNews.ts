import { useQuery } from '@tanstack/react-query';
import { useNewsStore } from './useNewsStore';
import type { NewsArticle } from '../types';
import { fetchGuardianArticles, fetchNewsApiArticles, fetchNYTArticles } from '../lib/api';

export function useNews() {
  const { filters } = useNewsStore();

  const newsApiQuery = useQuery({
    queryKey: ['newsapi', filters],
    queryFn: () => fetchNewsApiArticles(filters.query, filters.category, filters.fromDate, filters.toDate),
    enabled: filters.sources.includes('newsapi'),
  });

  const nytQuery = useQuery({
    queryKey: ['nyt', filters],
    queryFn: () => fetchNYTArticles(filters.category),
    enabled: filters.sources.includes('nyt'),
  });

  const guardianQuery = useQuery({
    queryKey: ['guardian', filters],
    queryFn: () => fetchGuardianArticles(filters.query, filters.category, filters.fromDate, filters.toDate),
    enabled: filters.sources.includes('guardian'),
  });

  const isLoading = newsApiQuery.isLoading || nytQuery.isLoading || guardianQuery.isLoading;

  let articles: NewsArticle[] = [
    ...(newsApiQuery.data || []), // NewsAPI first
    ...(nytQuery.data || []), // New York Times second
    ...(guardianQuery.data || []), // The Guardian last
  ];

  // Filter by author locally
  if (filters.author) {
    articles = articles.filter((article) =>
      article.author?.toLowerCase().includes((filters.author ?? '').toLowerCase())
    );
  }

  return {
    articles,
    isLoading,
  };
}