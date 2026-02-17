import React from 'react';
import { Github, MessageCircle, Facebook, Instagram, Youtube, Linkedin, Twitter } from 'lucide-react';

interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
  hoverColor: string;
  description: string;
}

const SocialMediaLinks: React.FC = () => {
  // Replace with your actual social media URLs
  const socialLinks: SocialLink[] = [
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      url: 'https://wa.me/92XXXXXXXXX?text=Hi%20Electronics%20Learning%20Hub!',
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700',
      description: 'Chat with us on WhatsApp'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      url: 'https://facebook.com/electronicslearninghub',
      icon: <Facebook className="w-6 h-6" />,
      color: 'from-blue-600 to-blue-700',
      hoverColor: 'hover:from-blue-700 hover:to-blue-800',
      description: 'Follow us on Facebook'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      url: 'https://instagram.com/electronics_learning_hub',
      icon: <Instagram className="w-6 h-6" />,
      color: 'from-pink-500 to-purple-600',
      hoverColor: 'hover:from-pink-600 hover:to-purple-700',
      description: 'Follow us on Instagram'
    },
    {
      id: 'youtube',
      name: 'YouTube',
      url: 'https://youtube.com/electronicslearninghub',
      icon: <Youtube className="w-6 h-6" />,
      color: 'from-red-600 to-red-700',
      hoverColor: 'hover:from-red-700 hover:to-red-800',
      description: 'Subscribe on YouTube'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      url: 'https://linkedin.com/company/electronics-learning-hub',
      icon: <Linkedin className="w-6 h-6" />,
      color: 'from-blue-700 to-blue-800',
      hoverColor: 'hover:from-blue-800 hover:to-blue-900',
      description: 'Connect on LinkedIn'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      url: 'https://twitter.com/ElectronicsHub',
      icon: <Twitter className="w-6 h-6" />,
      color: 'from-sky-500 to-sky-600',
      hoverColor: 'hover:from-sky-600 hover:to-sky-700',
      description: 'Follow us on Twitter'
    },
    {
      id: 'github',
      name: 'GitHub',
      url: 'https://github.com/AhmadZiaKhokhar/My-electronic-learning-websites-and-blogs',
      icon: <Github className="w-6 h-6" />,
      color: 'from-gray-700 to-gray-800',
      hoverColor: 'hover:from-gray-800 hover:to-gray-900',
      description: 'View source code on GitHub'
    }
  ];

  return (
    <div className="w-full py-8 px-4">
      {/* Section Title */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          Connect With Us
        </h2>
        <p className="text-center text-gray-300 text-lg max-w-2xl mx-auto">
          Follow us on social media for daily tips, course updates, and expert guidance. 
          Have questions? Chat with us on WhatsApp anytime!
        </p>
      </div>

      {/* Social Links Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden rounded-lg p-6 bg-gradient-to-br ${link.color} ${link.hoverColor} transition-all duration-300 transform hover:scale-105 hover:shadow-2xl`}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-white/10 blur-xl"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <div className="mb-3 text-white transform group-hover:scale-110 transition-transform duration-300">
                  {link.icon}
                </div>
                <h3 className="text-white font-bold text-center mb-1">{link.name}</h3>
                <p className="text-white/80 text-xs text-center">{link.description}</p>
              </div>

              {/* Border glow */}
              <div className="absolute inset-0 rounded-lg border border-white/20 group-hover:border-white/40 transition-colors duration-300"></div>
            </a>
          ))}
        </div>

        {/* WhatsApp Highlight Card */}
        <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 border border-green-500/30 rounded-lg p-8 mb-8 backdrop-blur-sm hover:border-green-400/50 transition-colors duration-300">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <MessageCircle className="w-8 h-8 text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-green-300 mb-2">💬 WhatsApp Business - Available 24/7</h3>
              <p className="text-gray-300 mb-4">
                Have questions about courses, need technical support, or want to learn more? 
                Message us on WhatsApp anytime! We're here to help you succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/92XXXXXXXXX?text=Hi%20Electronics%20Learning%20Hub!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  Start WhatsApp Chat
                </a>
                <a
                  href="https://wa.me/92XXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-900/50 to-green-800/50 hover:from-green-800/50 hover:to-green-700/50 text-green-300 font-bold rounded-lg border border-green-500/30 hover:border-green-400/50 transition-all duration-300"
                >
                  Call on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border border-blue-500/20 rounded-lg p-6 backdrop-blur-sm hover:border-blue-400/40 transition-colors duration-300">
            <h4 className="text-blue-300 font-bold mb-2">📧 Email</h4>
            <a
              href="mailto:contact@your-platform.com"
              className="text-gray-300 hover:text-blue-300 transition-colors duration-300 break-all"
            >
              contact@your-platform.com
            </a>
          </div>

          <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 border border-purple-500/20 rounded-lg p-6 backdrop-blur-sm hover:border-purple-400/40 transition-colors duration-300">
            <h4 className="text-purple-300 font-bold mb-2">🌐 Website</h4>
            <a
              href="https://your-platform.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-purple-300 transition-colors duration-300 break-all"
            >
              your-platform.com
            </a>
          </div>

          <div className="bg-gradient-to-br from-cyan-900/20 to-cyan-800/20 border border-cyan-500/20 rounded-lg p-6 backdrop-blur-sm hover:border-cyan-400/40 transition-colors duration-300">
            <h4 className="text-cyan-300 font-bold mb-2">💻 GitHub</h4>
            <a
              href="https://github.com/AhmadZiaKhokhar/My-electronic-learning-websites-and-blogs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-cyan-300 transition-colors duration-300 break-all"
            >
              View Source Code
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            Response time: WhatsApp (less than 4 hours) | Email (less than 24 hours) | Social Media (less than 24 hours)
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaLinks;
