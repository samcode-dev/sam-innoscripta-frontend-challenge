import { format } from 'date-fns';
import { ExternalLink } from 'lucide-react';
import type { NewsArticle } from '../types';

interface NewsCardProps {
  article: NewsArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
      {article.imageUrl && (
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blue-600">{article.source.name}</span>
          <time className="text-sm text-gray-500">
            {format(new Date(article.publishedAt), 'MMM d, yyyy')}
          </time>
        </div>
        <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
        {article.description && (
          <p className="text-gray-600 mb-4 line-clamp-3">{article.description}</p>
        )}
        <div className="mt-auto flex items-center justify-between">
          {article.author && (
            <span className="text-sm text-gray-500">By {article.author}</span>
          )}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-500 hover:text-blue-600"
          >
            Read more
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}