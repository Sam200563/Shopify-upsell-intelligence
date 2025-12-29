import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, History as HistoryIcon, LogOut } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    if (!user) return null;

    return (
        <nav className="bg-slate-900/50 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="p-2 bg-gradient-to-tr from-primary-500 to-indigo-600 rounded-lg">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            SEO Meta Genius
                        </span>
                    </Link>

                    <div className="flex items-center space-x-6">
                        <Link
                            to="/"
                            className={`text-sm font-medium transition-colors hover:text-primary-400 ${location.pathname === '/' ? 'text-primary-400' : 'text-slate-400'}`}
                        >
                            Generator
                        </Link>
                        <Link
                            to="/history"
                            className={`flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary-400 ${location.pathname === '/history' ? 'text-primary-400' : 'text-slate-400'}`}
                        >
                            <HistoryIcon className="w-4 h-4" />
                            <span>History</span>
                        </Link>

                        <div className="h-6 w-px bg-slate-700" />

                        <button
                            onClick={logout}
                            className="flex items-center space-x-1 text-sm font-medium text-slate-400 hover:text-red-400 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
