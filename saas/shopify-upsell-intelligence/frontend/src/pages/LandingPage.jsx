import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap, Target } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans user-select-none overflow-hidden relative">
            {/* Hero Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"></div>
            </div>

            {/* Navbar */}
            <nav className="relative z-10 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
                <Link to="/" className="flex items-center gap-2">
                    <Sparkles className="w-8 h-8 text-purple-500" />
                    <span className="text-xl font-bold font-heading">Upsell Intelligence</span>
                </Link>
                <div className="flex gap-4">
                    <Link to="/login" className="px-6 py-2 rounded-full border border-slate-700 hover:bg-slate-800 transition-all">Login</Link>
                    <Link to="/register" className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg hover:shadow-purple-500/25 transition-all">Get Started</Link>
                </div>
            </nav>

            {/* Hero Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 mb-8 animate-fade-in-up">
                    <Zap size={16} className="text-yellow-400" />
                    <span className="text-sm text-slate-300">New: AI-Powered AOV Estimation</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                    Supercharge Your Shopify <br /> Using <span className="text-purple-400">Intelligent Upsells</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                    Generate high-converting upsell and cross-sell offers in seconds. Increase your Average Order Value (AOV) without expensive consultants.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/register" className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-lg font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-xl shadow-purple-500/20">
                        Start Generating <ArrowRight size={20} />
                    </Link>
                </div>
            </div>

            {/* Features Grid */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 border-t border-slate-800/50">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-2xl bg-slate-800/30 border border-slate-700 hover:border-purple-500/50 transition-colors">
                        <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-6">
                            <Sparkles className="text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Creative Ideas</h3>
                        <p className="text-slate-400">Get unique upsell angles tailored to your specific product niche.</p>
                    </div>
                    <div className="p-8 rounded-2xl bg-slate-800/30 border border-slate-700 hover:border-blue-500/50 transition-colors">
                        <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-6">
                            <Target className="text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">AOV Forecasting</h3>
                        <p className="text-slate-400">Estimate potential revenue uplift before you verify.</p>
                    </div>
                    <div className="p-8 rounded-2xl bg-slate-800/30 border border-slate-700 hover:border-pink-500/50 transition-colors">
                        <div className="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center mb-6">
                            <Zap className="text-pink-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Instant Copy</h3>
                        <p className="text-slate-400">Copy-paste ready offer text optimized for conversion.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
