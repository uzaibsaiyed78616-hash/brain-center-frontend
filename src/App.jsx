import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Units from './pages/Units';
import AdminDashboard from './pages/AdminDashboard';
import Admin from './pages/Admin';
import AdminUsers from './pages/AdminUsers';
import AdminDeepAnalytics from './pages/AdminDeepAnalytics';

const ProtectedRoute = ({ children, roleRequired }) => {
    const userRole = localStorage.getItem('userRole'); 
    if (!userRole) return <Navigate to="/login" />;
    if (roleRequired && userRole !== roleRequired) return <Navigate to="/units" />;
    return children;
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/units" element={<ProtectedRoute><Units /></ProtectedRoute>} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<ProtectedRoute roleRequired="admin"><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/manage" element={<ProtectedRoute roleRequired="admin"><Admin /></ProtectedRoute>} />
                <Route path="/admin/users" element={<ProtectedRoute roleRequired="admin"><AdminUsers /></ProtectedRoute>} />
                <Route path="/admin/deep-analytics" element={<ProtectedRoute roleRequired="admin"><AdminDeepAnalytics /></ProtectedRoute>} />
                
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}
export default App;