import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-b from-white to-slate-50 py-20 px-6">
      <div className="max-w-5xl mx-auto text-center space-y-10">
        <span className="bg-indigo-50 text-indigo-600 px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] border border-indigo-100 animate-bounce">
          Official Course Portal
        </span>
        <h1 className="text-6xl md:text-8xl font-[1000] text-slate-900 leading-[0.95] tracking-tighter">
          Mastering <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">ICT</span> <br /> 
          in Physical Education.
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
          A dedicated platform for Curriculum, Management and Pedagogy in Secondary Education training.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6 pt-10">
          <Link to="/units" className="bg-indigo-600 text-white px-12 py-5 rounded-[2rem] font-black text-xl shadow-2xl shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-2 transition-all flex items-center justify-center gap-3 group">
            Start Learning <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
          <button className="bg-white text-slate-900 border-2 border-slate-100 px-12 py-5 rounded-[2rem] font-black text-xl hover:bg-slate-50 transition-all">
            View Syllabus
          </button>
        </div>
      </div>
    </div>
  );
};
export default Home;