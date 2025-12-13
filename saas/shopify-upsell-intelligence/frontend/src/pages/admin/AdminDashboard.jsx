import { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, FileText, TrendingUp, Activity } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ users: 0, insights: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await axios.get('/admin/stats');
                setStats(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-8 animate-fade-in">
            <h1 className="text-2xl font-bold text-gray-800">Platform Overview</h1>

            <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center">
                    <div className="p-3 bg-blue-50 rounded-lg mr-4">
                        <Users className="text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Users</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.users}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center">
                    <div className="p-3 bg-purple-50 rounded-lg mr-4">
                        <FileText className="text-purple-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Insights Generated</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.insights}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center">
                    <div className="p-3 bg-green-50 rounded-lg mr-4">
                        <TrendingUp className="text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Avg. AOV Uplift</p>
                        <p className="text-2xl font-bold text-gray-900">12.5%</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center">
                    <div className="p-3 bg-orange-50 rounded-lg mr-4">
                        <Activity className="text-orange-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">System Status</p>
                        <p className="text-lg font-bold text-green-600">Healthy</p>
                    </div>
                </div>
            </div>

            {/* Placeholder Chart Area */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-96 flex flex-col justify-center items-center text-gray-400">
                <Activity size={48} className="mb-4 opacity-20" />
                <p>Activity Chart Visualization Placeholder</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
