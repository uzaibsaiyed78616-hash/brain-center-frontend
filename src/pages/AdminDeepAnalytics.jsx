import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBrain, FaRocket, FaChartBar, FaUserGraduate, FaLightbulb } from 'react-icons/fa';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar, LineChart, Line } from 'recharts';

const AdminDeepAnalytics = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const res = await axios.get('https://brain-center-backend-sahk.onrender.com/api/auth/deep-analysis');
                if (res.data) {
                    setData(res.data);
                } else {
                    setError("Data missing from engine.");
                }
            } catch (err) {
                setError("Backend connection failed.");
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-indigo-600 font-bold tracking-widest uppercase text-[10px]">Syncing Data...</p>
        </div>
    );

    if (error || !data) return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-4xl font-black text-slate-200 mb-2">OFFLINE</h1>
            <p className="text-slate-500 font-medium mb-6">{error}</p>
            <button onClick={() => window.location.reload()} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest">Retry</button>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-800 p-6 md:p-10 font-sans overflow-x-hidden">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Header Section */}
                <div className="flex justify-between items-end border-b border-slate-200 pb-8">
                    <div>
                        <button onClick={() => navigate('/admin')} className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] hover:text-indigo-600 transition-all mb-2">
                            <FaArrowLeft /> Back to Admin
                        </button>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
                            Brain <span className="text-indigo-600">Center</span>
                        </h1>
                    </div>
                </div>

                {/* Metrics & Pie Chart */}
                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
                        <div className="bg-indigo-50 p-5 rounded-3xl mb-6">
                            <FaUserGraduate size={35} className="text-indigo-600" />
                        </div>
                        <h2 className="text-6xl font-black text-slate-900 tracking-tighter">{data.totalUsers || 0}</h2>
                        <p className="text-[11px] font-bold text-slate-400 uppercase mt-2 tracking-widest">Active Students</p>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm lg:col-span-2 overflow-hidden">
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase mb-4 tracking-[0.2em]">Batch Segmentation</h3>
                        {/* Wrapper with explicit height to prevent -1 height error */}
                        <div style={{ width: '100%', height: 250, minWidth: 0 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={data.segments} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                        {data.segments?.map((e, i) => (
                                            <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Main Charts Row */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Efficiency Chart */}
                    <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase mb-8 flex items-center gap-2 tracking-[0.2em]">
                            <FaRocket className="text-emerald-500" /> Efficiency Matrix
                        </h3>
                        <div style={{ width: '100%', height: 300, minWidth: 0 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                    <XAxis type="number" dataKey="time" name="Minutes" stroke="#94A3B8" />
                                    <YAxis type="number" dataKey="completed" name="Tasks" stroke="#94A3B8" />
                                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                    <Scatter name="Students" data={data.scatterData} fill="#6366f1" />
                                </ScatterChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Content Distribution Chart */}
                    <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                        <h3 className="text-[10px] font-bold text-slate-400 uppercase mb-8 flex items-center gap-2 tracking-[0.2em]">
                            <FaChartBar className="text-amber-500" /> Content Distribution
                        </h3>
                        <div style={{ width: '100%', height: 300, minWidth: 0 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data.resourceDist}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                    <XAxis dataKey="type" stroke="#94A3B8" fontSize={10} />
                                    <YAxis stroke="#94A3B8" fontSize={10} />
                                    <Tooltip cursor={false} contentStyle={{borderRadius: '12px', border: 'none'}} />
                                    <Bar dataKey="count" fill="#f59e0b" radius={[8, 8, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Bottom Line Chart */}
                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm overflow-hidden">
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase mb-10 tracking-[0.2em] flex items-center gap-2">
                        <FaLightbulb className="text-rose-500" /> Performance Consistency
                    </h3>
                    <div style={{ width: '100%', height: 350, minWidth: 0 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.scatterData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} />
                                <YAxis stroke="#94A3B8" fontSize={11} />
                                <Tooltip />
                                <Line type="monotone" dataKey="completed" stroke="#ef4444" strokeWidth={4} dot={{r: 5}} />
                                <Line type="monotone" dataKey="time" stroke="#6366f1" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDeepAnalytics;