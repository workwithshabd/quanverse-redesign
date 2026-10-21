import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  ExternalLink, 
  ShieldCheck, 
  Search 
} from 'lucide-react';
import { api } from '../services/api';

export default function NewsCircularsSection() {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    api.getBoardNews().then(data => {
      setArticles(data);
    });
  }, []);

  const filtered = articles.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="news-section section-spacing" id="news">
      <div className="app-container">
        
        {/* Header with Search */}
        <div className="news-header-row gsap-reveal">
          <div>
            <div className="pill-badge pill-sage mb-2 gsap-float">
              <Bell size={13} />
              <span>Verified Circulars &amp; Directives</span>
            </div>
            <h2 className="section-title">
              Class 10 <span className="highlight-text">Board Exam Intelligence</span>
            </h2>
            <p className="section-subtitle">
              Official circulars from CBSE &amp; CISCE translated into actionable exam prep advice.
            </p>
          </div>

          <div className="news-search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search circulars, specimen papers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="news-search-input"
            />
          </div>
        </div>

        {/* News Cards Grid */}
        <div className="news-grid gsap-stagger-group">
          {filtered.map((item) => (
            <article key={item.id} className="news-card glass-panel gsap-stagger-item">
              <div className="news-card-top">
                <span className={`pill-badge pill-${item.badgeColor} news-cat-pill`}>
                  {item.category}
                </span>
                <span className="news-date">{item.date}</span>
              </div>

              <h3 className="news-title">{item.title}</h3>
              <p className="news-summary">{item.summary}</p>

              <div className="news-card-footer">
                <div className="source-pill">
                  <ShieldCheck size={13} className="text-emerald" />
                  <span>Source: {item.source}</span>
                </div>
                <button 
                  type="button" 
                  className="read-more-link"
                  onClick={() => alert(`Opening official notification summary for: ${item.title}`)}
                >
                  <span>Read Breakdown</span>
                  <ExternalLink size={12} />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>

      <style>{`
        .news-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: 2.75rem;
          flex-wrap: wrap;
        }

        .news-search-box {
          position: relative;
          width: 100%;
          max-width: 340px;
        }

        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-light);
        }

        .news-search-input {
          width: 100%;
          padding: 0.7rem 1rem 0.7rem 2.5rem;
          border-radius: var(--radius-full);
          border: 1.5px solid rgba(103, 192, 144, 0.4);
          background: #f2f5f0;
          font-size: 0.85rem;
        }

        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .news-card {
          padding: 1.75rem;
          border-radius: var(--radius-lg);
          background: #f2f5f0;
          display: flex;
          flex-direction: column;
          border: 1.5px solid rgba(103, 192, 144, 0.35);
          box-shadow: 0 10px 28px -6px rgba(18, 65, 112, 0.08);
          transition: all var(--transition-smooth);
        }

        .news-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px -8px rgba(18, 65, 112, 0.16);
          border-color: rgb(33, 91, 99);
          background: #f7faf5;
        }

        .news-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .news-date {
          font-size: 0.75rem;
          color: var(--text-light);
          font-weight: 500;
        }

        .news-title {
          font-size: 1.15rem;
          margin-bottom: 0.75rem;
          line-height: 1.35;
          color: var(--text-main);
        }

        .news-summary {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin-bottom: 1.5rem;
        }

        .news-card-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid var(--border-light);
        }

        .source-pill {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .read-more-link {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--brand-emerald);
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .read-more-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </section>
  );
}
