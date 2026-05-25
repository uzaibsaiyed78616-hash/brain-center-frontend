import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? 'login' : 'signup';
    try {
        const res = await axios.post(`https://brain-center-backend-sahk.onrender.com/api/auth/${endpoint}`, { email, password });
        
        if (isLogin) {
            const userData = res.data.user;
            
            
            localStorage.setItem('userEmail', userData.email); 
            localStorage.setItem('userRole', userData.role); 
            
            if (userData.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/units');
            }
        } else {
            alert("Account created! Now click on Login button.");
            setIsLogin(true);
        }
    } catch (err) {
        alert(err.response?.data?.message || "Error!");
    }
};

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F0F2F5] p-4 font-sans">
            <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl w-full max-w-md border-4 border-indigo-50">
                <h2 className="text-4xl font-black text-center mb-2 text-indigo-600 italic tracking-tighter">ICTPET</h2>
                <p className="text-center text-slate-400 font-bold mb-8 uppercase tracking-widest text-[10px]">
                    {isLogin ? "Welcome Back" : "Create New Account"}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        required
                        className="w-full p-5 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-indigo-400 font-bold transition-all text-slate-700"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        required
                        className="w-full p-5 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-indigo-400 font-bold transition-all text-slate-700"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    
                    <button type="submit" className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all mt-4">
                        {isLogin ? "LOG IN" : "SIGN UP"}
                    </button>
                </form>

                <div className="mt-8 flex flex-col gap-3">
                    <div className="relative flex py-3 items-center">
                        <div className="flex-grow border-t border-slate-100"></div>
                        <span className="flex-shrink mx-4 text-slate-300 font-bold text-[10px]">OR</span>
                        <div className="flex-grow border-t border-slate-100"></div>
                    </div>

                    <button 
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setEmail("");
                            setPassword("");
                        }}
                        className="w-full py-4 border-2 border-indigo-50 text-indigo-600 rounded-2xl font-black text-xs hover:bg-indigo-50 transition-all uppercase tracking-wider"
                    >
                        {isLogin ? "New User? Create Account" : "Already have an account? Login"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;