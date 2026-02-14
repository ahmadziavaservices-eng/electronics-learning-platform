import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface VideoTutorial {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  topic: string;
}

interface VideoTutorialsProps {
  moduleTitle: string;
  videos: VideoTutorial[];
}

export function VideoTutorials({ moduleTitle, videos }: VideoTutorialsProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoTutorial | null>(videos[0] || null);

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
            <CardTitle className="text-cyan-400">{selectedVideo.title}</CardTitle>
            <CardDescription>{selectedVideo.description}</CardDescription>
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

            {/* Video Info */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-800 p-3 rounded">
                <p className="text-xs text-slate-400">Duration</p>
                <p className="text-sm font-semibold text-cyan-400">{selectedVideo.duration}</p>
              </div>
              <div className={`p-3 rounded border ${getDifficultyColor(selectedVideo.difficulty)}`}>
                <p className="text-xs text-slate-400">Difficulty</p>
                <p className="text-sm font-semibold">{selectedVideo.difficulty}</p>
              </div>
              <div className="bg-slate-800 p-3 rounded">
                <p className="text-xs text-slate-400">Topic</p>
                <p className="text-sm font-semibold text-cyan-400">{selectedVideo.topic}</p>
              </div>
            </div>

            {/* Video Description */}
            <div className="bg-slate-800 p-4 rounded border border-slate-700">
              <p className="text-sm text-slate-300 leading-relaxed">{selectedVideo.description}</p>
            </div>

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

      {/* Video Playlist */}
      {videos.length > 1 && (
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-slate-300">📺 Video Playlist</CardTitle>
            <CardDescription>{videos.length} videos in this module</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {videos.map((video, index) => (
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
                      <p className="font-semibold text-slate-200 text-sm">{index + 1}. {video.title}</p>
                      <p className="text-xs text-slate-400 mt-1">{video.duration}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded flex-shrink-0 ${getDifficultyColor(video.difficulty)}`}>
                      {video.difficulty}
                    </span>
                  </div>
                </button>
              ))}
            </div>
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
