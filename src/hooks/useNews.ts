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
    ...(nytQuery.data || []), // NYT second
    ...(guardianQuery.data || []), // Guardian last
  ];

  // Filter by author locally
  if (filters.author) {
    articles = articles.filter((article) =>
      article.author?.toLowerCase().includes((filters.author ?? '').toLowerCase())
    );
  }

  // Filter NYT articles by date locally
  if (filters.fromDate || filters.toDate) {
    articles = articles.filter((article) => {
      const publishedAt = new Date(article.publishedAt);
      const fromDate = filters.fromDate ? new Date(filters.fromDate) : null;
      const toDate = filters.toDate ? new Date(filters.toDate) : null;

      return (
        (!fromDate || publishedAt >= fromDate) &&
        (!toDate || publishedAt <= toDate)
      );
    });
  }

  return {
    articles,
    isLoading,
  };
}