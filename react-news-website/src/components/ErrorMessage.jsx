import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-container">
      <div className="error-box">
        <AlertCircle size={48} style={{ color: '#dc2626', margin: '0 auto 1rem' }} />
        <h3 className="error-title">
          Oops! Something went wrong
        </h3>
        <p className="error-message">
          {message || 'Failed to load news. Please try again.'}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="retry-btn"
          >
            <RefreshCw size={16} />
            <span>Try Again</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;