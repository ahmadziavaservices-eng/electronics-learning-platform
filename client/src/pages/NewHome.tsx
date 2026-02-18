import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import AnimatedScientist from '@/components/AnimatedScientist';
import DidYouKnowPopup from '@/components/DidYouKnowPopup';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import { RoboticHead } from '@/components/RoboticHead';
import { useScrollAnimation, useCurrentSection } from '@/hooks/useScrollAnimation';

export default function NewHome() {
  const [activeSection, setActiveSection] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [roboticHeadVisible, setRoboticHeadVisible] = useState(false);
  const currentSection = useCurrentSection();

  useEffect(() => {
    setActiveSection(currentSection);
    // Auto-trigger robotic head when entering a new section
    if (currentSection && currentSection !== activeSection) {
      setRoboticHeadVisible(true);
      setTimeout(() => setShowPopup(true), 300);
    }
  }, [currentSection]);

  const handleRoboticHeadClick = () => {
    setShowPopup(!showPopup);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setRoboticHeadVisible(false);
  };

  const newsItems = [
    {
      tag: 'AI & ML',
      title: 'Edge AI on Microcontrollers',
      description: 'TinyML is revolutionizing embedded systems. Learn how to run machine learning models on Arduino and ESP32 with minimal resources.',
      date: 'Oct 28, 2025',
      color: 'from-purple-500 to-pink-500',
    },
    {
      tag: 'IoT',
      title: 'Matter Protocol Takes Over',
      description: 'The unified smart home standard is finally here. Discover how Matter is changing IoT connectivity and what you need to know.',
      date: 'Oct 25, 2025',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      tag: 'Automation',
      title: 'Industrial IoT Boom',
      description: 'Industry 4.0 is accelerating. Explore how automation and IoT are transforming manufacturing and creating new career opportunities.',
      date: 'Oct 24, 2025',
      color: 'from-lime-500 to-green-500',
    },
    {
      tag: 'Hardware',
      title: 'ESP32-S3 Dominates',
      description: 'The latest ESP32 variant is a game-changer. Dual-core, WiFi 6, and more power. Perfect for advanced IoT projects.',
      date: 'Oct 23, 2025',
      color: 'from-purple-500 to-pink-500',
    },
    {
      tag: 'Power Electronics',
      title: 'GaN Semiconductors Rise',
      description: 'Gallium Nitride is replacing silicon in power supplies. Learn why and how to design with GaN for efficiency.',
      date: 'Oct 22, 2025',
      color: 'from-lime-500 to-green-500',
    },
    {
      tag: 'Robotics',
      title: 'DIY Robotics Goes Mainstream',
      description: 'Affordable robotics kits and platforms are making it easier than ever to build intelligent robots at home.',
      date: 'Oct 21, 2025',
      color: 'from-cyan-500 to-blue-500',
    },
  ];

  const trendingTopics = [
    { icon: '🤖', title: 'AI & Machine Learning', desc: 'Bringing intelligence to embedded systems' },
    { icon: '🏠', title: 'Smart Home Tech', desc: 'Connected devices and automation' },
    { icon: '⚡', title: 'Power Electronics', desc: 'Efficient energy management systems' },
    { icon: '🚀', title: 'Embedded Systems', desc: 'IoT and real-time applications' },
    { icon: '🔌', title: 'Arduino & ESP32', desc: 'Popular platforms for makers' },
    { icon: '🤝', title: 'IoT Connectivity', desc: '5G, WiFi 6, and beyond' },
  ];

  const futureFeatures = [
    'Interactive Circuit Simulator with AI assistance',
    'Advanced AI/ML on microcontrollers course',
    'Real-time robotics projects and tutorials',
    '5G and next-gen connectivity modules',
    'Industrial automation case studies',
    'Power electronics design masterclass',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Animated Scientist */}
      <AnimatedScientist />

      {/* Hero Section */}
      <section data-section="hero" className="relative min-h-screen flex items-center justify-center pt-20 pb-20 px-4 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-gradient-radial from-cyan-500/20 to-transparent rounded-full -top-48 -right-48 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-gradient-radial from-purple-500/20 to-transparent rounded-full -bottom-48 -left-48 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="mb-6 inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
            <span className="text-cyan-400 text-sm font-semibold">Welcome to ElectroLearn</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-lime-400 to-cyan-400 bg-clip-text text-transparent">
              Master Electronics & IoT
            </span>
            <br />
            <span className="text-slate-200">in 2026</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            From fundamental circuits to advanced IoT applications. Learn at your own pace with comprehensive, hands-on courses designed for beginners and professionals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/courses">
              <a className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-bold rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 group">
                Explore Courses
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Link>
            <a href="#news" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/50 font-bold rounded-lg transition-all">
              What's Trending
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
              <div className="text-3xl font-bold text-cyan-400">3</div>
              <div className="text-sm text-slate-400 mt-1">Comprehensive Courses</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
              <div className="text-3xl font-bold text-lime-400">15+</div>
              <div className="text-sm text-slate-400 mt-1">Learning Modules</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
              <div className="text-3xl font-bold text-purple-400">100%</div>
              <div className="text-sm text-slate-400 mt-1">Free & Open</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech News Section */}
      <section data-section="tech-news" id="news" className="py-20 px-4 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent relative">
        {activeSection === 'tech-news' && <DidYouKnowPopup section="tech-news" />}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="text-cyan-400">🔥 What's Hot in Tech</span>
            </h2>
            <p className="text-slate-400 text-lg">Latest trends and breakthroughs in electronics and IoT</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((item, idx) => (
              <div
                key={idx}
                className="group relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1"
              >
                {/* Top Border Accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} rounded-t-xl`}></div>

                {/* Tag */}
                <div className="inline-block mb-4">
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-bold rounded-full border border-cyan-500/30">
                    {item.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                  <span className="text-xs text-slate-500">{item.date}</span>
                  <a href="#" className="text-cyan-400 hover:text-lime-400 font-semibold text-sm transition-colors">
                    Read More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Topics Section */}
      <section data-section="trending-topics" className="py-20 px-4 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent relative">
        {activeSection === 'trending-topics' && <DidYouKnowPopup section="trending-topics" />}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="text-purple-400">📈 Trending Topics</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trendingTopics.map((topic, idx) => (
              <div
                key={idx}
                className="group bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/50 rounded-lg p-6 text-center hover:border-purple-500/50 transition-all duration-300 hover:bg-slate-800/60 hover:shadow-lg hover:shadow-purple-500/10 hover:scale-105"
              >
                <div className="text-4xl mb-3">{topic.icon}</div>
                <h4 className="font-bold text-slate-100 mb-2">{topic.title}</h4>
                <p className="text-sm text-slate-400">{topic.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Section */}
      <section data-section="future-features" className="py-20 px-4 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent relative">
        {activeSection === 'future-features' && <DidYouKnowPopup section="future-features" />}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                <span className="text-cyan-400">🚀 What's Coming Next</span>
              </h2>
              <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                We're constantly expanding ElectroLearn to bring you the latest in electronics education. Here's what we're working on:
              </p>
              <ul className="space-y-3">
                {futureFeatures.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-lime-400 font-bold mt-1">✓</span>
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Decorative Box */}
            <div className="relative h-96 rounded-xl overflow-hidden border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-slate-900/50">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-7xl mb-4">🔮</div>
                  <p className="text-slate-400 text-lg">Exciting updates coming soon...</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 border-y border-slate-700/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-100">
            Ready to Master <span className="text-cyan-400">Electronics?</span>
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Join thousands of learners building amazing projects with electronics and IoT
          </p>
          <Link href="/courses">
            <a className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-bold rounded-lg transition-all transform hover:scale-105">
              Explore All Courses
            </a>
          </Link>
        </div>
      </section>

      {/* Robotic Head */}
      <RoboticHead onHeadClick={handleRoboticHeadClick} isVisible={roboticHeadVisible} />
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-cyan-400">Did You Know?</h3>
              <button
                onClick={handlePopupClose}
                className="text-slate-400 hover:text-slate-200 transition-colors"
              >
                X
              </button>
            </div>
            <DidYouKnowPopup section={activeSection} />
          </div>
        </div>
      )}
    </div>
  );
}
