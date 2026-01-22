import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HeroSlideshow } from './components/HeroSlideshow';
import { WorkSection } from './components/WorkSection';
import { CreditsSection } from './components/CreditsSection';
import { GallerySection } from './components/GallerySection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { FullGallery } from './pages/FullGallery';
import { ComedyPage } from './pages/ComedyPage';
import { GhibliPage } from './pages/GhibliPage';

function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSlideshow />
        <WorkSection />
        <CreditsSection />
        <GallerySection />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-charcoal text-ivory">
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<FullGallery />} />
          <Route path="/comedy-reels" element={<ComedyPage />} />
          <Route path="/ghibli-stories" element={<GhibliPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}