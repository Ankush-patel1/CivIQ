import { useState, useEffect } from 'react';
import { ShieldCheck, Search, AlertTriangle, CheckCircle, XCircle, HelpCircle, Zap, TrendingUp, Calendar, Clock } from 'lucide-react';
import { auth } from '../firebaseConfig';

const MYTHS = [
  { text: "EVMs can be hacked via Bluetooth", category: "Technology" },
  { text: "You can vote twice if you have two IDs", category: "Process" },
  { text: "Ink on finger means you can't travel", category: "Myth" },
  { text: "NRIs can vote online from abroad", category: "Eligibility" },
];

function VerdictBadge({ text }) {
  const upper = text.toUpperCase();
  if (upper.includes('[TRUE]')) return (
    <div className="verdict-badge true">
      <CheckCircle size={15} /> VERIFIED TRUE
    </div>
  );
  if (upper.includes('[FALSE]')) return (
    <div className="verdict-badge false">
      <XCircle size={15} /> CONFIRMED FALSE
    </div>
  );
  if (upper.includes('[MISLEADING]')) return (
    <div className="verdict-badge misleading">
      <AlertTriangle size={15} /> MISLEADING
    </div>
  );
  return (
    <div className="verdict-badge unverified">
      <HelpCircle size={15} /> UNVERIFIED
    </div>
  );
}

export default function RumorMill({ currentTime }) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheck = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) {
        setError("You must be signed in to use Fact Check.");
        return;
      }
      const res = await fetch('/api/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          message: `FACT CHECK REQUEST: ${query}\n\nAs CivIQ, verify if this claim about Indian elections is true, false, or misleading. Provide evidence-based reasoning. Start your response with one of these words: [TRUE], [FALSE], [MISLEADING], or [UNVERIFIED].`,
          language: 'en'
        })
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || `Server error: ${res.status}`);
      }
      const data = await res.json();
      setResult(data.reply);
    } catch (err) {
      setError(err.message || "Failed to connect to the fact-check engine.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleCheck();
  };

  const getVerdictClass = (text) => {
    if (!text) return '';
    const upper = text.toUpperCase();
    if (upper.includes('[TRUE]')) return 'verdict-true';
    if (upper.includes('[FALSE]')) return 'verdict-false';
    if (upper.includes('[MISLEADING]')) return 'verdict-misleading';
    return 'verdict-unverified';
  };

  const verdictClass = getVerdictClass(result);

  return (
    <div className="page-container page-enter">
      {/* Header */}
      <header className="page-header text-center mb-12">
        <div className="inline-flex p-4 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 mb-5 shadow-lg shadow-indigo-500/10">
          <ShieldCheck size={36} className="text-indigo-400" />
        </div>
        <h1 className="page-title">Rumor Mill</h1>
        <p className="page-subtitle max-w-md mx-auto">
          Paste any election claim, news headline, or viral message. Our AI will fact-check it instantly.
        </p>
      </header>

      {/* Input Card */}
      <section className="card p-8 mb-8" aria-label="Fact Check Input">
        <label className="input-label block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3" htmlFor="claim-input">
          Claim to verify
        </label>
        <textarea
          id="claim-input"
          className="textarea-glass"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. EVMs can be hacked remotely via Bluetooth..."
          rows={4}
        />
        <div className="flex justify-between items-center mt-5">
          <span className="text-xs text-slate-500">Tip: Press Ctrl+Enter to check</span>
          <button
            onClick={handleCheck}
            disabled={loading || !query.trim()}
            className={`btn-primary !w-auto !px-8 flex items-center gap-2 ${loading ? 'loading' : ''}`}
          >
            {loading ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />
                Verifying...
              </>
            ) : (
              <><Search size={17} /> Fact Check</>
            )}
          </button>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <div className="error-box animate-fade-in" role="alert">
          <XCircle size={18} className="flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Result Card */}
      {result && (
        <article className={`verdict-card animate-fade-in ${result.toUpperCase().includes('[TRUE]') ? 'true' : result.toUpperCase().includes('[FALSE]') ? 'false' : result.toUpperCase().includes('[MISLEADING]') ? 'misleading' : 'unverified'}`}>
          <div className="flex justify-between items-center p-5 px-7 bg-black/20 border-b border-white/5 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <Zap size={18} className="text-indigo-400" />
              <span className="font-extrabold text-sm text-white">Fact Check Analysis</span>
            </div>
            <VerdictBadge text={result} />
          </div>
          <div className="p-7 text-slate-400 leading-relaxed text-sm">
            {result
              .replace(/\[(TRUE|FALSE|MISLEADING|UNVERIFIED)\]/gi, '')
              .trim()
              .split('\n')
              .filter(p => p.trim())
              .map((para, i) => (
                <p key={i} className="mb-3.5 last:mb-0">{para.trim()}</p>
              ))
            }
          </div>
        </article>
      )}

      {/* Common Myths Section */}
      <section className="mt-12">
        <div className="flex items-center gap-3 mb-5">
          <TrendingUp size={18} className="text-indigo-400" />
          <h2 className="text-lg font-extrabold text-white">Common Election Myths</h2>
        </div>
        <div className="action-grid">
          {MYTHS.map((myth, i) => (
            <button
              key={i}
              onClick={() => setQuery(myth.text)}
              className="card !p-5 flex items-start gap-4 text-left group"
            >
              <div className="p-2 bg-amber-500/10 rounded-xl shrink-0">
                <AlertTriangle size={14} className="text-amber-400" />
              </div>
              <div className="overflow-hidden">
                <h4 className="text-sm font-bold text-white mb-1.5 leading-snug group-hover:text-indigo-300 transition-colors">{myth.text}</h4>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{myth.category}</span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
