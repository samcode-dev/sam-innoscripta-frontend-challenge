import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NewsFilters } from './components/NewsFilters';
import { NewsFeed } from './components/NewsFeed';
import Header from './components/Header';
import Footer from './components/Footer';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 my-10 sm:px-6 lg:px-8 py-8">
          <NewsFilters />
          <NewsFeed />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;