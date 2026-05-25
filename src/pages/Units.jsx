import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UnitAccordion from '../components/UnitAccordion';
import { 
  FaGraduationCap, FaDownload, FaBookOpen, FaTrophy, 
  FaUserCircle, FaSignOutAlt, FaTimes, FaEnvelope, FaClock, 
  FaCheckCircle, FaUserShield 
} from 'react-icons/fa';

const Units = () => {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedIds, setCompletedIds] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [stats, setStats] = useState({ progress: 0, total: 0, time: 0 });
  const [showProfile, setShowProfile] = useState(false);
  
  const userEmail = localStorage.getItem('userEmail');
  const userRole = localStorage.getItem('userRole'); // Admin check ke liye
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    const timer = setInterval(trackTime, 60000);
    return () => clearInterval(timer);
  }, []);

  const fetchData = async () => {
    if (!userEmail) { navigate('/'); return; }
    try {
      setLoading(true);
      const [unitRes, leaderRes, userRes] = await Promise.all([
        axios.get('https://brain-center-backend-sahk.onrender.com/api/units'),
        axios.get('https://brain-center-backend-sahk.onrender.com/api/auth/leaderboard'),
        axios.get(`https://brain-center-backend-sahk.onrender.com/api/auth/user-stats?email=${userEmail}`)
      ]);
      
      setUnits(unitRes.data || []);
      setLeaderboard(leaderRes.data || []);
      setCompletedIds(userRes.data.completedResources || []);
      
      const totalRes = (unitRes.data || []).reduce((acc, u) => acc + (u.resources?.length || 0), 0);
      setStats({ 
        time: userRes.data.totalTimeSpent || 0,
        total: totalRes,
        progress: totalRes > 0 ? Math.round((userRes.data.completedResources?.length / totalRes) * 100) : 0
      });
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const trackTime = () => {
    if(userEmail) {
      axios.post('https://brain-center-backend-sahk.onrender.com/api/auth/update-time', { email: userEmail, minutes: 1 });
      setStats(prev => ({ ...prev, time: prev.time + 1 }));
    }
  };

  const handleResourceClick = async (url) => {
    if (!completedIds.includes(url)) {
      const newCompleted = [...completedIds, url];
      setCompletedIds(newCompleted);
      const newProgress = stats.total > 0 ? Math.round((newCompleted.length / stats.total) * 100) : 0;
      setStats(prev => ({ ...prev, progress: newProgress }));
      await axios.post('https://brain-center-backend-sahk.onrender.com/api/auth/update-progress', { email: userEmail, resourceUrl: url });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans">
      
      {/* --- HEADER --- */}
      <nav className="sticky top-0 z-[100] bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4 shadow-sm">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <FaGraduationCap size={22} />
            </div>
            <span className="text-2xl font-black text-indigo-600 italic tracking-tighter">ICTPET</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Admin Panel Button */}
            {userRole === 'admin' && (
              <button 
                onClick={() => navigate('/admin')}
                className="flex items-center gap-2 px-3 py-2 bg-amber-50 text-amber-600 rounded-full font-black text-[10px] uppercase border border-amber-100 hover:bg-amber-100 transition-all"
              >
                <FaUserShield /> <span className="hidden md:inline">Admin</span>
              </button>
            )}

            <a href="/Syllabus.pdf" download className="flex items-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-full font-black text-[10px] uppercase border border-slate-200">
              <FaDownload /> <span className="hidden md:inline">Syllabus</span>
            </a>

            <button onClick={() => setShowProfile(true)} className="flex items-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-full font-black text-[10px] uppercase border border-indigo-100">
              <FaUserCircle /> <span>Profile</span>
            </button>

            <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 bg-rose-50 text-rose-500 rounded-full font-black text-[10px] uppercase border border-rose-100">
              <FaSignOutAlt /> <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-[1400px] mx-auto px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-6">
            {/* Progress Card */}
            <div className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-white">
               <div className="space-y-6">
                  <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase">
                    <span>Mastery</span> <span className="text-indigo-600">{stats.progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 transition-all duration-700" style={{width: `${stats.progress}%`}}></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl text-center">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Study Time</p>
                      <p className="text-sm font-black">{stats.time}m</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl text-center">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Tasks</p>
                      <p className="text-sm font-black">{completedIds.length}</p>
                    </div>
                  </div>
               </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white">
              <h3 className="text-lg font-black mb-6 flex items-center gap-2"><FaTrophy className="text-amber-400" /> Leaderboard</h3>
              <div className="space-y-3">
                {leaderboard.map((user, i) => (
                  <div key={i} className={`flex justify-between items-center p-3 rounded-2xl ${user.email === userEmail ? 'bg-indigo-600' : 'bg-white/5'}`}>
                    <span className="text-xs font-bold truncate w-24 uppercase">{user.email.split('@')[0]}</span>
                    <span className="px-3 py-1 bg-amber-400 text-amber-900 rounded-full text-[9px] font-black">{user.completedResources?.length || 0}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Units */}
          <div className="lg:col-span-8 space-y-4">
             <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3 px-2">
               <FaBookOpen className="text-indigo-600" /> વાલીશિક્ષણ કાર્યક્રમ
             </h2>
             {loading ? <div className="p-20 text-center font-bold text-slate-300">Syncing...</div> : 
               units.map((unit) => (
                 <UnitAccordion key={unit._id} unit={unit} completedIds={completedIds} onResourceClick={handleResourceClick} />
               ))
             }
          </div>
        </div>
      </div>

      {/* --- PROFILE MODAL --- */}
      {showProfile && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[3rem] w-full max-w-md overflow-hidden shadow-2xl">
            <div className="h-32 bg-gradient-to-r from-indigo-600 to-violet-600 relative">
              <button onClick={() => setShowProfile(false)} className="absolute top-6 right-6 text-white"><FaTimes /></button>
              <div className="absolute -bottom-8 left-8 w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center text-indigo-600 border-4 border-white">
                <FaUserCircle size={40} />
              </div>
            </div>
            <div className="p-8 pt-12 space-y-6">
              <div>
                <h2 className="text-2xl font-black text-slate-800">{userEmail.split('@')[0]}</h2>
                <p className="text-slate-400 text-xs font-bold">{userEmail} • {userRole}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border">
                  <p className="text-[9px] font-black text-slate-400 uppercase">Study Time</p>
                  <p className="font-black text-slate-800">{stats.time} Minutes</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border">
                  <p className="text-[9px] font-black text-slate-400 uppercase">Completed</p>
                  <p className="font-black text-slate-800">{completedIds.length} Resources</p>
                </div>
              </div>
              <button onClick={() => setShowProfile(false)} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Units;