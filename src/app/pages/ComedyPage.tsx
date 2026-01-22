import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/Button';
import { ImageWithFallback } from '../components/utils/ImageWithFallback';
import { Play, Instagram, Music, Video, X } from 'lucide-react';

// Mock data for each comedy category
const standUpVideos = [
  { id: 1, title: 'Opening Night Special', platform: 'Instagram', thumbnail: 'https://images.unsplash.com/photo-1763669029170-5c70b7d78e89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21lZHklMjBwZXJmb3JtYW5jZSUyMHN0YWdlfGVufDF8fHx8MTc2NTg2MzgzMnww&ixlib=rb-4.1.0&q=80&w=1080', views: '125K', duration: '2:45' },
  { id: 2, title: 'Late Night Laughs', platform: 'Instagram', thumbnail: 'https://images.unsplash.com/photo-1690074430713-8d2516e65a63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdHJlJTIwc3RhZ2UlMjBsaWdodHN8ZW58MXx8fHwxNzY1ODYzODMxfDA&ixlib=rb-4.1.0&q=80&w=1080', views: '98K', duration: '3:12' },
  { id: 3, title: 'Stand-Up Spotlight', platform: 'Instagram', thumbnail: 'https://images.unsplash.com/photo-1764763180662-e4791157a87f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdGVyJTIwYWN0b3IlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NjU4NjUxMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080', views: '156K', duration: '4:02' },
  { id: 4, title: 'Comedy Club Series', platform: 'Instagram', thumbnail: 'https://images.unsplash.com/photo-1763669029170-5c70b7d78e89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21lZHklMjBwZXJmb3JtYW5jZSUyMHN0YWdlfGVufDF8fHx8MTc2NTg2MzgzMnww&ixlib=rb-4.1.0&q=80&w=1080', views: '203K', duration: '5:30' },
  { id: 5, title: 'Mic Check Moments', platform: 'Instagram', thumbnail: 'https://images.unsplash.com/photo-1690074430713-8d2516e65a63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdHJlJTIwc3RhZ2UlMjBsaWdodHN8ZW58MXx8fHwxNzY1ODYzODMxfDA&ixlib=rb-4.1.0&q=80&w=1080', views: '87K', duration: '2:18' },
  { id: 6, title: 'Best of Stand-Up', platform: 'Instagram', thumbnail: 'https://images.unsplash.com/photo-1764763180662-e4791157a87f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdGVyJTIwYWN0b3IlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NjU4NjUxMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080', views: '142K', duration: '3:45' },
];

const sketchVideos = [
  { id: 7, title: 'Character Chaos', platform: 'TikTok', thumbnail: 'https://images.unsplash.com/photo-1530983822321-fcac2d3c0f06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3RvciUyMGhlYWRzaG90JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY1Nzk2Mjk3fDA&ixlib=rb-4.1.0&q=80&w=1080', views: '89K', duration: '0:45' },
  { id: 8, title: 'Quick Sketch #1', platform: 'TikTok', thumbnail: 'https://images.unsplash.com/photo-1638961862991-bd7ee1c9ecfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBmaWxtJTIwcHJvZHVjdGlvbnxlbnwxfHx8fDE3NjU4NjM4MzF8MA&ixlib=rb-4.1.0&q=80&w=1080', views: '134K', duration: '1:00' },
  { id: 9, title: 'Comedy Duo', platform: 'TikTok', thumbnail: 'https://images.unsplash.com/photo-1764581659095-ad0447049ce0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMGNsYXBwZXJib2FyZCUyMHNjZW5lfGVufDF8fHx8MTc2NTg2MzgzMnww&ixlib=rb-4.1.0&q=80&w=1080', views: '267K', duration: '0:58' },
  { id: 10, title: 'Parody Series', platform: 'TikTok', thumbnail: 'https://images.unsplash.com/photo-1530983822321-fcac2d3c0f06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3RvciUyMGhlYWRzaG90JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY1Nzk2Mjk3fDA&ixlib=rb-4.1.0&q=80&w=1080', views: '178K', duration: '1:15' },
  { id: 11, title: 'Viral Sketch', platform: 'TikTok', thumbnail: 'https://images.unsplash.com/photo-1638961862991-bd7ee1c9ecfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBmaWxtJTIwcHJvZHVjdGlvbnxlbnwxfHx8fDE3NjU4NjM4MzF8MA&ixlib=rb-4.1.0&q=80&w=1080', views: '421K', duration: '0:52' },
  { id: 12, title: 'Behind the Scenes', platform: 'TikTok', thumbnail: 'https://images.unsplash.com/photo-1764581659095-ad0447049ce0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMGNsYXBwZXJib2FyZCUyMHNjZW5lfGVufDF8fHx8MTc2NTg2MzgzMnww&ixlib=rb-4.1.0&q=80&w=1080', views: '92K', duration: '1:22' },
];

const improvVideos = [
  { id: 13, title: 'Improv Workshop', platform: 'Vimeo', thumbnail: 'https://images.unsplash.com/photo-1623660142574-e41079a88c79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3RpbmclMjBhdWRpdGlvbiUyMHJlaGVhcnNhbHxlbnwxfHx8fDE3NjU4NjUxMjd8MA&ixlib=rb-4.1.0&q=80&w=1080', views: '67K', duration: '8:12' },
  { id: 14, title: 'Spontaneous Scene', platform: 'Vimeo', thumbnail: 'https://images.unsplash.com/photo-1691180273080-aacef51379d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwY2FtZXJhJTIwcHJvZHVjdGlvbnxlbnwxfHx8fDE3NjU4MDk3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080', views: '45K', duration: '6:34' },
  { id: 15, title: 'Yes, And...', platform: 'Vimeo', thumbnail: 'https://images.unsplash.com/photo-1609054422770-1e7f59be4e91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmFtYXRpYyUyMHBvcnRyYWl0JTIwbGlnaHRpbmd8ZW58MXx8fHwxNzY1ODUwMDU2fDA&ixlib=rb-4.1.0&q=80&w=1080', views: '78K', duration: '5:47' },
  { id: 16, title: 'Long Form Improv', platform: 'Vimeo', thumbnail: 'https://images.unsplash.com/photo-1623660142574-e41079a88c79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3RpbmclMjBhdWRpdGlvbiUyMHJlaGVhcnNhbHxlbnwxfHx8fDE3NjU4NjUxMjd8MA&ixlib=rb-4.1.0&q=80&w=1080', views: '112K', duration: '12:20' },
  { id: 17, title: 'Improv Games', platform: 'Vimeo', thumbnail: 'https://images.unsplash.com/photo-1691180273080-aacef51379d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwY2FtZXJhJTIwcHJvZHVjdGlvbnxlbnwxfHx8fDE3NjU4MDk3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080', views: '63K', duration: '7:18' },
  { id: 18, title: 'Ensemble Showcase', platform: 'Vimeo', thumbnail: 'https://images.unsplash.com/photo-1609054422770-1e7f59be4e91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmFtYXRpYyUyMHBvcnRyYWl0JTIwbGlnaHRpbmd8ZW58MXx8fHwxNzY1ODUwMDU2fDA&ixlib=rb-4.1.0&q=80&w=1080', views: '89K', duration: '9:45' },
];

type TabType = 'standup' | 'sketch' | 'improv';

const tabs = [
  { id: 'standup' as TabType, label: 'Stand-Up Special', subtitle: 'Instagram', icon: Instagram },
  { id: 'sketch' as TabType, label: 'Sketch Comedy', subtitle: 'TikTok', icon: Music },
  { id: 'improv' as TabType, label: 'Improv Moments', subtitle: 'Vimeo', icon: Video },
];

export function ComedyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<TabType>('standup');
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Check if there's a tab parameter from the navigation
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab') as TabType;
    if (tab && ['standup', 'sketch', 'improv'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [location]);

  // Reset playing state when video changes
  useEffect(() => {
    if (selectedVideo) {
      setIsPlaying(false);
    }
  }, [selectedVideo]);

  const getVideos = () => {
    switch (activeTab) {
      case 'standup':
        return standUpVideos;
      case 'sketch':
        return sketchVideos;
      case 'improv':
        return improvVideos;
      default:
        return standUpVideos;
    }
  };

  const currentVideos = getVideos();
  const selectedVideoData = [...standUpVideos, ...sketchVideos, ...improvVideos].find(v => v.id === selectedVideo);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-charcoal">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-charcoal/95 backdrop-blur-sm border-b border-amber/10">
        <div className="container mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl text-ivory">Comedy Reels</h1>
            <Button variant="minimal" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-300 whitespace-nowrap ${activeTab === tab.id
                      ? 'bg-burgundy text-ivory shadow-lg'
                      : 'bg-charcoal border border-amber/20 text-warm-grey hover:border-amber hover:text-amber'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <div className="text-left">
                    <div className={activeTab === tab.id ? 'text-ivory' : ''}>{tab.label}</div>
                    <div className={`text-xs ${activeTab === tab.id ? 'text-ivory/70' : 'text-warm-grey/70'}`}>
                      {tab.subtitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedVideo(video.id)}
                className="group relative overflow-hidden rounded-lg border border-amber/20 hover:border-amber/50 transition-all duration-300 cursor-pointer bg-charcoal/50"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-charcoal/40 group-hover:bg-charcoal/20 transition-colors duration-300">
                    <div className="w-16 h-16 rounded-full bg-burgundy group-hover:bg-amber flex items-center justify-center transition-colors duration-300">
                      <Play className="w-8 h-8 text-ivory fill-ivory ml-1" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-charcoal/80 text-ivory text-xs rounded">
                    {video.duration}
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-5">
                  <h3 className="text-xl mb-2 text-ivory group-hover:text-amber transition-colors duration-300">
                    {video.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-warm-grey text-sm">{video.platform}</p>
                    <p className="text-amber">{video.views} views</p>
                  </div>
                </div>

                {/* Border glow effect */}
                <div className="absolute inset-0 rounded-lg ring-2 ring-transparent group-hover:ring-amber/30 transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Empty State */}
        {currentVideos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-warm-grey text-lg">No videos available yet. Check back soon!</p>
          </div>
        )}
      </div>

      {/* Video Popup Modal */}
      {selectedVideo && selectedVideoData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-charcoal/95 backdrop-blur-lg flex items-center justify-center p-6"
          onClick={() => setSelectedVideo(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-burgundy hover:bg-burgundy/80 flex items-center justify-center transition-colors duration-300 z-10"
          >
            <X className="w-5 h-5 text-ivory" />
          </button>

          {/* Video Container - 75% of viewport */}
          <div className="w-[95vw] h-[92vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            {/* Video Player */}
            <div className="relative flex-1 bg-charcoal rounded-lg overflow-hidden">
              <ImageWithFallback
                src={selectedVideoData.thumbnail}
                alt={selectedVideoData.title}
                className="w-full h-full object-contain"
              />

              {/* Video overlay with play/pause controls */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'bg-charcoal/20 opacity-0 hover:opacity-100' : 'bg-charcoal/60'
                  }`}
                onClick={togglePlayPause}
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 rounded-full bg-amber/90 hover:bg-amber flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
                >
                  {isPlaying ? (
                    <div className="flex gap-1.5">
                      <div className="w-2 h-8 bg-charcoal rounded-sm" />
                      <div className="w-2 h-8 bg-charcoal rounded-sm" />
                    </div>
                  ) : (
                    <Play className="w-10 h-10 text-charcoal fill-charcoal ml-1" />
                  )}
                </motion.div>
              </div>

              {/* Status text when playing */}
              {isPlaying && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-4 left-4 px-3 py-1 bg-charcoal/80 text-ivory text-sm rounded-full backdrop-blur-sm"
                >
                  Now Playing
                </motion.div>
              )}
            </div>

            {/* Video Info */}
            <div className="bg-charcoal/50 backdrop-blur-sm rounded-lg p-4 border border-amber/20 mt-3">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-lg text-ivory mb-1">{selectedVideoData.title}</h2>
                  <div className="flex items-center gap-3 text-warm-grey text-sm">
                    <span className="flex items-center gap-1.5">
                      <Play className="w-3.5 h-3.5" />
                      {selectedVideoData.platform}
                    </span>
                    <span>•</span>
                    <span>{selectedVideoData.views} views</span>
                    <span>•</span>
                    <span>{selectedVideoData.duration}</span>
                  </div>
                </div>
                {activeTab === 'standup' && <Instagram className="w-6 h-6 text-burgundy flex-shrink-0" />}
                {activeTab === 'sketch' && <Music className="w-6 h-6 text-burgundy flex-shrink-0" />}
                {activeTab === 'improv' && <Video className="w-6 h-6 text-burgundy flex-shrink-0" />}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}