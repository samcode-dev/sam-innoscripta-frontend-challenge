import { Calendar, Search } from 'lucide-react';
import { useNewsStore } from '../hooks/useNewsStore';
import { useEffect, useState } from 'react';
import { fetchGuardianCategories, fetchNYTCategories } from '../lib/api';

export function NewsFilters() {
  const {
    filters,
    setQuery,
    setCategory,
    setDateRange,
    toggleSource,
    setAuthor,
    availableSources,
    guardianCategories,
    nytCategories,
    setGuardianCategories,
    setNYTCategories,
  } = useNewsStore();

  const [showAllCategories, setShowAllCategories] = useState(false);

  // Fetch Guardian and NYT categories on mount
  useEffect(() => {
    fetchGuardianCategories().then((categories) => setGuardianCategories(categories));
    fetchNYTCategories().then((categories) => setNYTCategories(categories));
  }, [setGuardianCategories, setNYTCategories]);

  // Combine all categories and remove duplicates
  const allCategories = [
    ...guardianCategories.map((cat) => ({ id: cat.id, name: cat.webTitle, source: 'guardian' })),
    ...nytCategories.map((cat) => ({ id: cat.section, name: cat.display_name, source: 'nyt' })),
    { id: 'business', name: 'Business', source: 'newsapi' },
    { id: 'entertainment', name: 'Entertainment', source: 'newsapi' },
    { id: 'general', name: 'General', source: 'newsapi' },
    { id: 'health', name: 'Health', source: 'newsapi' },
    { id: 'science', name: 'Science', source: 'newsapi' },
    { id: 'sports', name: 'Sports', source: 'newsapi' },
    { id: 'technology', name: 'Technology', source: 'newsapi' },
  ];

  // Remove duplicates by creating a Set of unique category names
  const uniqueCategories = Array.from(
    new Map(allCategories.map((cat) => [cat.name.toLowerCase(), cat])).values()
  );

  // Show only the first 30 categories initially
  const visibleCategories = showAllCategories ? uniqueCategories : uniqueCategories.slice(0, 30);

  // Toggle category selection
  const handleCategoryClick = (categoryId: string) => {
    if (filters.category === categoryId) {
      setCategory(undefined); // Unselect if the same category is clicked again
    } else {
      setCategory(categoryId); // Select the category
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      <div className="flex flex-col gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search news..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Author Filter */}
        <div className="relative">
          <input
            type="text"
            placeholder="Filter by author..."
            className="w-full pl-4 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.author || ''}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {visibleCategories.map((cat) => (
            <button
              key={`${cat.source}-${cat.id}`}
              className={`px-3 py-1 rounded-full text-sm ${
                filters.category === cat.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => handleCategoryClick(cat.id)}
            >
              {cat.name}
            </button>
          ))}
          {uniqueCategories.length > 30 && (
            <button
              className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
              onClick={() => setShowAllCategories(!showAllCategories)}
            >
              {showAllCategories ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>

        {/* Date Range */}
        <div className="flex gap-4 items-center">
          <Calendar className="text-gray-400 h-5 w-5" />
          <input
            type="date"
            className="border rounded-lg px-3 py-2"
            value={filters.fromDate || ''}
            onChange={(e) => setDateRange(e.target.value, filters.toDate)}
          />
          <span className="text-gray-400">to</span>
          <input
            type="date"
            className="border rounded-lg px-3 py-2"
            value={filters.toDate || ''}
            onChange={(e) => setDateRange(filters.fromDate, e.target.value)}
          />
        </div>

        {/* Sources */}
        <div className="flex flex-wrap gap-3">
          {availableSources.map((source) => (
            <label key={source.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.sources.includes(source.id)}
                onChange={() => toggleSource(source.id)}
                className="rounded text-blue-500 focus:ring-blue-500"
              />
              {source.name}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}