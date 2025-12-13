import { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, Ban, CheckCircle, Shield } from 'lucide-react';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get('/admin/users');
            setUsers(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleBlock = async (id) => {
        if (!window.confirm('Are you sure you want to change block status?')) return;
        try {
            await axios.put(`/admin/block/${id}`);
            fetchUsers();
        } catch (error) {
            console.error(error);
            alert('Failed to update user status');
        }
    };

    if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-blue-600" /></div>;

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
                <span className="text-sm text-gray-500">Total: {users.length}</span>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-sm">User</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Role</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Joined</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Status</th>
                            <th className="px-6 py-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-gray-900">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                                        }`}>
                                        {user.role === 'admin' && <Shield size={12} className="mr-1" />}
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4">
                                    {user.isBlocked ? (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                            Blocked
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Active
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {user.role !== 'admin' && (
                                        <button
                                            onClick={() => handleBlock(user._id)}
                                            className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${user.isBlocked
                                                ? 'bg-green-50 text-green-600 hover:bg-green-100'
                                                : 'bg-red-50 text-red-600 hover:bg-red-100'
                                                }`}
                                        >
                                            {user.isBlocked ? <span className="flex items-center gap-1"><CheckCircle size={14} /> Unblock</span> : <span className="flex items-center gap-1"><Ban size={14} /> Block</span>}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
