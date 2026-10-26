import React, { useState, useEffect } from 'react';
import { 
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
    <section className="editorial-news-section" id="news">
      <div className="app-container">
        
        {/* Header with Search */}
        <div className="editorial-section-header">
          <div className="header-meta-row font-mono text-xs text-muted mb-2">
            <span className="text-accent-emerald font-bold">BOARD INTELLIGENCE</span>
          </div>

          <div className="news-header-flex">
            <div className="title-with-flourish">
              <h2 className="section-title text-main">
                Verified Directives &amp; Specimen Blueprint Alerts
              </h2>
            </div>

            <div className="news-search-box">
              <Search size={14} className="search-icon text-muted" />
              <input
                type="text"
                placeholder="Search circulars, blueprints..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="news-search-input font-mono text-xs"
              />
              <span className="search-shortcut font-mono text-muted">/</span>
            </div>
          </div>

          <p className="section-subtitle">
            Official CBSE and CISCE notifications decoded into marking blueprints.
          </p>
        </div>

        {/* Master Editorial News Grid */}
        <div className="editorial-news-grid">

          <div className="news-grid-columns">
            {filtered.map((item) => (
              <article key={item.id} className="news-grid-col">
                <div className="news-col-top font-mono text-xs mb-3">
                  <span className="text-accent-emerald font-semibold">[{item.category.toUpperCase()}]</span>
                  <span className="text-muted">{item.date}</span>
                </div>

                <h3 className="news-col-title text-main mb-2">
                  {item.title}
                </h3>

                <p className="news-col-summary text-muted mb-6 leading-relaxed">
                  {item.summary}
                </p>

                <div className="news-col-footer font-mono text-xs mt-auto">
                  <div className="source-meta flex items-center gap-1.5 text-muted">
                    <ShieldCheck size={13} className="text-accent-emerald" />
                    <span>SRC: {item.source}</span>
                  </div>
                  <button 
                    type="button" 
                    className="read-more-link text-accent-lime font-mono font-semibold flex items-center gap-1 hover:text-accent-lime-hover"
                    onClick={() => alert(`Official notification summary for: ${item.title}`)}
                  >
                    <span>DECODED RUBRIC</span>
                    <ExternalLink size={11} />
                  </button>
                </div>
              </article>
            ))}
          </div>

        </div>

      </div>

      <style>{`
        .editorial-news-section {
          position: relative;
          padding: clamp(3rem, 5.5vw, 4.5rem) 0;
          background: transparent;
        }

        .editorial-news-section .editorial-section-header {
          margin-bottom: clamp(1.75rem, 2.8vw, 2.5rem);
        }

        .news-header-flex {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .news-search-box {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          max-width: 300px;
        }

        .search-icon {
          position: absolute;
          left: 10px;
          pointer-events: none;
        }

        .news-search-input {
          width: 100%;
          padding: 0.45rem 1.8rem 0.45rem 2rem;
          background: rgba(11, 36, 26, 0.5);
          border: 1px solid rgba(190, 220, 200, 0.14);
          border-radius: 4px;
          color: #F1F5F2;
          font-size: 0.8rem;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .news-search-input:focus {
          border-color: var(--color-lime);
        }

        .search-shortcut {
          position: absolute;
          right: 10px;
          font-size: 0.7rem;
          pointer-events: none;
        }

        /* Master Editorial News Grid */
        .editorial-news-grid {
          position: relative;
          border: 1px solid rgba(190, 220, 200, 0.16);
          background: rgba(7, 17, 13, 0.45);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .news-grid-columns {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        .news-grid-col {
          padding: clamp(1.4rem, 2.4vw, 1.95rem);
          border-right: 1px solid rgba(190, 220, 200, 0.14);
          display: flex;
          flex-direction: column;
          background: rgba(7, 17, 13, 0.4);
        }

        .news-grid-col:last-child {
          border-right: none;
        }

        .news-col-top {
          min-height: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.35rem;
        }

        .news-col-title {
          min-height: auto;
          display: flex;
          align-items: flex-start;
          line-height: 1.3;
          margin-bottom: 0.35rem;
          font-size: 1.05rem;
          font-weight: 600;
          color: #F1F5F2;
        }

        .news-col-summary {
          flex: 1;
          margin-bottom: 0.65rem;
          font-size: 0.84rem;
          line-height: 1.5;
          color: #B5C0B8;
        }

        .news-col-footer {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.55rem;
          border-top: 1px dashed rgba(190, 220, 200, 0.1);
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        @media (max-width: 900px) {
          .news-grid-columns {
            grid-template-columns: 1fr;
          }

          .news-grid-col {
            border-right: none;
            border-bottom: 1px solid rgba(190, 220, 200, 0.14);
          }
        }
      `}</style>
    </section>
  );
}
