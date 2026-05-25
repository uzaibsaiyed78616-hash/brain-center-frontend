import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserCircle, FaClock, FaTasks, FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const res = await axios.get('https://brain-center-backend-sahk.onrender.com/api/auth/all-users');
                setUsers(res.data);
            } catch (err) {
                console.error("Error fetching users");
            } finally {
                setLoading(false);
            }
        };
        fetchAllUsers();
    }, []);

    return (
        <div className="min-h-screen bg-[#F0F2F5] p-6 md:p-12 font-sans">
            <div className="max-w-6xl mx-auto">
                <button onClick={() => navigate('/admin')} className="flex items-center gap-2 font-bold text-slate-500 hover:text-indigo-600 mb-8 transition-all">
                    <FaArrowLeft /> Back to Admin Panel
                </button>

                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-slate-800 tracking-tighter italic">Student Analytics</h1>
                        <p className="text-slate-500 font-bold">Track real-time progress of all registered students</p>
                    </div>
                    <div className="bg-white p-4 px-8 rounded-3xl shadow-sm border-b-4 border-indigo-500">
                        <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Active Users</span>
                        <span className="text-3xl font-black text-indigo-600">{users.length}</span>
                    </div>
                </div>

                <div className="grid gap-6">
                    {loading ? (
                        <div className="text-center py-20 font-black text-slate-300 animate-pulse text-2xl">FETCHING STUDENT DATA...</div>
                    ) : (
                        users.map((user) => (
                            <div key={user._id} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-white flex flex-wrap items-center justify-between gap-6 hover:scale-[1.01] transition-all">
                                {/* User Info */}
                                <div className="flex items-center gap-4 min-w-[250px]">
                                    <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                                        <FaUserCircle size={30} />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-slate-800 truncate max-w-[200px]">{user.email}</h3>
                                        <span className="text-[10px] font-bold bg-indigo-50 text-indigo-500 px-3 py-1 rounded-full uppercase tracking-widest">Student ID: {user._id.slice(-6)}</span>
                                    </div>
                                </div>

                                {/* Stats 1: Progress */}
                                <div className="flex flex-col items-center gap-2">
                                    <div className="flex items-center gap-2 text-emerald-500 font-black italic">
                                        <FaTasks /> {user.completedResources?.length || 0} Resources Done
                                    </div>
                                    <div className="w-40 h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-emerald-500 transition-all duration-1000" 
                                            style={{ width: `${Math.min((user.completedResources?.length || 0) * 10, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Stats 2: Time */}
                                <div className="bg-amber-50 p-4 px-6 rounded-2xl flex items-center gap-3 border border-amber-100">
                                    <FaClock className="text-amber-500" />
                                    <div>
                                        <span className="block text-[9px] font-black text-amber-400 uppercase">Learning Time</span>
                                        <span className="font-black text-amber-700">{user.totalTimeSpent || 0} Minutes</span>
                                    </div>
                                </div>

                                {/* Last Active */}
                                <div className="text-right">
                                    <span className="block text-[10px] font-black text-slate-300 uppercase tracking-widest">Last Activity</span>
                                    <span className="font-bold text-slate-500 text-sm">
                                        {user.lastActive ? new Date(user.lastActive).toLocaleDateString() : 'N/A'}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;
