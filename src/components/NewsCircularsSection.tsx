import React, { useState, useEffect } from 'react';
import { 
  ExternalLink, 
  ShieldCheck, 
  Search 
} from 'lucide-react';
import { api } from '../services/api';

interface BoardNewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  source: string;
  badgeColor?: string;
}

export default function NewsCircularsSection() {
  const [articles, setArticles] = useState<BoardNewsItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    api.getBoardNews().then(data => {
      setArticles(data as BoardNewsItem[]);
    });
  }, []);

  const filtered = articles.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="relative py-12 md:py-16 bg-transparent" id="news">
      <div className="app-container">
        
        {/* Header with Search */}
        <div className="mb-8 md:mb-10">
          <div className="font-mono text-xs text-muted mb-2">
            <span className="text-[#43C98B] font-bold">BOARD INTELLIGENCE</span>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="title-with-flourish">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#E8EEE9]">
                Verified Directives &amp; Specimen Blueprint Alerts
              </h2>
            </div>

            <div className="relative flex items-center w-full max-w-[300px]">
              <Search size={14} className="absolute left-2.5 text-[#8F9D93] pointer-events-none" />
              <input
                type="text"
                placeholder="Search circulars, blueprints..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-7 py-1.5 bg-[#0B241A]/50 border border-[#bedcc8]/15 rounded text-xs text-[#F1F5F2] font-mono outline-none focus:border-[#D5F36A] transition-colors"
              />
              <span className="absolute right-2.5 font-mono text-xs text-[#8F9D93] pointer-events-none">/</span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#8F9D93] max-w-[600px] leading-relaxed mt-2">
            Official CBSE and CISCE notifications decoded into marking blueprints.
          </p>
        </div>

        {/* Master Editorial News Grid */}
        <div className="relative border border-[#bedcc8]/15 bg-[#07110D]/45 backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {filtered.map((item) => (
              <article
                key={item.id}
                className="p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#bedcc8]/15 last:border-r-0 last:border-b-0 bg-[#07110D]/40"
              >
                <div>
                  <div className="flex justify-between items-center font-mono text-xs mb-2.5">
                    <span className="text-[#43C98B] font-semibold">[{item.category.toUpperCase()}]</span>
                    <span className="text-[#8F9D93]">{item.date}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-[#F1F5F2] leading-snug mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#B5C0B8] leading-relaxed mb-6">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-dashed border-[#bedcc8]/10 font-mono text-xs flex flex-wrap items-center justify-between gap-2 mt-auto">
                  <div className="flex items-center gap-1.5 text-[#8F9D93]">
                    <ShieldCheck size={13} className="text-[#43C98B]" />
                    <span>SRC: {item.source}</span>
                  </div>
                  <button 
                    type="button" 
                    className="text-[#D5F36A] hover:text-[#e4f88b] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
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
    </section>
  );
}
