import { useState, useEffect } from 'react';
import { getTopHeadlines } from '../services/newsApi';
import NewsCard from '../components/NewsCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { TrendingUp } from 'lucide-react';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTopHeadlines = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTopHeadlines();
      setArticles(data.articles || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopHeadlines();
  }, []);

  if (loading) return <Loader />;

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchTopHeadlines} />;
  }

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="page-title">
          <TrendingUp size={32} />
          <h1>Top Headlines</h1>
        </div>
        <p className="page-description">
          Stay updated with the latest breaking news from around the world
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
          <p className="page-description">
            No articles available at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;