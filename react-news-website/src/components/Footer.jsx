import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          {/* Copyright */}
          <div className="footer-copyright">
            <span>© {currentYear} NewsHub. Made with</span>
            <Heart size={16} style={{ color: '#ef4444' }} />
            <span>by Developer</span>
          </div>

          {/* Social Links */}
          <div className="footer-social">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Additional Info */}
        <div className="footer-info">
          <p>Powered by NewsAPI • Built with React & Custom CSS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;