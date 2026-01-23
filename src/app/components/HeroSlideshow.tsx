import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { ImageWithFallback } from './utils/ImageWithFallback';
import newBannerImage from '../../assets/64e441218e34bc333780399c4111281f884c287b.png';
import img2 from '../../assets/acccbc17903dd2c553768dd3cfa0cd459c9d759c.png';
import img3 from '../../assets/0458372e744a526c75a9cdf75ff616deb45c0100.png';

const heroImages = [
  {
    id: 1,
    src: newBannerImage,
    alt: 'Professional Portrait',
  },
  {
    id: 2,
    src: img2,
    alt: 'Red Carpet Event',
  },
  {
    id: 3,
    src: img3,
    alt: 'Outdoor Portrait',
  },
];

export function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Background Slideshow */}
      {heroImages.map((image, index) => (
        <motion.div
          key={image.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: currentSlide === index ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <ImageWithFallback
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay - lighter on right to show face */}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-transparent" />
        </motion.div>
      ))}

      {/* Bottom Left Content - Text and Buttons */}
      <div className="absolute bottom-12 left-6 md:left-12 z-20 max-w-md">
        {/* Tagline Text - Above Buttons */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl lg:text-2xl text-ivory mb-3"
          style={{ fontFamily: 'var(--font-hook)', fontWeight: 300, fontStyle: 'italic' }}
        >
          "I entertain because I must."
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-sm md:text-base text-warm-grey/90 leading-relaxed mb-6"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Actor • Comedian • Storyteller
        </motion.p>

        {/* Buttons - Below Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-wrap gap-4"
        >
          <Button variant="glow" href="#gallery">View Gallery</Button>
          <Button variant="outline" href="#work">Watch Reel</Button>
        </motion.div>
      </div>

      {/* Navigation Dots - Bottom Center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide
              ? 'w-12 bg-amber'
              : 'w-2 bg-warm-grey/50 hover:bg-warm-grey'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}