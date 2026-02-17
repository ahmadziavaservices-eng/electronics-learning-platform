import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Play, ExternalLink, Search, Clock, User, Eye, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

interface VideoTutorial {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  topic: string;
  instructor?: string;
  views?: string;
  likes?: string;
  tags?: string[];
}

interface VideoTutorialsProps {
  moduleTitle: string;
  videos: VideoTutorial[];
}

export function VideoTutorials({ moduleTitle, videos }: VideoTutorialsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<VideoTutorial | null>(videos[0] || null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const topics = Array.from(new Set(videos.map(v => v.topic)));
  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (video.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) || false);
    const matchesDifficulty = !selectedDifficulty || video.difficulty === selectedDifficulty;
    const matchesTopic = !selectedTopic || video.topic === selectedTopic;
    return matchesSearch && matchesDifficulty && matchesTopic;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-900/20 border-green-500/50 text-green-400';
      case 'Intermediate':
        return 'bg-yellow-900/20 border-yellow-500/50 text-yellow-400';
      case 'Advanced':
        return 'bg-red-900/20 border-red-500/50 text-red-400';
      default:
        return 'bg-slate-800 border-slate-700 text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Video Player */}
      {selectedVideo && (
        <Card className="bg-slate-900 border-cyan-500/30 overflow-hidden">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-cyan-400">{selectedVideo.title}</CardTitle>
                <CardDescription>{selectedVideo.description}</CardDescription>
              </div>
              <Badge className={`flex-shrink-0 ${getDifficultyColor(selectedVideo.difficulty)}`}>
                {selectedVideo.difficulty}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* YouTube Embed */}
            <div className="relative w-full bg-black rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?rel=0`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-slate-800 p-3 rounded">
                <p className="text-sm text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> Duration</p>
                <p className="text-sm font-semibold text-cyan-400 mt-1">{selectedVideo.duration}</p>
              </div>
              {selectedVideo.instructor && (
                <div className="bg-slate-800 p-3 rounded">
                  <p className="text-sm text-slate-400 flex items-center gap-1"><User className="w-3 h-3" /> Instructor</p>
                  <p className="text-sm font-semibold text-cyan-400 mt-1">{selectedVideo.instructor}</p>
                </div>
              )}
              {selectedVideo.views && (
                <div className="bg-slate-800 p-3 rounded">
                  <p className="text-sm text-slate-400 flex items-center gap-1"><Eye className="w-3 h-3" /> Views</p>
                  <p className="text-sm font-semibold text-cyan-400 mt-1">{selectedVideo.views}</p>
                </div>
              )}
              {selectedVideo.likes && (
                <div className="bg-slate-800 p-3 rounded">
                  <p className="text-sm text-slate-400 flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> Likes</p>
                  <p className="text-sm font-semibold text-cyan-400 mt-1">{selectedVideo.likes}</p>
                </div>
              )}
            </div>

            {/* Tags */}
            {selectedVideo.tags && selectedVideo.tags.length > 0 && (
              <div>
                <p className="text-sm text-slate-400 mb-2">Topics Covered:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedVideo.tags.map((tag, idx) => (
                    <Badge key={idx} className="bg-blue-900/30 border-blue-500/50 text-blue-400">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 flex-wrap">
              <a
                href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Watch on YouTube
              </a>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search & Filters */}
      {videos.length > 1 && (
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-300">🔍 Search & Filter</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-700 text-white placeholder-slate-400"
              />
            </div>

            {/* Difficulty Filter */}
            <div>
              <p className="text-sm text-slate-400 mb-2 uppercase">Difficulty</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={selectedDifficulty === null ? 'default' : 'outline'}
                  onClick={() => setSelectedDifficulty(null)}
                  className={selectedDifficulty === null ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-600 text-slate-300 hover:bg-slate-800'}
                >
                  All
                </Button>
                {difficulties.map(diff => (
                  <Button
                    key={diff}
                    size="sm"
                    variant={selectedDifficulty === diff ? 'default' : 'outline'}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={selectedDifficulty === diff ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-600 text-slate-300 hover:bg-slate-800'}
                  >
                    {diff}
                  </Button>
                ))}
              </div>
            </div>

            {/* Topic Filter */}
            <div>
              <p className="text-sm text-slate-400 mb-2 uppercase">Topic</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={selectedTopic === null ? 'default' : 'outline'}
                  onClick={() => setSelectedTopic(null)}
                  className={selectedTopic === null ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-600 text-slate-300 hover:bg-slate-800'}
                >
                  All
                </Button>
                {topics.map(topic => (
                  <Button
                    key={topic}
                    size="sm"
                    variant={selectedTopic === topic ? 'default' : 'outline'}
                    onClick={() => setSelectedTopic(topic)}
                    className={selectedTopic === topic ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-600 text-slate-300 hover:bg-slate-800'}
                  >
                    {topic}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Video Playlist */}
      {filteredVideos.length > 0 && (
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-300">📺 Video Playlist</CardTitle>
            <CardDescription>{filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''} found</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredVideos.map((video, index) => (
                <button
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className={`w-full p-3 rounded text-left transition border ${
                    selectedVideo?.id === video.id
                      ? 'bg-cyan-900/30 border-cyan-500/50'
                      : 'bg-slate-800 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-slate-700 p-2 rounded flex-shrink-0">
                      <Play className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-200 text-sm">{video.title}</p>
                      <p className="text-sm text-slate-400 mt-1">{video.duration}</p>
                    </div>
                    <span className={`text-sm font-semibold px-2 py-1 rounded flex-shrink-0 ${getDifficultyColor(video.difficulty)}`}>
                      {video.difficulty}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {filteredVideos.length === 0 && (
        <Card className="bg-slate-900 border-slate-700">
          <CardContent className="py-8 text-center">
            <p className="text-slate-400">No videos found matching your filters.</p>
          </CardContent>
        </Card>
      )}

      {/* Learning Tips */}
      <Card className="bg-blue-900/20 border-blue-500/50">
        <CardHeader>
          <CardTitle className="text-blue-400">💡 Learning Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-blue-200">
          <p>• Watch the video once without pausing to get the overview</p>
          <p>• Watch again and pause to take notes on key concepts</p>
          <p>• Try to build the circuit or project while watching</p>
          <p>• Rewatch sections you don't understand</p>
          <p>• Use the calculators to verify calculations shown in videos</p>
          <p>• Refer to the course materials for more detailed explanations</p>
        </CardContent>
      </Card>
    </div>
  );
}
