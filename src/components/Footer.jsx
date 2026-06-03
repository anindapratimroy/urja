import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="text-gradient">URJA</span> LAB
            </div>
            <p className="footer-tagline">
              Ultra Relativistic Jet-based Astronomy Laboratory
            </p>
            <div className="footer-address">
              <MapPin size={14} color="var(--accent-blue-light)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>
                POD 1E 402, Dept. of Astronomy, Astrophysics &amp; Space Engineering,
                IIT Indore, Simrol, Khandwa Road, Indore — 453552
              </span>
            </div>
          </div>

          <div className="footer-nav-group">
            <h5 className="footer-nav-title">Navigation</h5>
            <ul className="footer-nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/people">People</Link></li>
              <li><Link to="/publications">Publications</Link></li>
              <li><Link to="/opportunities">Opportunities</Link></li>
              <li><Link to="/collaborations">Collaborations</Link></li>
              <li><Link to="/pi">Principal Investigator</Link></li>
            </ul>
          </div>

          <div className="footer-nav-group">
            <h5 className="footer-nav-title">Institute</h5>
            <ul className="footer-nav-links">
              <li>
                <a href="https://www.iiti.ac.in/" target="_blank" rel="noopener noreferrer" className="footer-ext-link">
                  IIT Indore <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a href="https://astronomy.iiti.ac.in/" target="_blank" rel="noopener noreferrer" className="footer-ext-link">
                  DAASE Dept. <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a href="https://sites.google.com/iiti.ac.in/welcome/home" target="_blank" rel="noopener noreferrer" className="footer-ext-link">
                  PI's Website <ArrowUpRight size={12} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} URJA Lab, IIT Indore. All rights reserved.</p>
          <p className="footer-credit">
            Website created by{' '}
            <a
              href="https://www.linkedin.com/in/aninda-pratim-roy/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-credit-link"
            >
              Aninda Pratim Roy
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '4px', verticalAlign: 'middle' }}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </p>
        </div>
      </div>

      <style>{`
        .footer {
          background: rgba(5, 8, 22, 0.96);
          border-top: 1px solid var(--glass-border);
          padding: 3.5rem 0 0;
          margin-top: auto;
          position: relative;
          overflow: hidden;
        }
        /* Subtle top glow line */
        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 10%;
          right: 10%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.3), rgba(139, 92, 246, 0.2), transparent);
        }

        .footer-top {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr;
          gap: 3rem;
          padding-bottom: 2.5rem;
        }

        .footer-logo {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.85rem;
          letter-spacing: 0.02em;
        }
        .footer-tagline {
          font-size: 0.95rem;
          color: var(--text-muted);
          margin-bottom: 1.2rem;
          line-height: 1.5;
        }
        .footer-address {
          display: flex;
          gap: 0.6rem;
          align-items: flex-start;
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        .footer-nav-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-secondary);
          margin-bottom: 1.15rem;
        }
        .footer-nav-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
        }
        .footer-nav-links a {
          font-size: 0.95rem;
          color: var(--text-secondary);
          transition: color 0.25s ease, transform 0.25s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }
        .footer-nav-links a:hover {
          color: var(--accent-blue-light);
          transform: translateX(3px);
        }

        .footer-ext-link {
          display: inline-flex !important;
          align-items: center;
          gap: 0.3rem;
        }

        .footer-bottom {
          border-top: 1px solid var(--glass-border);
          padding: 1.5rem 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }
        .footer-bottom p {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 0;
        }

        .footer-credit {
          color: var(--text-muted) !important;
        }
        .footer-credit-link {
          color: var(--accent-blue-light) !important;
          font-weight: 600;
          transition: color 0.2s ease, text-shadow 0.2s ease;
          display: inline-flex;
          align-items: center;
        }
        .footer-credit-link:hover {
          color: var(--text-primary) !important;
          text-shadow: 0 0 12px rgba(96, 165, 250, 0.4);
        }

        @media (max-width: 768px) {
          .footer-top { grid-template-columns: 1fr; gap: 2rem; }
          .footer-bottom { flex-direction: column; text-align: center; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
