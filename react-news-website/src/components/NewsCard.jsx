import { ExternalLink, Calendar, User } from 'lucide-react';

const NewsCard = ({ article }) => {
  const {
    title,
    description,
    urlToImage,
    url,
    publishedAt,
    source,
    author
  } = article;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleReadMore = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <article className="news-card">
      {/* Image */}
      <div className="card-image">
        {urlToImage ? (
          <img
            src={urlToImage}
            alt={title}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div 
          className={`card-image-placeholder ${urlToImage ? 'hidden' : ''}`}
        >
          <span>No Image Available</span>
        </div>
      </div>

      {/* Content */}
      <div className="card-content">
        {/* Source and Date */}
        <div className="card-meta">
          <span className="source-name">{source?.name || 'Unknown Source'}</span>
          <div className="date-info">
            <Calendar size={16} />
            <span>{formatDate(publishedAt)}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="card-title">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="card-description">
            {description}
          </p>
        )}

        {/* Author */}
        {author && (
          <div className="card-author">
            <User size={16} />
            <span>By {author}</span>
          </div>
        )}

        {/* Read More Button */}
        <button
          onClick={handleReadMore}
          className="read-more-btn"
        >
          <span>Read More</span>
          <ExternalLink size={16} />
        </button>
      </div>
    </article>
  );
};

export default NewsCard;