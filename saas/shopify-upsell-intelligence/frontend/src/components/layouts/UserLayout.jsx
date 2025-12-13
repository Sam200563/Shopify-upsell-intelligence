import { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { LogOut, Sparkles, LayoutDashboard, History, User } from 'lucide-react';

const UserLayout = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-purple-500 selection:text-white">
            {/* Navbar */}
            <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link to="/" className="flex items-center gap-2">
                            <Sparkles className="w-8 h-8 text-purple-500" />
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                                Upsell Intelligence
                            </span>
                        </Link>
                        <div className="flex items-center gap-6">
                            <Link to="/dashboard" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1">
                                <LayoutDashboard size={18} /> Dashboard
                            </Link>
                            <Link to="/generate" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1">
                                <Sparkles size={18} /> Generate
                            </Link>
                            <Link to="/history" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1">
                                <History size={18} /> History
                            </Link>
                            <div className="h-6 w-px bg-slate-700"></div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-slate-400">Hi, {user?.name}</span>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-red-400 transition-colors"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-800 mt-auto py-6 text-center text-slate-500 text-sm">
                <p>&copy; 2025 Shopify Upsell Intelligence. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default UserLayout;
