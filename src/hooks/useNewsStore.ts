import { create } from 'zustand';
import { NewsSource, GuardianCategory, NYTCategory } from '../types';

interface NewsFilters {
  query: string;
  category?: string;
  fromDate?: string;
  toDate?: string;
  sources: string[];
  author?: string;
}

interface NewsStore {
  filters: NewsFilters;
  setQuery: (query: string) => void;
  setCategory: (category?: string) => void;
  setDateRange: (fromDate?: string, toDate?: string) => void;
  toggleSource: (sourceId: string) => void;
  setAuthor: (author?: string) => void;
  availableSources: NewsSource[];
  guardianCategories: GuardianCategory[];
  nytCategories: NYTCategory[];
  setGuardianCategories: (categories: GuardianCategory[]) => void;
  setNYTCategories: (categories: NYTCategory[]) => void;
}

export const useNewsStore = create<NewsStore>((set) => ({
  filters: {
    query: '',
    sources: ['newsapi', 'nyt', 'guardian'],
  },
  availableSources: [
    { id: 'newsapi', name: 'News API' },
    { id: 'nyt', name: 'New York Times' },
    { id: 'guardian', name: 'The Guardian' },
  ],
  guardianCategories: [],
  nytCategories: [],
  setQuery: (query) =>
    set((state) => ({
      filters: { ...state.filters, query },
    })),
  setCategory: (category) =>
    set((state) => ({
      filters: { ...state.filters, category },
    })),
  setDateRange: (fromDate, toDate) =>
    set((state) => ({
      filters: { ...state.filters, fromDate, toDate },
    })),
  toggleSource: (sourceId) =>
    set((state) => {
      const sources = state.filters.sources.includes(sourceId)
        ? state.filters.sources.filter((id) => id !== sourceId)
        : [...state.filters.sources, sourceId];
      return {
        filters: { ...state.filters, sources },
      };
    }),
  setAuthor: (author) =>
    set((state) => ({
      filters: { ...state.filters, author },
    })),
  setGuardianCategories: (categories) =>
    set(() => ({
      guardianCategories: categories,
    })),
  setNYTCategories: (categories) =>
    set(() => ({
      nytCategories: categories,
    })),
}));