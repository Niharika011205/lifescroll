import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { searchNews } from '../services/newsApi';
import NewsCard from '../components/NewsCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  const { query } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchNews(query);
      setArticles(data.articles || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  if (loading) return <Loader />;

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchSearchResults} />;
  }

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="page-title">
          <SearchIcon size={32} />
          <h1>Search Results</h1>
        </div>
        <p className="page-description">
          Results for "{decodeURIComponent(query)}" • {articles.length} articles found
        </p>
      </div>

      {/* Articles Grid */}
      {articles.length > 0 ? (
        <div className="news-grid">
          {articles.map((article, index) => (
            <NewsCard key={`${article.url}-${index}`} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center" style={{ padding: '3rem 0' }}>
          <SearchIcon size={64} style={{ color: '#9ca3af', margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            No results found
          </h3>
          <p className="page-description">
            Try searching with different keywords or check your spelling.
          </p>
        </div>
      )}
    </div>
  );
};

export default Search;