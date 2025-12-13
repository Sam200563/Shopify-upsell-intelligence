import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Sparkles, TrendingUp, ArrowRight, Loader2, X, Copy, Check } from 'lucide-react';

const Dashboard = () => {
    const [recentInsights, setRecentInsights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedInsight, setSelectedInsight] = useState(null);
    const [copied, setCopied] = useState(null);

    const copyToClipboard = (text, idx) => {
        navigator.clipboard.writeText(text);
        setCopied(idx);
        setTimeout(() => setCopied(null), 2000);
    };

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                const { data } = await axios.get('/insights/history');
                setRecentInsights(data.slice(0, 3)); // Show top 3
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchInsights();
    }, []);

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Welcome Hero */}
            <div className="bg-gradient-premium rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl border border-slate-700">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] -mr-16 -mt-16"></div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-4">Start Generating Revenue</h1>
                    <p className="text-slate-300 max-w-xl mb-8 text-lg">
                        Create intelligent upsell offers tailored to your products. Increase your AOV instantly with AI-powered suggestions.
                    </p>
                    <Link to="/generate" className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-xl font-bold transition-all hover:scale-105 shadow-lg shadow-purple-500/30">
                        <Sparkles size={20} /> Generate New Insight
                    </Link>
                </div>
            </div>

            <div>
                <div className="flex justify-between items-end mb-6">
                    <h2 className="text-2xl font-bold">Recent Insights</h2>
                    <Link to="/history" className="text-purple-400 hover:text-purple-300 flex items-center gap-1 group">
                        View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center p-12">
                        <Loader2 className="animate-spin text-purple-500" size={32} />
                    </div>
                ) : recentInsights.length === 0 ? (
                    <div className="text-center py-16 bg-slate-800/30 rounded-2xl border border-slate-700 border-dashed">
                        <p className="text-slate-400 mb-4">No insights generated yet.</p>
                        <Link to="/generate" className="text-purple-400 font-medium hover:underline">Create your first one</Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-6">
                        {recentInsights.map((insight) => (
                            <div key={insight._id} className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 hover:border-purple-500/50 transition-all group card-hover">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="px-3 py-1 rounded-full bg-slate-700/50 text-xs text-slate-300 border border-slate-600">
                                        {insight.category}
                                    </div>
                                    <div className="flex items-center gap-1 text-green-400 bg-green-900/20 px-2 py-1 rounded-lg border border-green-500/20">
                                        <TrendingUp size={14} />
                                        <span className="text-xs font-bold">+{insight.estimatedAOVIncrease} AOV</span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-2 truncate" title={insight.productName}>{insight.productName}</h3>
                                <p className="text-slate-400 text-sm mb-6">${insight.price}</p>

                                <div className="space-y-3 mb-6">
                                    {insight.upsellIdeas.slice(0, 2).map((idea, idx) => (
                                        <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                                            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0"></div>
                                            {idea}
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setSelectedInsight(insight)}
                                    className="w-full py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm font-medium transition-colors"
                                >
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* Insight Details Modal */}
            {selectedInsight && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col">

                        {/* Header */}
                        <div className="p-6 border-b border-slate-700 flex justify-between items-start sticky top-0 bg-slate-800 z-10">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-2 py-1 rounded bg-slate-700 text-xs text-slate-300 border border-slate-600">
                                        {selectedInsight.category}
                                    </span>
                                    <span className="text-green-400 text-sm font-bold bg-green-900/20 px-2 py-1 rounded border border-green-500/20">
                                        +{selectedInsight.estimatedAOVIncrease} AOV
                                    </span>
                                </div>
                                <h2 className="text-2xl font-bold text-white pr-8">{selectedInsight.productName}</h2>
                                <p className="text-slate-400">${selectedInsight.price}</p>
                            </div>
                            <button
                                onClick={() => setSelectedInsight(null)}
                                className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">
                            {/* Upsells */}
                            <div>
                                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">Upsell Recommendations</h3>
                                <div className="grid gap-3">
                                    {selectedInsight.upsellIdeas.map((idea, i) => (
                                        <div key={i} className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                                            <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
                                            <p className="text-slate-300">{idea}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Cross-sells */}
                            <div>
                                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">Cross-Sell Ideas</h3>
                                <div className="grid gap-3">
                                    {selectedInsight.crossSellIdeas.map((idea, i) => (
                                        <div key={i} className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-700/50">
                                            <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
                                            <p className="text-slate-300">{idea}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Offer Copy */}
                            <div>
                                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">High-Converting Copy</h3>
                                <div className="space-y-3">
                                    {selectedInsight.offerCopies.map((copyText, i) => (
                                        <div key={i} className="group relative p-4 bg-slate-900/50 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-colors">
                                            <p className="text-slate-300 pr-8">"{copyText}"</p>
                                            <button
                                                onClick={() => copyToClipboard(copyText, i)}
                                                className="absolute top-3 right-3 p-1.5 text-slate-500 hover:text-white hover:bg-slate-700 rounded transition-colors"
                                            >
                                                {copied === i ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-slate-700 bg-slate-800 sticky bottom-0 z-10">
                            <button
                                onClick={() => setSelectedInsight(null)}
                                className="w-full py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-bold text-white transition-colors"
                            >
                                Close Details
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
