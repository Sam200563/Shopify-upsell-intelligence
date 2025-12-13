import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import UserLayout from './components/layouts/UserLayout';
import AdminLayout from './components/layouts/AdminLayout';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
// Placeholders for now, implemented next
import Dashboard from './pages/user/Dashboard';
import GenerateInsight from './pages/user/GenerateInsight';
import History from './pages/user/History';
import AdminDashboard from './pages/admin/AdminDashboard';
import Users from './pages/admin/Users';

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    if (adminOnly && user.role !== 'admin') return <Navigate to="/dashboard" />;

    return children;
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* User Routes */}
                <Route path="/" element={<ProtectedRoute><UserLayout /></ProtectedRoute>}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="generate" element={<GenerateInsight />} />
                    <Route path="history" element={<History />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminLayout /></ProtectedRoute>}>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route index element={<Navigate to="/admin/dashboard" />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
