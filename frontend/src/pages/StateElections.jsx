import { useState, useEffect } from 'react';
import { MapPin, Calendar, Info, AlertCircle, Check, Bell, ArrowRight } from 'lucide-react';
import { fetchStateElections } from '../data/electionData';
import { db } from '../firebaseConfig';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { getElectionStatus } from '../utils/dateUtils';
import LiveStatusPill from '../components/LiveStatusPill';

export default function StateElections({ user, currentTime }) {
  const [reminders, setReminders] = useState(user?.reminders || []);
  const [elections, setElections] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [loadingState, setLoadingState] = useState(null);

  useEffect(() => {
    async function loadElections() {
      const data = await fetchStateElections();
      setElections(data);
      setDataLoading(false);
    }
    loadElections();
  }, []);

  const getDynamicStatus = (election) => getElectionStatus(election, currentTime);

  const toggleReminder = async (stateId) => {
    if (!user) return;
    setLoadingState(stateId);
    try {
      const userRef = doc(db, "users", user.uid);
      const isSet = reminders.includes(stateId);
      
      if (isSet) {
        await updateDoc(userRef, {
          reminders: arrayRemove(stateId)
        });
        setReminders(prev => prev.filter(id => id !== stateId));
      } else {
        await updateDoc(userRef, {
          reminders: arrayUnion(stateId)
        });
        setReminders(prev => [...prev, stateId]);
      }
    } catch (err) {
      console.error("Failed to set reminder", err);
    } finally {
      setLoadingState(null);
    }
  };

  return (
    <div className="animate-fade-up">
      <div className="state-elections-header">
        <h1 className="state-elections-title">
          State <span>Elections</span>
        </h1>
        <p className="state-elections-subtitle">Track upcoming and planned assembly elections across India.</p>
        
        <LiveStatusPill currentTime={currentTime} className="mt-4" />
      </div>

      {dataLoading ? (
        <div className="loading-text-centered">Loading election data...</div>
      ) : (
        <div className="elections-grid">
          {elections.map((election, idx) => {
            const stateName = election.state || 'Unknown';
            const statusStr = getDynamicStatus(election);
            const yearStr = election.year || (election.expectedDate?.match(/\d{4}/)?.[0]) || 'Upcoming';
            const monthStr = election.month || (election.expectedDate?.replace(/\d{4}/, '').trim()) || 'TBD';
            const seatsNum = election.seats || election.totalSeats || '?';
            const phasesStr = election.phases || 1;
            const keyIssues = election.keyIssues || [];
            const isReminded = reminders.includes(stateName);
            const updateStr = election.update || election.currentGovernment ? `Ruling: ${election.currentGovernment || 'N/A'}` : "Stay tuned for updates.";

            return (
              <div key={idx} className={`card-glass group transition-all duration-300 election-card ${statusStr === 'Ongoing' ? 'border-orange-500/50 shadow-lg shadow-orange-500/10' : 'hover:border-indigo-500/30'}`}>
                <div className="election-card-header">
                  <div className="state-info">
                    <div className="state-name-group">
                      <MapPin size={16} className="text-indigo-400" />
                      <h3 className="state-name">{stateName}</h3>
                    </div>
                    <div className="status-group">
                      <span className={`badge ${statusStr === 'Upcoming' ? 'badge-active' : statusStr === 'Ongoing' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'badge-locked'}`}>
                        {statusStr === 'Ongoing' && <span className="live-indicator" />}
                        {statusStr}
                      </span>
                      <span className="year-text">{yearStr}</span>
                    </div>
                  </div>
                  <div className="seats-badge">
                    <span className="seats-label">Seats</span>
                    <span className="seats-count">{seatsNum}</span>
                  </div>
                </div>

                <div className="election-details-grid">
                  <div className="detail-item">
                    <div className="detail-label-group">
                      <Calendar size={14} />
                      <span className="detail-label">Month</span>
                    </div>
                    <p className="detail-value">{monthStr}</p>
                  </div>
                  <div className="detail-item">
                    <div className="detail-label-group">
                      <Info size={14} />
                      <span className="detail-label">Phases</span>
                    </div>
                    <p className="detail-value">{phasesStr} Phases</p>
                  </div>
                </div>

                <div className="key-issues-section">
                  <span className="section-label">Key Issues</span>
                  <div className="issues-tags">
                    {keyIssues.map(issue => (
                      <span key={issue} className="issue-tag">
                        {issue}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="latest-update-box">
                  <div className="update-label-group">
                    <AlertCircle size={14} className="text-blue-400" />
                    <span className="update-label">Latest Update</span>
                  </div>
                  <p className="update-text">{updateStr}</p>
                </div>

                <div className="election-card-actions">
                  <button 
                    onClick={() => toggleReminder(stateName)}
                    disabled={loadingState === stateName || statusStr !== 'Upcoming'}
                    className={`btn-glass reminder-btn ${isReminded ? 'is-reminded' : ''}`} 
                  >
                    {isReminded ? <><Check size={16} /> Reminded</> : <><Bell size={16} /> Notify Me</>}
                  </button>
                  <button 
                    className="btn-primary action-arrow-btn" 
                    onClick={() => window.open(`https://news.google.com/search?q=${stateName}+elections+${yearStr}`)}
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
