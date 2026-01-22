import { motion } from 'motion/react';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import img1 from '../../assets/8e9d64c4e107680915d204f3bd00d39e20618bec.png';
import img2 from '../../assets/acccbc17903dd2c553768dd3cfa0cd459c9d759c.png';
import img3 from '../../assets/0458372e744a526c75a9cdf75ff616deb45c0100.png';
import img4 from '../../assets/bba6341922c5723ed39cdea32de59640e0692282.png';
import img5 from '../../assets/fb7a97bcbc3caed94663f9394b53d1f1821076a5.png';
import img6 from '../../assets/ef7ab1b4865ccdb3afc63046f29771a8cfde0748.png';
import img7 from '../../assets/8bbe90c9ca0f88a9bea2a2f9e85e4ba1106e00e7.png';
import img8 from '../../assets/7451b8f7019cd39208fd41839da2c58063bc53ae.png';
import img9 from '../../assets/78c0bc0b7d5c35bd8a12c15f6ed475fbf9c40353.png';
import img10 from '../../assets/346f4140f8f91273ccc35e3727f46561025f127b.png';
import img11 from '../../assets/99b824e43702926b0f725f10d9d2570b83856cfe.png';
import img12 from '../../assets/1b614a3b5ba5d0200c233838167a1622552fc4ed.png';

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
    alt: 'Golden Hour Headshot',
    category: 'Headshots',
    caption: 'The magic hour',
  },
  {
    id: 7,
    src: img7,
    alt: 'Warm Evening Portrait',
    category: 'Headshots',
    caption: 'Studio warmth',
  },
  {
    id: 8,
    src: img8,
    alt: 'Formal Event Portrait',
    category: 'Events',
    caption: 'Awards ceremony',
  },
  {
    id: 9,
    src: img9,
    alt: 'Vacation Style',
    category: 'Travel',
    caption: 'Off-duty moments',
  },
  {
    id: 10,
    src: img10,
    alt: 'Night Shoot - Black Coat',
    category: 'Character',
    caption: 'Night exterior',
  },
  {
    id: 11,
    src: img11,
    alt: 'Gala Evening',
    category: 'Events',
    caption: 'Industry gala',
  },
  {
    id: 12,
    src: img12,
    alt: 'On Set - Film Production',
    category: 'Behind the Scenes',
    caption: 'The work behind the work',
  },
];

export function FullGallery() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Headshots', 'Character', 'Events', 'Lifestyle', 'Travel', 'Behind the Scenes'];

  const filteredImages = filter === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  const handlePrevious = () => {
    if (selectedImage === null) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    setSelectedImage(filteredImages[prevIndex].id);
  };

  const handleNext = () => {
    if (selectedImage === null) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage);
    const nextIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
    setSelectedImage(filteredImages[nextIndex].id);
  };

  const selectedImageData = filteredImages.find(img => img.id === selectedImage);

  return (
    <div className="min-h-screen bg-charcoal">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-charcoal/95 backdrop-blur-sm border-b border-amber/10">
        <div className="container mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl text-ivory">Full Gallery</h1>
            <Button variant="minimal" onClick={() => navigate('/')}>
              Back to Home
            </Button>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex gap-4 mt-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  filter === category
                    ? 'bg-amber text-charcoal'
                    : 'bg-charcoal border border-warm-grey/40 text-warm-grey hover:border-amber hover:text-amber'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-lg cursor-pointer aspect-square"
              onClick={() => setSelectedImage(image.id)}
            >
              <ImageWithFallback
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="inline-block px-3 py-1 bg-amber/20 text-amber text-xs rounded-full mb-2">
                    {image.category}
                  </span>
                  <h3 className="text-lg text-ivory">{image.alt}</h3>
                </div>
              </div>

              {/* Border accent */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber/50 rounded-lg transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && selectedImageData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-charcoal/95 backdrop-blur-lg flex items-center justify-center p-6"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-burgundy/80 hover:bg-burgundy flex items-center justify-center transition-colors duration-300"
          >
            <X className="w-6 h-6 text-ivory" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-burgundy/80 hover:bg-burgundy flex items-center justify-center transition-colors duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-ivory" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-burgundy/80 hover:bg-burgundy flex items-center justify-center transition-colors duration-300"
          >
            <ChevronRight className="w-6 h-6 text-ivory" />
          </button>

          {/* Image */}
          <div className="max-w-5xl max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <ImageWithFallback
              src={selectedImageData.src}
              alt={selectedImageData.alt}
              className="w-full h-full object-contain rounded-lg"
            />
            <div className="mt-4 text-center">
              <span className="inline-block px-4 py-2 bg-amber/20 text-amber rounded-full mb-2">
                {selectedImageData.category}
              </span>
              <h2 className="text-2xl text-ivory">{selectedImageData.alt}</h2>
              <p className="text-sm text-warm-grey mt-2">{selectedImageData.caption}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}