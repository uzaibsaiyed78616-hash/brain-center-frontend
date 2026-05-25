import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBoxes, FaChartLine, FaArrowLeft, FaShieldAlt, FaBrain } from 'react-icons/fa';

const AdminDashboard = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
            <div className="max-w-5xl w-full space-y-8">
                <div className="text-center space-y-2">
                    <div className="inline-flex w-16 h-16 bg-white rounded-3xl shadow-sm mb-4 border items-center justify-center text-indigo-600"><FaShieldAlt size={32} /></div>
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight italic">ADMIN PANEL</h1>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Master Control Hub</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div onClick={() => navigate('/admin/manage')} className="group cursor-pointer bg-white p-8 rounded-[2.5rem] shadow-xl border border-white hover:scale-105 transition-all">
                        <div className="bg-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6"><FaBoxes size={20}/></div>
                        <h3 className="text-xl font-black text-slate-800 mb-1">Manage</h3>
                        <p className="text-slate-500 text-xs font-bold">Content & Units</p>
                    </div>

                    {/* Card 2 */}
                    <div onClick={() => navigate('/admin/users')} className="group cursor-pointer bg-white p-8 rounded-[2.5rem] shadow-xl border border-white hover:scale-105 transition-all">
                        <div className="bg-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6"><FaChartLine size={20}/></div>
                        <h3 className="text-xl font-black text-slate-800 mb-1">Users</h3>
                        <p className="text-slate-500 text-xs font-bold">Student Logs</p>
                    </div>

                    {/* Card 3 (Naya!) */}
                    <div onClick={() => navigate('/admin/deep-analytics')} className="group cursor-pointer bg-slate-900 p-8 rounded-[2.5rem] shadow-xl border border-slate-800 hover:scale-105 transition-all">
                        <div className="bg-gradient-to-tr from-fuchsia-600 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6 animate-pulse"><FaBrain size={20}/></div>
                        <h3 className="text-xl font-black text-white mb-1">Intelligence</h3>
                        <p className="text-slate-400 text-xs font-bold">Deep Data Graphs</p>
                    </div>
                </div>

                <button onClick={() => navigate('/units')} className="flex items-center gap-2 mx-auto text-slate-400 font-black text-xs uppercase hover:text-indigo-600 transition-colors"><FaArrowLeft /> Back to Dashboard</button>
            </div>
        </div>
    );
};
export default AdminDashboard;