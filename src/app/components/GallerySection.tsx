import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';
import img1 from '../../assets/8e9d64c4e107680915d204f3bd00d39e20618bec.png';
import img2 from '../../assets/acccbc17903dd2c553768dd3cfa0cd459c9d759c.png';
import img3 from '../../assets/0458372e744a526c75a9cdf75ff616deb45c0100.png';
import img4 from '../../assets/bba6341922c5723ed39cdea32de59640e0692282.png';
import img5 from '../../assets/fb7a97bcbc3caed94663f9394b53d1f1821076a5.png';
import img6 from '../../assets/ef7ab1b4865ccdb3afc63046f29771a8cfde0748.png';

const galleryImages = [
  {
    id: 1,
    src: img1,
    alt: 'Medieval Warrior Character',
    category: 'Character',
    caption: 'On set, fully in character',
  },
  {
    id: 2,
    src: img2,
    alt: 'Red Carpet Event',
    category: 'Events',
    caption: 'Film premiere night',
  },
  {
    id: 3,
    src: img3,
    alt: 'Outdoor Portrait',
    category: 'Lifestyle',
    caption: 'Natural light session',
  },
  {
    id: 4,
    src: img4,
    alt: 'Miami Boulevard',
    category: 'Lifestyle',
    caption: 'Between takes',
  },
  {
    id: 5,
    src: img5,
    alt: 'Mountain Vista',
    category: 'Travel',
    caption: 'Location scouting',
  },
  {
    id: 6,
    src: img6,
    alt: 'Golden Hour',
    category: 'Headshots',
    caption: 'The magic hour',
  },
];

export function GallerySection() {
  const navigate = useNavigate();
  
  return (
    <section id="gallery" className="min-h-screen py-20 px-6 relative overflow-hidden">
      {/* Amber accent background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-2 border border-amber/30 rounded-full mb-6">
            <span className="text-amber tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>PHOTO GALLERY</span>
          </div>
          <h2 className="text-5xl md:text-6xl mb-6 text-ivory" style={{ fontFamily: 'var(--font-heading)' }}>
            Captured Moments
          </h2>
          <p className="text-warm-grey text-lg max-w-2xl mx-auto">
            A collection of professional headshots and behind-the-scenes moments
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-square">
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="inline-block px-3 py-1 bg-amber/20 text-amber text-xs rounded-full mb-2">
                      {image.category}
                    </span>
                    <h3 className="text-xl text-ivory">{image.alt}</h3>
                    <p className="text-sm text-warm-grey">{image.caption}</p>
                  </div>
                </div>

                {/* Border accent */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber/50 rounded-lg transition-colors duration-300" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View Full Gallery Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Button variant="glow" onClick={() => navigate('/gallery')} rounded>
            View Full Gallery
          </Button>
        </motion.div>
      </div>
    </section>
  );
}