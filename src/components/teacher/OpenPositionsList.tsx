import { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, ArrowRight, Filter } from 'lucide-react';
import { api } from '../../services/api';

export interface OpenPositionsListProps {
  onApplyRole: (roleTitle: string) => void;
}

export default function OpenPositionsList({ onApplyRole }: OpenPositionsListProps) {
  const [positions, setPositions] = useState<any[]>([]);
  const [activeDept, setActiveDept] = useState<string>('All');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadPositions() {
      try {
        const data = await api.getOpenPositions();
        setPositions(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadPositions();
  }, []);

  const departments = ['All', 'Academics & Content', 'AI & Educational Research', 'Institutional Growth'];

  const filteredPositions = activeDept === 'All'
    ? positions
    : positions.filter(p => p.department === activeDept);

  return (
    <div className="mt-14" id="open-roles">
      <div className="flex flex-col items-center text-center mb-10">
        <div className="max-w-2xl mb-6">
          <h3 className="font-serif text-3xl font-bold text-white mb-2">Current Academic &amp; Strategic Openings</h3>
          <p className="text-sm text-[#748d78]">
            Whether you want flexible per-paper authoring or a dedicated leadership position, shape how millions of board candidates prepare.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap justify-center bg-[#0c1c15] border border-[#276447]/40 px-3 py-1.5 rounded-full shadow-md">
          <div className="flex items-center gap-1.5 text-xs text-[#748d78] mr-1">
            <Filter size={14} />
            <span>Department:</span>
          </div>
          {departments.map((dept) => (
            <button
              key={dept}
              type="button"
              className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${activeDept === dept ? 'bg-[#43c98b] text-[#07110d] font-bold shadow-sm' : 'text-[#b5c0b8] hover:text-white'}`}
              onClick={() => setActiveDept(dept)}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Positions Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center gap-2 py-12 text-sm text-[#748d78]">
          <div className="w-5 h-5 rounded-full border-2 border-t-[#43c98b] border-r-transparent border-b-[#43c98b] border-l-transparent animate-spin"></div>
          <span>Loading open career roles...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPositions.map((job) => (
            <div key={job.id} className="bg-[#0c1c15] border border-[#276447]/40 hover:border-[#43c98b]/60 rounded-2xl p-6 shadow-lg flex flex-col justify-between transition-all">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#d5f36a] bg-[#163a2a] px-2 py-0.5 rounded border border-[#276447]/40">{job.badge}</span>
                  <span className="text-[#748d78] text-[11px]">{job.department}</span>
                </div>

                <h4 className="font-serif text-lg font-bold text-white">{job.title}</h4>
                <p className="text-xs text-[#b5c0b8] leading-relaxed">{job.description}</p>

                <div className="flex items-center gap-2 flex-wrap text-xs text-[#748d78] py-2 border-y border-[#276447]/20">
                  <div className="flex items-center gap-1">
                    <MapPin size={13} className="text-[#43c98b]" />
                    <span>{job.location}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock size={13} className="text-[#43c98b]" />
                    <span>{job.type}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Briefcase size={13} className="text-[#43c98b]" />
                    <span>{job.experience}</span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between text-xs py-1">
                  <span className="text-[#748d78]">Compensation:</span>
                  <strong className="font-mono text-[#d5f36a]">{job.compensation}</strong>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  className="btn btn-primary w-full py-3 px-5 flex items-center justify-center gap-2 text-xs font-bold cursor-pointer"
                  onClick={() => onApplyRole(job.title)}
                >
                  <span className="button__flair" aria-hidden="true" />
                  <span>Apply for this Role</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
