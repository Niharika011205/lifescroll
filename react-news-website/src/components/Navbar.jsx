import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Search, Menu, X, Newspaper } from 'lucide-react';

const categories = [
  'Technology',
  'Sports', 
  'Business',
  'Entertainment',
  'Health',
  'Science'
];

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  return (
    <nav>
      <div className="container">
        <div className="nav-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <Newspaper size={32} />
            <span>NewsHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="nav-links">
            <Link to="/">Home</Link>
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase()}`}
              >
                {category}
              </Link>
            ))}
          </div>

          {/* Search and Theme Toggle */}
          <div className="nav-actions">
            {/* Desktop Search */}
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </form>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="theme-toggle"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="menu-toggle"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          {/* Mobile Search */}
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              style={{ width: '100%', marginBottom: '1rem' }}
            />
          </form>

          {/* Mobile Navigation Links */}
          <div>
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;