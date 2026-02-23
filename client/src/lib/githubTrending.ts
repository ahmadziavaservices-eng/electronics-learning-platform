// GitHub Trending API Integration for real-time tech updates
// This fetches trending repositories and converts them to fun facts

export interface TechUpdate {
  id: string;
  title: string;
  description: string;
  category: string;
  link: string;
  timestamp: string;
}

// Fallback fun facts if API fails
const FALLBACK_UPDATES: Record<string, TechUpdate[]> = {
  'power-electronics': [
    {
      id: '1',
      title: 'GaN Transistors Revolution',
      description: 'Gallium Nitride (GaN) transistors are 10x faster than silicon and generate 50% less heat!',
      category: 'Power Electronics',
      link: '#',
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Wireless Power Transfer',
      description: 'New resonant inductive coupling can transfer 50W wirelessly over 1 meter distance!',
      category: 'Power Electronics',
      link: '#',
      timestamp: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Ultra-Fast Charging',
      description: 'Graphene-based capacitors can charge to 80% in just 8 seconds!',
      category: 'Power Electronics',
      link: '#',
      timestamp: new Date().toISOString(),
    },
  ],
  'ai-ml': [
    {
      id: '4',
      title: 'AI Chip Breakthrough',
      description: 'New neuromorphic chips process data 1000x faster than traditional CPUs!',
      category: 'AI & ML',
      link: '#',
      timestamp: new Date().toISOString(),
    },
    {
      id: '5',
      title: 'Quantum Machine Learning',
      description: 'Quantum computers can solve certain ML problems 100 million times faster!',
      category: 'AI & ML',
      link: '#',
      timestamp: new Date().toISOString(),
    },
    {
      id: '6',
      title: 'Edge AI Revolution',
      description: 'AI models now run on microcontrollers with just 256KB of RAM!',
      category: 'AI & ML',
      link: '#',
      timestamp: new Date().toISOString(),
    },
  ],
  'iot': [
    {
      id: '7',
      title: 'IoT Security Milestone',
      description: 'New zero-trust IoT protocol reduces vulnerabilities by 99.9%!',
      category: 'IoT',
      link: '#',
      timestamp: new Date().toISOString(),
    },
    {
      id: '8',
      title: 'MQTT 5.0 Released',
      description: 'MQTT 5.0 supports 1 million concurrent connections per broker!',
      category: 'IoT',
      link: '#',
      timestamp: new Date().toISOString(),
    },
    {
      id: '9',
      title: 'LoRaWAN Coverage',
      description: 'LoRaWAN now covers 195 countries with 100+ million devices connected!',
      category: 'IoT',
      link: '#',
      timestamp: new Date().toISOString(),
    },
  ],
  'robotics': [
    {
      id: '10',
      title: 'Soft Robotics Breakthrough',
      description: 'New soft robots can lift 1000x their own weight without breaking!',
      category: 'Robotics',
      link: '#',
      timestamp: new Date().toISOString(),
    },
    {
      id: '11',
      title: 'Swarm Robotics',
      description: '10,000 robots coordinated to build structures autonomously!',
      category: 'Robotics',
      link: '#',
      timestamp: new Date().toISOString(),
    },
    {
      id: '12',
      title: 'Bio-Inspired Robots',
      description: 'New robots mimic octopus intelligence with distributed neural networks!',
      category: 'Robotics',
      link: '#',
      timestamp: new Date().toISOString(),
    },
  ],
  'microcontrollers': [
    {
      id: '13',
      title: 'RISC-V Revolution',
      description: 'Open-source RISC-V microcontrollers are 50% cheaper than ARM!',
      category: 'Microcontrollers',
      link: '#',
      timestamp: new Date().toISOString(),
    },
    {
      id: '14',
      title: 'Ultra-Low Power MCU',
      description: 'New MCU runs for 10 years on a single AA battery!',
      category: 'Microcontrollers',
      link: '#',
      timestamp: new Date().toISOString(),
    },
    {
      id: '15',
      title: 'MCU with Built-in AI',
      description: 'Microcontroller with 1 TOPS AI acceleration for edge computing!',
      category: 'Microcontrollers',
      link: '#',
      timestamp: new Date().toISOString(),
    },
  ],
};

// Map section names to categories
const SECTION_CATEGORY_MAP: Record<string, string> = {
  'featured-courses': 'microcontrollers',
  'trending-topics': 'ai-ml',
  'tech-news': 'iot',
  'future-features': 'robotics',
  'power-supply': 'power-electronics',
};

// Get random update for a section
export function getRandomUpdate(section: string): TechUpdate {
  const category = SECTION_CATEGORY_MAP[section] || 'microcontrollers';
  const updates = FALLBACK_UPDATES[category] || FALLBACK_UPDATES['microcontrollers'];
  return updates[Math.floor(Math.random() * updates.length)];
}

// Get multiple random updates
export function getRandomUpdates(section: string, count: number = 3): TechUpdate[] {
  const category = SECTION_CATEGORY_MAP[section] || 'microcontrollers';
  const updates = FALLBACK_UPDATES[category] || FALLBACK_UPDATES['microcontrollers'];
  const shuffled = [...updates].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Fetch trending repos from GitHub (with fallback)
export async function fetchGitHubTrending(): Promise<TechUpdate[]> {
  try {
    // Using GitHub search API to find trending repositories
    const response = await fetch(
      'https://api.github.com/search/repositories?q=stars:>10000&sort=stars&order=desc&per_page=10',
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) throw new Error('GitHub API error');

    const data = await response.json();

    return data.items.map((repo: any, index: number) => ({
      id: `github-${index}`,
      title: repo.name,
      description: repo.description || 'Popular open-source project',
      category: 'GitHub Trending',
      link: repo.html_url,
      timestamp: new Date().toISOString(),
    }));
  } catch (error) {
    console.warn('Failed to fetch GitHub trending:', error);
    // Return fallback updates
    return [
      ...FALLBACK_UPDATES['ai-ml'],
      ...FALLBACK_UPDATES['iot'],
    ].slice(0, 10);
  }
}

// Get all available updates
export function getAllUpdates(): TechUpdate[] {
  return Object.values(FALLBACK_UPDATES).flat();
}

// Get updates by category
export function getUpdatesByCategory(category: string): TechUpdate[] {
  return FALLBACK_UPDATES[category] || [];
}
