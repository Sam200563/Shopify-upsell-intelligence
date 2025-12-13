import { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, Calendar, Tag } from 'lucide-react';

const History = () => {
    const [insights, setInsights] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const { data } = await axios.get('/api/insights/history');
                setInsights(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-purple-500" /></div>;

    return (
        <div className="max-w-5xl mx-auto animate-fade-in">
            <h1 className="text-3xl font-bold mb-8">Generation History</h1>

            <div className="relative pl-8 border-l border-slate-800 space-y-12">
                {insights.map((insight) => (
                    <div key={insight._id} className="relative">
                        {/* Timeline Dot */}
                        <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-slate-900 border-4 border-purple-500"></div>

                        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-purple-500/30 transition-colors">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b border-slate-700/50 pb-4">
                                <div>
                                    <h3 className="text-xl font-bold">{insight.productName}</h3>
                                    <div className="flex items-center gap-3 text-slate-400 text-sm mt-1">
                                        <span className="flex items-center gap-1"><Tag size={14} /> {insight.category}</span>
                                        <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(insight.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 font-bold whitespace-nowrap">
                                    +{insight.estimatedAOVIncrease} AOV Estimate
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-300 mb-2 uppercase tracking-wide">Upsell Strategy</h4>
                                    <ul className="space-y-2">
                                        {insight.upsellIdeas.map((idea, i) => (
                                            <li key={i} className="text-sm text-slate-400 pl-3 border-l-2 border-slate-700">{idea}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-300 mb-2 uppercase tracking-wide">Cross-Sell Strategy</h4>
                                    <ul className="space-y-2">
                                        {insight.crossSellIdeas.map((idea, i) => (
                                            <li key={i} className="text-sm text-slate-400 pl-3 border-l-2 border-slate-700">{idea}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {insights.length === 0 && (
                    <p className="text-slate-500 italic">No history found.</p>
                )}
            </div>
        </div>
    );
};

export default History;
