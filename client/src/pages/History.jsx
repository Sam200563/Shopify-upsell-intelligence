import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Calendar, Search } from 'lucide-react';

const History = () => {
    const { user } = useAuth();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` }
                };
                const { data } = await axios.get('http://localhost:5000/api/history', config);
                setHistory(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [user]);

    if (loading) {
        return <div className="text-center text-slate-400 mt-20">Loading history...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">Generation History</h1>
                <div className="text-sm text-slate-400">
                    Total Generated: <span className="text-primary-400 font-bold">{history.length}</span>
                </div>
            </div>

            {history.length === 0 ? (
                <div className="card text-center py-20">
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-slate-500" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">No History Found</h3>
                    <p className="text-slate-400">Your generated meta tags will appear here.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {history.map((item) => (
                        <div key={item._id} className="card hover:border-slate-600 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-1">{item.pageTitle}</h3>
                                    <div className="flex items-center text-sm text-slate-400">
                                        <span className="bg-slate-700/50 px-2 py-0.5 rounded text-xs mr-2 border border-slate-600">
                                            {item.targetKeyword}
                                        </span>
                                        <Calendar className="w-3 h-3 mr-1" />
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                                <div>
                                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Meta Title</div>
                                    <p className="text-sm text-slate-300">{item.generatedMeta?.title}</p>
                                </div>
                                <div>
                                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Meta Description</div>
                                    <p className="text-sm text-slate-300">{item.generatedMeta?.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default History;
