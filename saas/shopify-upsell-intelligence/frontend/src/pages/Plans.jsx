import { useState } from 'react';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Plans = () => {
    const plans = [
        {
            name: 'Basic',
            price: '$9',
            period: '/month',
            description: 'Essential insights for new shops.',
            features: [
                '50 AI Insights / Day',
                'Basic Support',
                'Email Notifications',
                'Standard Speed'
            ],
            icon: Star,
            color: 'blue',
            buttonText: 'Start Basic',
            popular: false
        },
        {
            name: 'Grow',
            price: '$29',
            period: '/month',
            description: 'Perfect for growing businesses.',
            features: [
                'Unlimited AI Insights',
                'Priority Support',
                'Advanced Analytics',
                'Faster Generation',
                'Export to CSV'
            ],
            icon: Zap,
            color: 'purple',
            buttonText: 'Upgrade to Grow',
            popular: true
        },
        {
            name: 'Advance',
            price: '$99',
            period: '/month',
            description: 'For high-volume power sellers.',
            features: [
                'Everything in Grow',
                'Dedicated Account Manager',
                'Custom AI Models',
                'API Access',
                'White-label Reports'
            ],
            icon: Crown,
            color: 'orange',
            buttonText: 'Contact Sales',
            popular: false
        }
    ];

    return (
        <div className="min-h-screen bg-slate-900 text-white font-sans py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6">
                        Choose Your Plan
                    </h1>
                    <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                        Unlock the full potential of your store with our premium AI models.
                        Scale your insights as you scale your sales.
                    </p>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative bg-slate-800/50 backdrop-blur-xl border ${plan.popular ? 'border-purple-500 shadow-lg shadow-purple-500/20' : 'border-slate-700'} rounded-2xl p-8 flex flex-col hover:transform hover:scale-105 transition-all duration-300`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <div className={`w-14 h-14 rounded-2xl bg-${plan.color}-500/10 flex items-center justify-center mb-6`}>
                                    <plan.icon className={`w-7 h-7 text-${plan.color}-400`} />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                <p className="text-slate-400 mb-6">{plan.description}</p>
                                <div className="flex items-baseline">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className="text-slate-400 ml-2">{plan.period}</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8 flex-grow">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center text-slate-300">
                                        <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.popular
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/25 text-white'
                                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                                }`}>
                                {plan.buttonText}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-slate-500">
                        Need a custom enterprise solution? <a href="#" className="text-purple-400 hover:text-purple-300 underline">Contact us</a>
                    </p>
                    <div className="mt-8">
                        <Link to="/dashboard" className="text-slate-400 hover:text-white transition-colors">
                            ← Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Plans;
