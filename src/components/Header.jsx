import React from 'react';
import { FaGraduationCap, FaBell, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-3 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="bg-indigo-600 p-2 rounded-xl text-white group-hover:rotate-12 transition-transform">
          <FaGraduationCap size={24} />
        </div>
        <span className="text-xl font-black tracking-tight text-slate-800">EduBloom</span>
      </Link>
      
      <div className="flex items-center gap-5">
        <FaBell className="text-slate-500 hover:text-indigo-600 cursor-pointer transition-colors" />
        <Link to="/admin-panel" className="flex items-center gap-2 bg-slate-100 p-1 pr-4 rounded-full border border-slate-200 hover:bg-indigo-50 transition-all">
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
            US
          </div>
          <span className="text-xs font-bold text-slate-600">Admin</span>
        </Link>
      </div>
    </nav>
  );
};

export default Header;