import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/Button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Play, Sparkles, X } from 'lucide-react';

// Mock data for Ghibli episodes
const windChronicles = [
  { id: 1, title: 'The Wind Chronicles - Episode 1', subtitle: 'The Beginning', thumbnail: 'https://images.unsplash.com/photo-1638961862991-bd7ee1c9ecfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBmaWxtJTIwcHJvZHVjdGlvbnxlbnwxfHx8fDE3NjU4NjM4MzF8MA&ixlib=rb-4.1.0&q=80&w=1080', duration: '18:45', views: '234K' },
  { id: 2, title: 'The Wind Chronicles - Episode 2', subtitle: 'Rising Storm', thumbnail: 'https://images.unsplash.com/photo-1690074430713-8d2516e65a63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdHJlJTIwc3RhZ2UlMjBsaWdodHN8ZW58MXx8fHwxNzY1ODYzODMxfDA&ixlib=rb-4.1.0&q=80&w=1080', duration: '22:12', views: '198K' },
  { id: 3, title: 'The Wind Chronicles - Episode 3', subtitle: 'Ancient Whispers', thumbnail: 'https://images.unsplash.com/photo-1764763180662-e4791157a87f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdGVyJTIwYWN0b3IlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NjU4NjUxMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080', duration: '20:30', views: '187K' },
  { id: 4, title: 'The Wind Chronicles - Episode 4', subtitle: 'Valley of Dreams', thumbnail: 'https://images.unsplash.com/photo-1638961862991-bd7ee1c9ecfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBmaWxtJTIwcHJvZHVjdGlvbnxlbnwxfHx8fDE3NjU4NjM4MzF8MA&ixlib=rb-4.1.0&q=80&w=1080', duration: '24:18', views: '215K' },
];

const moonlitTales = [
  { id: 5, title: 'Moonlit Tales - Episode 1', subtitle: 'Silver Night', thumbnail: 'https://images.unsplash.com/photo-1690074430713-8d2516e65a63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdHJlJTIwc3RhZ2UlMjBsaWdodHN8ZW58MXx8fHwxNzY1ODYzODMxfDA&ixlib=rb-4.1.0&q=80&w=1080', duration: '19:22', views: '267K' },
  { id: 6, title: 'Moonlit Tales - Episode 2', subtitle: 'Forest Spirits', thumbnail: 'https://images.unsplash.com/photo-1764763180662-e4791157a87f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdGVyJTIwYWN0b3IlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NjU4NjUxMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080', duration: '21:45', views: '289K' },
  { id: 7, title: 'Moonlit Tales - Episode 3', subtitle: 'Luminous Path', thumbnail: 'https://images.unsplash.com/photo-1638961862991-bd7ee1c9ecfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBmaWxtJTIwcHJvZHVjdGlvbnxlbnwxfHx8fDE3NjU4NjM4MzF8MA&ixlib=rb-4.1.0&q=80&w=1080', duration: '23:10', views: '312K' },
  { id: 8, title: 'Moonlit Tales - Episode 4', subtitle: 'Starbound', thumbnail: 'https://images.unsplash.com/photo-1690074430713-8d2516e65a63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdHJlJTIwc3RhZ2UlMjBsaWdodHN8ZW58MXx8fHwxNzY1ODYzODMxfDA&ixlib=rb-4.1.0&q=80&w=1080', duration: '25:33', views: '345K' },
];

const spiritJourney = [
  { id: 9, title: 'Spirit Journey - Episode 1', subtitle: 'Awakening', thumbnail: 'https://images.unsplash.com/photo-1764763180662-e4791157a87f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdGVyJTIwYWN0b3IlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NjU4NjUxMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080', duration: '17:54', views: '156K' },
  { id: 10, title: 'Spirit Journey - Episode 2', subtitle: 'The Temple', thumbnail: 'https://images.unsplash.com/photo-1638961862991-bd7ee1c9ecfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBmaWxtJTIwcHJvZHVjdGlvbnxlbnwxfHx8fDE3NjU4NjM4MzF8MA&ixlib=rb-4.1.0&q=80&w=1080', duration: '20:15', views: '178K' },
  { id: 11, title: 'Spirit Journey - Episode 3', subtitle: 'Mystical Garden', thumbnail: 'https://images.unsplash.com/photo-1690074430713-8d2516e65a63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdHJlJTIwc3RhZ2UlMjBsaWdodHN8ZW58MXx8fHwxNzY1ODYzODMxfDA&ixlib=rb-4.1.0&q=80&w=1080', duration: '22:40', views: '203K' },
  { id: 12, title: 'Spirit Journey - Episode 4', subtitle: 'Return Home', thumbnail: 'https://images.unsplash.com/photo-1764763180662-e4791157a87f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdGVyJTIwYWN0b3IlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NjU4NjUxMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080', duration: '26:08', views: '245K' },
];

type TabType = 'wind' | 'moonlit' | 'spirit';

const tabs = [
  { id: 'wind' as TabType, label: 'The Wind Chronicles', subtitle: '4 Episodes' },
  { id: 'moonlit' as TabType, label: 'Moonlit Tales', subtitle: '4 Episodes' },
  { id: 'spirit' as TabType, label: 'Spirit Journey', subtitle: '4 Episodes' },
];

export function GhibliPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<TabType>('wind');
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Check if there's a tab parameter from the navigation
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab') as TabType;
    if (tab && ['wind', 'moonlit', 'spirit'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [location]);

  // Reset playing state when video changes
  useEffect(() => {
    if (selectedVideo) {
      setIsPlaying(false);
    }
  }, [selectedVideo]);

  const getEpisodes = () => {
    switch (activeTab) {
      case 'wind':
        return windChronicles;
      case 'moonlit':
        return moonlitTales;
      case 'spirit':
        return spiritJourney;
      default:
        return windChronicles;
    }
  };

  const currentEpisodes = getEpisodes();
  const selectedEpisode = [...windChronicles, ...moonlitTales, ...spiritJourney].find(ep => ep.id === selectedVideo);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-charcoal">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-charcoal/95 backdrop-blur-sm border-b border-amber/10">
        <div className="container mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-amber" />
              <h1 className="text-4xl text-ivory">Ghibli Stories</h1>
            </div>
            <Button variant="minimal" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-amber text-charcoal shadow-lg'
                    : 'bg-charcoal border border-amber/20 text-warm-grey hover:border-amber hover:text-amber'
                }`}
              >
                <div className="text-left">
                  <div className={activeTab === tab.id ? 'text-charcoal font-medium' : ''}>{tab.label}</div>
                  <div className={`text-xs ${activeTab === tab.id ? 'text-charcoal/70' : 'text-warm-grey/70'}`}>
                    {tab.subtitle}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Episodes Grid */}
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentEpisodes.map((episode, index) => (
              <motion.div
                key={episode.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedVideo(episode.id)}
                className="group relative overflow-hidden rounded-lg border border-amber/20 hover:border-amber/50 transition-all duration-300 cursor-pointer bg-charcoal/50"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={episode.thumbnail}
                    alt={episode.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-amber flex items-center justify-center">
                      <Play className="w-8 h-8 text-charcoal fill-charcoal ml-1" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 px-3 py-1 bg-charcoal/90 text-ivory text-sm rounded">
                    {episode.duration}
                  </div>

                  {/* Episode Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-amber text-sm mb-1">{episode.subtitle}</p>
                    <h3 className="text-2xl text-ivory mb-2">{episode.title}</h3>
                    <p className="text-warm-grey text-sm">{episode.views} views</p>
                  </div>
                </div>

                {/* Border glow effect */}
                <div className="absolute inset-0 rounded-lg ring-2 ring-transparent group-hover:ring-amber/30 transition-all duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Empty State */}
        {currentEpisodes.length === 0 && (
          <div className="text-center py-20">
            <p className="text-warm-grey text-lg">No episodes available yet. Check back soon!</p>
          </div>
        )}
      </div>

      {/* Video Popup Modal */}
      {selectedVideo && selectedEpisode && (
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
                src={selectedEpisode.thumbnail}
                alt={selectedEpisode.title}
                className="w-full h-full object-contain"
              />
              
              {/* Video overlay with play/pause controls */}
              <div 
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                  isPlaying ? 'bg-charcoal/20 opacity-0 hover:opacity-100' : 'bg-charcoal/60'
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
                  className="absolute top-4 left-4 px-3 py-1 bg-charcoal/80 text-ivory text-sm rounded-full backdrop-blur-sm flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber" />
                  Now Playing
                </motion.div>
              )}
            </div>

            {/* Video Info */}
            <div className="bg-charcoal/50 backdrop-blur-sm rounded-lg p-4 border border-amber/20 mt-3">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-amber text-xs mb-1">{selectedEpisode.subtitle}</p>
                  <h2 className="text-lg text-ivory mb-1">{selectedEpisode.title}</h2>
                  <div className="flex items-center gap-3 text-warm-grey text-sm">
                    <span>{selectedEpisode.views} views</span>
                    <span>•</span>
                    <span>{selectedEpisode.duration}</span>
                  </div>
                </div>
                <Sparkles className="w-6 h-6 text-amber flex-shrink-0" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}