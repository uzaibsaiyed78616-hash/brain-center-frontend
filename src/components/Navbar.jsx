import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem('role');

    const handleLogout = () => {
        localStorage.removeItem('role'); // Data saaf
        navigate('/login');
    };

    if (!role) return null; // Login ke bina navbar na dikhao (optional)

    return (
        <nav className="flex justify-between items-center p-6 bg-white shadow-sm">
            <Link to="/units" className="text-2xl font-black text-indigo-600 italic">ICTPET</Link>
            
            <div className="flex gap-6 items-center">
                <Link to="/units" className="font-bold text-slate-600">COURSE CONTENT</Link>
                
                {/* 👑 Sirf Admin ko dikhega */}
                {role === 'admin' && (
                    <Link to="/admin" className="font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl">
                        ADMIN PANEL
                    </Link>
                )}

                <button 
                    onClick={handleLogout}
                    className="font-bold text-rose-500 border border-rose-200 px-4 py-2 rounded-xl hover:bg-rose-50"
                >
                    LOGOUT
                </button>
            </div>
        </nav>
    );
};

export default Navbar;