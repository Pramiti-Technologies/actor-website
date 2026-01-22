import { motion } from 'motion/react';
import { Play, X, Sparkles, PlayCircle } from 'lucide-react';
import { Button } from './Button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import reelsImage from '../../assets/fbe14e6f990283a474dbc4b41b41c2541649c89d.png';
import advertisementImage from '../../assets/0dceb97f43355644a599ab718e4f4c565d65b355.png';

const actingProjects = [
  {
    id: 1,
    title: 'Performance Reel',
    role: 'Lead Role',
    type: 'Acting Reel',
    image: reelsImage,
    description: 'A powerful drama about redemption and second chances.',
    vimeoId: '1154850516', // Client's Vimeo public video
    instagramLink: null,
  },
  {
    id: 2,
    title: 'Advertisement',
    role: 'Supporting',
    type: 'Drama',
    image: advertisementImage,
    description: 'Award-winning stage performance at the renowned festival.',
    vimeoId: null, // Use Instagram link instead
    instagramLink: 'https://www.instagram.com/reel/CZ92v32J0eO/?igsh=dmh1dDc1am52dGt2',
  },
  {
    id: 3,
    title: 'Reels',
    role: 'Spokesperson',
    type: 'Commercial',
    image: reelsImage,
    description: 'National campaign for a major brand.',
    vimeoId: '1154850516', // Client's Vimeo public video
    instagramLink: null,
  },
];

const comedyReels = [
  {
    id: 1,
    title: 'Stand-Up Special',
    platform: 'Instagram',
    thumbnail: 'https://images.unsplash.com/photo-1763669029170-5c70b7d78e89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21lZHklMjBwZXJmb3JtYW5jZSUyMHN0YWdlfGVufDF8fHx8MTc2NTg2MzgzMnww&ixlib=rb-4.1.0&q=80&w=1080',
    views: '125K',
  },
  {
    id: 2,
    title: 'Sketch Comedy',
    platform: 'TikTok',
    thumbnail: 'https://images.unsplash.com/photo-1530983822321-fcac2d3c0f06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3RvciUyMGhlYWRzaG90JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY1Nzk2Mjk3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    views: '89K',
  },
  {
    id: 3,
    title: 'Improv Moments',
    platform: 'Vimeo',
    thumbnail: 'https://images.unsplash.com/photo-1764581659095-ad0447049ce0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMGNsYXBwZXJib2FyZCUyMHNjZW5lfGVufDF8fHx8MTc2NTg2MzgzMnww&ixlib=rb-4.1.0&q=80&w=1080',
    views: '67K',
  },
];

const ghibliStories = [
  {
    id: 1,
    title: 'The Wind Chronicles',
    episode: 'Episode 1',
    thumbnail: 'https://images.unsplash.com/photo-1638961862991-bd7ee1c9ecfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWF0aWMlMjBmaWxtJTIwcHJvZHVjdGlvbnxlbnwxfHx8fDE3NjU4NjM4MzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    title: 'Moonlit Tales',
    episode: 'Episode 2',
    thumbnail: 'https://images.unsplash.com/photo-1690074430713-8d2516e65a63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdHJlJTIwc3RhZ2UlMjBsaWdodHN8ZW58MXx8fHwxNzY1ODYzODMxfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function WorkSection() {
  const [playingVideoId, setPlayingVideoId] = useState<number | null>(null);
  const navigate = useNavigate();

  // Generate Vimeo embed URL with user controls
  const getVimeoEmbedUrl = (vimeoId: string) => {
    // Vimeo player with visible controls for user to control playback
    return `https://player.vimeo.com/video/${vimeoId}?byline=0&title=0&portrait=0&controls=1&color=E0A458&background=1&muted=0`;
  };

  // Generate Instagram embed URL from reel link
  const getInstagramEmbedUrl = (instagramLink: string) => {
    // Extract reel ID from URL like: https://www.instagram.com/reel/CZ92v32J0eO/?igsh=...
    const reelId = instagramLink.match(/\/reel\/([^/?]+)/)?.[1];
    if (reelId) {
      // Use embed URL with autoplay parameter
      return `https://www.instagram.com/p/${reelId}/embed/captioned/?cr=1&v=14&rd=https%3A%2F%2Fwww.instagram.com&autoplay=1`;
    }
    return null;
  };

  return (
    <section id="work" className="min-h-screen py-20 px-6 bg-charcoal">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-block px-6 py-2 border border-amber/30 rounded-full mb-6">
            <span className="text-amber tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>MY WORK</span>
          </div>
          <h2 className="text-5xl md:text-6xl mb-6 text-ivory" style={{ fontFamily: 'var(--font-heading)' }}>
            Performance Portfolio
          </h2>
          <p className="text-warm-grey text-lg max-w-2xl mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
            From stage to screen, bringing characters to life with depth and authenticity
          </p>
        </motion.div>

        {/* Acting Projects */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl mb-8 text-ivory"
            style={{ fontFamily: 'var(--font-subsection)' }}
          >
            Acting
          </motion.h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {actingProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-lg bg-charcoal border border-amber/20 hover:border-amber/50 transition-all duration-300"
              >
                {/* Video Player or Thumbnail with Play Button */}
                <div className="relative overflow-hidden aspect-[4/5] bg-black">
                  {playingVideoId === project.id && project.vimeoId ? (
                    // Vimeo Video Playing - User Controls with Vimeo Player
                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                      <iframe
                        src={getVimeoEmbedUrl(project.vimeoId)}
                        className="absolute top-1/2 left-1/2 w-[177.78vh] h-[177.78%] min-w-full min-h-full"
                        style={{ transform: 'translate(-50%, -50%)' }}
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      />
                      
                      {/* Close Button */}
                      <button
                        onClick={() => setPlayingVideoId(null)}
                        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-burgundy/90 hover:bg-burgundy flex items-center justify-center transition-colors shadow-lg"
                        aria-label="Close video"
                      >
                        <X className="w-5 h-5 text-ivory" />
                      </button>
                    </div>
                  ) : playingVideoId === project.id && project.instagramLink ? (
                    // Instagram Video Playing - Embedded Instagram Player (styled to show video only)
                    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
                      <iframe
                        src={getInstagramEmbedUrl(project.instagramLink) || ''}
                        className="absolute w-[400%] h-[400%]"
                        style={{ 
                          top: '-150%',
                          left: '-150%',
                          transform: 'scale(0.8)',
                        }}
                        frameBorder="0"
                        scrolling="no"
                      />
                      
                      {/* Close Button */}
                      <button
                        onClick={() => setPlayingVideoId(null)}
                        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-burgundy/90 hover:bg-burgundy flex items-center justify-center transition-colors shadow-lg"
                        aria-label="Close video"
                      >
                        <X className="w-5 h-5 text-ivory" />
                      </button>
                    </div>
                  ) : (
                    // Thumbnail with Play Button
                    <>
                      <ImageWithFallback
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                      
                      {/* Play Button Overlay */}
                      {(project.vimeoId || project.instagramLink) && (
                        <button
                          onClick={() => setPlayingVideoId(project.id)}
                          className="absolute inset-0 flex items-center justify-center z-10"
                          aria-label={`Play ${project.title}`}
                        >
                          <div className="w-20 h-20 rounded-full bg-burgundy/80 backdrop-blur-sm flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 border-2 border-amber/50">
                            <Play className="w-10 h-10 text-ivory ml-1" fill="currentColor" />
                          </div>
                        </button>
                      )}
                    </>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-3 py-1 rounded-full bg-amber/20 text-amber border border-amber/30">
                      {project.type}
                    </span>
                    <span className="text-xs text-warm-grey">{project.role}</span>
                  </div>
                  <h3 className="text-xl mb-2 text-ivory" style={{ fontFamily: 'var(--font-subsection)' }}>
                    {project.title}
                  </h3>
                  <p className="text-sm text-warm-grey" style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Backstage CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Button variant="primary" href="https://www.backstage.com" target="_blank">
              View Full Profile on Backstage
            </Button>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-amber/30 to-transparent mb-20" />

        {/* Comedy & Ghibli Stories */}
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Comedy Reels */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-6 h-6 text-amber" />
              <h3 className="text-3xl md:text-4xl text-ivory" style={{ fontFamily: 'var(--font-subsection)' }}>
                Comedy Reels
              </h3>
            </div>
            
            <div className="space-y-4 mb-8">
              {comedyReels.map((reel, index) => (
                <motion.div
                  key={reel.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-lg border border-amber/20 hover:border-amber/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex gap-4 p-4">
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={reel.thumbnail}
                        alt={reel.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-burgundy/20 group-hover:bg-burgundy/40 transition-colors flex items-center justify-center">
                        <PlayCircle className="w-8 h-8 text-ivory" />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="text-ivory mb-1 group-hover:text-amber transition-colors" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                        {reel.title}
                      </h4>
                      <p className="text-sm text-warm-grey">
                        {reel.platform} • {reel.views} views
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button variant="outline" onClick={() => navigate('/comedy-reels')}>
              View All Comedy
            </Button>
          </motion.div>

          {/* Ghibli Stories */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-6 h-6 text-amber" />
              <h3 className="text-3xl md:text-4xl text-ivory" style={{ fontFamily: 'var(--font-subsection)' }}>
                Ghibli Stories
              </h3>
            </div>
            
            <div className="space-y-4 mb-8">
              {ghibliStories.map((story, index) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-lg border border-amber/20 hover:border-amber/50 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex gap-4 p-4">
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={story.thumbnail}
                        alt={story.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-burgundy/20 group-hover:bg-burgundy/40 transition-colors flex items-center justify-center">
                        <PlayCircle className="w-8 h-8 text-ivory" />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="text-ivory mb-1 group-hover:text-amber transition-colors" style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                        {story.title}
                      </h4>
                      <p className="text-sm text-warm-grey">{story.episode}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button variant="outline" onClick={() => navigate('/ghibli-stories')}>
              View All Stories
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}