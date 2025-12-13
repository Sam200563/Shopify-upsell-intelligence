import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Sparkles, Loader2 } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await register(name, email, password);
            // Registering users are always 'user', admin is seeded manually/db
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[100px]"></div>
            </div>

            <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-8 rounded-2xl shadow-xl relative z-10">
                <div className="flex justify-center mb-8">
                    <div className="p-3 bg-blue-500/10 rounded-xl">
                        <Sparkles className="w-8 h-8 text-blue-500" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-center text-white mb-2">Create Account</h2>
                <p className="text-center text-slate-400 mb-8">Start generating intelligence today</p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Get Started Free'}
                    </button>
                </form>

                <p className="mt-6 text-center text-slate-400 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
