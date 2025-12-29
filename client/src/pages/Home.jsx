import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Copy, Check, Wand2, ArrowRight } from 'lucide-react';

const Home = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        pageTitle: '',
        targetKeyword: '',
        description: ''
    });
    const [result, setResult] = useState(null);
    const [copied, setCopied] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGenerate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const config = {
                headers: { Authorization: `Bearer ${user.token}` }
            };

            const { data } = await axios.post('http://localhost:5000/api/generate-meta', formData, config);
            setResult(data);

            // Save to history automatically
            await axios.post('http://localhost:5000/api/history', {
                ...formData,
                generatedMeta: data
            }, config);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text, key) => {
        navigator.clipboard.writeText(text);
        setCopied(key);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-white mb-3">
                    Instant <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400">SEO Magic</span>
                </h1>
                <p className="text-slate-400 text-lg">Generate optimized meta tags in seconds.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                    <div className="card">
                        <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                            <span className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center mr-3 text-sm">1</span>
                            Page Details
                        </h2>
                        <form onSubmit={handleGenerate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">Page Title</label>
                                <input
                                    name="pageTitle"
                                    required
                                    className="input-field"
                                    placeholder="e.g. Best Coffee Machines 2024"
                                    value={formData.pageTitle}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">Target Keyword</label>
                                <input
                                    name="targetKeyword"
                                    required
                                    className="input-field"
                                    placeholder="e.g. coffee machines"
                                    value={formData.targetKeyword}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1.5">Brief Description</label>
                                <textarea
                                    name="description"
                                    className="input-field min-h-[100px]"
                                    placeholder="What is this page about?"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full flex items-center justify-center group"
                            >
                                {loading ? (
                                    <span className="animate-pulse">Generating...</span>
                                ) : (
                                    <>
                                        <Wand2 className="w-4 h-4 mr-2" />
                                        <span>Generate Meta Tags</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Output Section */}
                <div className="space-y-6">
                    {result ? (
                        <div className="card animate-slide-up border-primary-500/20 shadow-primary-500/10">
                            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                                <span className="w-8 h-8 rounded-lg bg-primary-500/20 text-primary-400 flex items-center justify-center mr-3 text-sm">2</span>
                                Generated Results
                            </h2>

                            <div className="space-y-5">
                                {[
                                    { label: 'Meta Title', value: result.title, key: 'title' },
                                    { label: 'Meta Description', value: result.description, key: 'desc' },
                                    { label: 'Keywords', value: result.keywords, key: 'keywords' },
                                    { label: 'OG Title', value: result.ogTitle, key: 'ogTitle' },
                                    { label: 'JSON-LD Schema', value: result.jsonLd, key: 'json', code: true },
                                ].map((item) => (
                                    <div key={item.key} className="group">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.label}</label>
                                            <button
                                                onClick={() => copyToClipboard(item.value, item.key)}
                                                className="text-slate-500 hover:text-primary-400 transition-colors"
                                                title="Copy"
                                            >
                                                {copied === item.key ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        {item.code ? (
                                            <pre className="p-3 bg-slate-900 rounded-lg text-sm text-slate-300 overflow-x-auto border border-slate-700">
                                                {item.value}
                                            </pre>
                                        ) : (
                                            <div className="p-3 bg-slate-900 rounded-lg text-sm text-slate-300 border border-slate-700 break-words">
                                                {item.value}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full min-h-[400px] border-2 border-dashed border-slate-700/50 rounded-2xl flex flex-col items-center justify-center text-slate-500 p-8">
                            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                                <ArrowRight className="w-8 h-8 opacity-50" />
                            </div>
                            <p className="text-lg font-medium text-slate-400">Ready to Generate</p>
                            <p className="text-sm">Fill out the form to see optimized results here</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
