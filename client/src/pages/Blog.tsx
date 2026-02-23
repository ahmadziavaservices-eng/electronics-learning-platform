import { Link } from 'wouter';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
  featured: boolean;
  image?: string;
}

export default function Blog() {
  const blogPosts: BlogPost[] = [
    {
      id: 'edge-ai-2026',
      title: 'Edge AI on Microcontrollers: The Future is Now',
      excerpt: 'Discover how TinyML is revolutionizing embedded systems. Learn to run machine learning models on Arduino and ESP32 with minimal resources.',
      author: 'Ahmad Zia',
      date: 'Oct 28, 2025',
      category: 'AI & Machine Learning',
      readTime: 8,
      featured: true,
    },
    {
      id: 'matter-protocol',
      title: 'Matter Protocol: Unifying Smart Home Standards',
      excerpt: 'The universal smart home standard is finally here. Explore how Matter is changing IoT connectivity and what you need to know.',
      author: 'Tech Team',
      date: 'Oct 25, 2025',
      category: 'IoT',
      readTime: 6,
      featured: true,
    },
    {
      id: 'gan-semiconductors',
      title: 'GaN Semiconductors: Replacing Silicon in Power Supplies',
      excerpt: 'Gallium Nitride is transforming power electronics. Learn why GaN is more efficient and how to design circuits with it.',
      author: 'Power Electronics Expert',
      date: 'Oct 22, 2025',
      category: 'Power Electronics',
      readTime: 10,
      featured: true,
    },
    {
      id: 'esp32-s3-guide',
      title: 'ESP32-S3: Everything You Need to Know',
      excerpt: 'The latest ESP32 variant is a game-changer with dual-core processing, WiFi 6, and enhanced security. Perfect for advanced IoT projects.',
      author: 'Microcontroller Guru',
      date: 'Oct 20, 2025',
      category: 'Hardware',
      readTime: 7,
      featured: false,
    },
    {
      id: 'diy-robotics',
      title: 'DIY Robotics: Building Your First Robot',
      excerpt: 'Affordable robotics kits and platforms are making it easier than ever to build intelligent robots at home. Start your robotics journey today.',
      author: 'Robotics Enthusiast',
      date: 'Oct 18, 2025',
      category: 'Robotics',
      readTime: 9,
      featured: false,
    },
    {
      id: '5g-iot',
      title: '5G and IoT: The Next Generation of Connectivity',
      excerpt: 'Explore how 5G is enabling new possibilities for IoT applications. From smart cities to industrial automation, the future is connected.',
      author: 'Connectivity Expert',
      date: 'Oct 15, 2025',
      category: 'Connectivity',
      readTime: 8,
      featured: false,
    },
  ];

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'AI & Machine Learning': 'from-purple-500 to-pink-500',
      'IoT': 'from-cyan-500 to-blue-500',
      'Power Electronics': 'from-lime-500 to-green-500',
      'Hardware': 'from-orange-500 to-red-500',
      'Robotics': 'from-purple-500 to-cyan-500',
      'Connectivity': 'from-blue-500 to-cyan-500',
    };
    return colors[category] || 'from-slate-500 to-slate-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-gradient-radial from-cyan-500/20 to-transparent rounded-full -top-48 -right-48 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-gradient-radial from-purple-500/20 to-transparent rounded-full -bottom-48 -left-48 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <Link href="/">
            <a className="text-cyan-400 hover:text-cyan-300 transition mb-4 inline-flex items-center gap-2 leading-tight font-semibold">
              ← Back to Home
            </a>
          </Link>
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-lime-400 to-purple-400 bg-clip-text text-transparent">
              ElectroLearn Blog
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
            Latest insights, tutorials, and trends in electronics, IoT, and embedded systems
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-2">
              <span className="text-cyan-400">⭐ Featured Articles</span>
            </h2>
            <p className="text-slate-400">Must-read stories from our community</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <a className="block group h-full">
                  <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/50 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1 h-full flex flex-col">
                    {/* Top Border Accent */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getCategoryColor(post.category)}`}></div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      {/* Category Tag */}
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-bold rounded-full border border-cyan-500/30">
                          {post.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="space-y-3 pt-4 border-t border-slate-700/50">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                          </div>
                          <span>{post.readTime} min read</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-slate-400">
                            <User className="w-4 h-4" />
                            {post.author}
                          </div>
                          <a href="#" className="text-cyan-400 hover:text-lime-400 font-semibold text-sm transition-colors">
                            Read →
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Regular Posts */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-2">
              <span className="text-purple-400">📚 Latest Articles</span>
            </h2>
            <p className="text-slate-400">Stay updated with our latest content</p>
          </div>

          <div className="space-y-4">
            {regularPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <a className="block group">
                  <div className="bg-gradient-to-r from-slate-800/40 to-slate-900/40 border border-slate-700/50 rounded-lg p-6 hover:border-purple-500/50 transition-all duration-300 hover:bg-slate-800/60 hover:shadow-lg hover:shadow-purple-500/10 hover:translate-x-1">
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`inline-block px-3 py-1 bg-gradient-to-r ${getCategoryColor(post.category)} bg-clip-text text-transparent text-xs font-bold`}>
                            {post.category}
                          </span>
                          <span className="text-xs text-slate-500">{post.date}</span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-purple-400 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-4">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {post.author}
                          </div>
                          <span>{post.readTime} min read</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <ArrowRight className="w-5 h-5 text-purple-400 group-hover:text-lime-400 transition-colors group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 border-y border-slate-700/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-100">
            Never Miss an <span className="text-cyan-400">Update</span>
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Subscribe to our newsletter for the latest electronics tutorials, IoT trends, and community updates
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
            <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-bold rounded-lg transition-all transform hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
