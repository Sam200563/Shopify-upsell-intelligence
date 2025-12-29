import { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { LogOut, Users, BarChart, Shield } from 'lucide-react';

const AdminLayout = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed inset-y-0">
                <div className="h-16 flex items-center px-6 border-b border-gray-100">
                    <Shield className="w-6 h-6 text-blue-600 mr-2" />
                    <span className="font-bold text-gray-800 tracking-tight">Admin Panel</span>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <Link to="/admin/dashboard" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors">
                        <BarChart size={20} className="mr-3" />
                        Stats
                    </Link>
                    <Link to="/admin/users" className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors">
                        <Users size={20} className="mr-3" />
                        Users
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <LogOut size={18} className="mr-3" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Content */}
            <main className="flex-1 ml-64 p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
