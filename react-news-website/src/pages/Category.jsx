import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getNewsByCategory } from '../services/newsApi';
import NewsCard from '../components/NewsCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { 
  Laptop, 
  Trophy, 
  Briefcase, 
  Film, 
  Heart, 
  Microscope,
  Tag 
} from 'lucide-react';

const categoryIcons = {
  technology: Laptop,
  sports: Trophy,
  business: Briefcase,
  entertainment: Film,
  health: Heart,
  science: Microscope,
};

const Category = () => {
  const { categoryName } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategoryNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getNewsByCategory(categoryName);
      setArticles(data.articles || []);
      
      // Save last selected category to localStorage
      localStorage.setItem('lastCategory', categoryName);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryName) {
      fetchCategoryNews();
    }
  }, [categoryName]);

  const IconComponent = categoryIcons[categoryName?.toLowerCase()] || Tag;

  if (loading) return <Loader />;

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchCategoryNews} />;
  }

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div className="page-title">
          <IconComponent size={32} />
          <h1 className="capitalize">{categoryName} News</h1>
        </div>
        <p className="page-description">
          Latest {categoryName} news and updates
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
            No {categoryName} articles available at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default Category;