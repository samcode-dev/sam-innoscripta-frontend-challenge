import { Calendar, Search } from 'lucide-react';
import { useNewsStore } from '../hooks/useNewsStore';

const categories = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
];

export function NewsFilters() {
  const { filters, setQuery, setCategory, setDateRange, toggleSource, setAuthor, availableSources } = useNewsStore();

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
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-3 py-1 rounded-full text-sm ${
                filters.category === cat
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setCategory(filters.category === cat ? undefined : cat)}
            >
              {cat}
            </button>
          ))}
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