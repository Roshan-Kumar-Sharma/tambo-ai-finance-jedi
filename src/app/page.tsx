// app/page.tsx - Fixed with proper Tailwind classes
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, TrendingUp, Target, Shield, Zap, ArrowRight } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);

  const handleGetStarted = () => {
    router.push('/chat');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 overflow-hidden relative">
      {/* Animated stars background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `stars-twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-6 pt-20 pb-16">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo/Badge */}
            <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full bg-blue-500/20 border border-blue-500/30 backdrop-blur-sm">
              <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
              <span className="text-blue-300 font-medium">The UI Strikes Back Hackathon</span>
              <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text uppercase tracking-wider">
              FINANCE JEDI
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-blue-200 mb-4 font-semibold">
              Master Your Financial Force
            </p>

            <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Harness the power of AI to bring balance to your finances. 
              Track spending, plan budgets, and achieve your goals with the wisdom of a Jedi Master.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={handleGetStarted}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold text-white text-lg shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Begin Your Journey
                  <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isHovering ? 'translate-x-1' : ''}`} />
                </span>
              </button>

              <a
                href="https://github.com/tambo-ai/tambo"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-blue-500/50 rounded-xl font-semibold text-blue-300 hover:bg-blue-500/10 hover:border-blue-400 transition-all duration-300"
              >
                View on GitHub
              </a>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
              {[
                {
                  icon: TrendingUp,
                  title: 'Smart Analytics',
                  description: 'AI-powered insights reveal your spending patterns',
                  gradient: 'from-blue-500 to-cyan-500',
                },
                {
                  icon: Target,
                  title: 'Goal Tracking',
                  description: 'Set and achieve financial goals with projections',
                  gradient: 'from-purple-500 to-pink-500',
                },
                {
                  icon: Shield,
                  title: 'Budget Planning',
                  description: 'Interactive budget tools that adapt to you',
                  gradient: 'from-green-500 to-emerald-500',
                },
                {
                  icon: Zap,
                  title: 'Real-time Updates',
                  description: 'Live tracking of bills and savings progress',
                  gradient: 'from-yellow-500 to-orange-500',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/10"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: 'slide-up 0.6s ease-out backwards',
                  }}
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Tech Stack */}
            <div className="mt-24">
              <p className="text-gray-400 text-sm mb-4">Powered by</p>
              <div className="flex flex-wrap justify-center gap-4">
                {['Tambo SDK', 'Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS'].map((tech) => (
                  <div key={tech} className="px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-gray-300 font-medium text-sm">
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {/* Quote */}
            <div className="mt-16 max-w-2xl mx-auto">
              <div className="p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm">
                <p className="text-xl text-blue-200 italic mb-2">
                  "Do or do not. There is no try."
                </p>
                <p className="text-sm text-gray-400">— Master Yoda, on financial discipline</p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-slate-700/50">
              <p className="text-gray-400 text-sm">
                Built with 💙 for{' '}
                <a
                  href="https://www.wemakedevs.org/hackathons/tambo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  The UI Strikes Back Hackathon
                </a>
              </p>
              <p className="text-gray-500 text-xs mt-2">
                May the Financial Force be with you ✨
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}