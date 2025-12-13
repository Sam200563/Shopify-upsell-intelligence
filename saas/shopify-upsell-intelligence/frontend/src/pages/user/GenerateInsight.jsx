import { useState } from 'react';
import axios from 'axios';
import { Sparkles, Loader2, Copy, Check } from 'lucide-react';

const GenerateInsight = () => {
    const [formData, setFormData] = useState({ productName: '', category: '', price: '' });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        try {
            // Small delay to simulate AI thinking
            await new Promise(r => setTimeout(r, 1500));
            const { data } = await axios.post('/insights/generate', formData);
            setResult(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text, idx) => {
        navigator.clipboard.writeText(text);
        setCopied(idx);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-3">Generate Upsell Intelligence</h1>
                <p className="text-slate-400">Enter product details to receive AI-curated upsell strategies.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Form Section */}
                <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Product Name</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                placeholder="e.g. Ergonomic Office Chair"
                                value={formData.productName}
                                onChange={e => setFormData({ ...formData, productName: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                            <select
                                required
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all appearance-none"
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="">Select Category</option>
                                <option value="Clothing">Clothing & Fashion</option>
                                <option value="Electronics">Electronics & Tech</option>
                                <option value="Home">Home & Kitchen</option>
                                <option value="Beauty">Beauty & Personal Care</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Price ($)</label>
                            <input
                                type="number"
                                required
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                placeholder="0.00"
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? <><Loader2 className="animate-spin" /> Analyzing...</> : <><Sparkles /> Generate Magic</>}
                        </button>
                    </form>
                </div>

                {/* Result Section */}
                <div className="space-y-6">
                    {!result && !loading && (
                        <div className="h-full min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-2xl p-8 text-center text-slate-500">
                            <Sparkles className="w-12 h-12 mb-4 opacity-20" />
                            <p>Your insights will appear here.</p>
                        </div>
                    )}

                    {loading && (
                        <div className="h-full min-h-[400px] flex flex-col items-center justify-center border border-slate-700 rounded-2xl bg-slate-800/30 p-8">
                            <div className="relative w-20 h-20 mb-6">
                                <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
                                <Sparkles className="absolute inset-0 m-auto text-purple-400 animate-pulse" size={24} />
                            </div>
                            <p className="text-lg font-medium animate-pulse">Analyzing market patterns...</p>
                        </div>
                    )}

                    {result && (
                        <div className="animate-fade-in-up space-y-6">
                            {/* Success Card */}
                            <div className="bg-gradient-to-br from-green-900/40 to-slate-900 border border-green-500/30 rounded-2xl p-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
                                        <Sparkles size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-green-400 font-bold uppercase tracking-wider">Potential Impact</p>
                                        <p className="text-2xl font-bold text-white">+{result.estimatedAOVIncrease} AOV</p>
                                    </div>
                                </div>
                            </div>

                            {/* Ideas List */}
                            <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
                                <div className="p-4 bg-slate-800 border-b border-slate-700 font-bold">Upsell Recommendations</div>
                                <div className="p-4 space-y-3">
                                    {result.upsellIdeas.map((idea, i) => (
                                        <div key={i} className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-lg">
                                            <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
                                            <p className="text-sm text-slate-300">{idea}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Copy Bank */}
                            <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
                                <div className="p-4 bg-slate-800 border-b border-slate-700 font-bold">Offer Copy</div>
                                <div className="p-4 space-y-3">
                                    {result.offerCopies.map((copyText, i) => (
                                        <div key={i} className="group relative p-4 bg-slate-900/50 rounded-lg border border-slate-800 hover:border-slate-600 transition-colors">
                                            <p className="text-sm text-slate-300 pr-8">"{copyText}"</p>
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default GenerateInsight;
