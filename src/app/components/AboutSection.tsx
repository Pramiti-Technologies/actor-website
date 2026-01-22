import { motion } from 'motion/react';
import { Award, Download, Quote } from 'lucide-react';
import { Button } from './Button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import clientImage from '../../assets/9a69738f76f7233608c1d51131db8d813e2919e4.png';

export function AboutSection() {
  return (
    <section id="about" className="min-h-screen py-20 px-6 bg-charcoal">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-2 border border-amber/30 rounded-full mb-6">
            <span className="text-amber tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>ABOUT ME</span>
          </div>
          <h2 className="text-5xl md:text-6xl mb-6 text-ivory" style={{ fontFamily: 'var(--font-heading)' }}>
            The Story Behind the Performance
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-lg overflow-hidden border-2 border-amber/30">
              <img
                src={clientImage}
                alt="Professional Headshot"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
              
              {/* Caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <p 
                  className="text-warm-grey/80 text-sm italic"
                  style={{ fontFamily: 'var(--font-hook)', fontWeight: 300 }}
                >
                  Los Angeles, 2024
                </p>
              </div>
            </div>
            
            {/* Decorative accent */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border-2 border-amber/20 rounded-lg -z-10" />
          </motion.div>

          {/* Bio Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-3xl text-ivory" style={{ fontFamily: 'var(--font-subsection)' }}>Industry Bio</h3>
              <p className="text-warm-grey leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                A versatile performer with over 10 years of experience across film, television, theatre, and comedy. 
                Known for bringing depth and authenticity to every role, from dramatic lead characters to comedic 
                supporting roles.
              </p>
              
              {/* Interruption Quote */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="my-8 py-6 px-8 border-l-4 border-amber bg-amber/5 rounded-r-lg"
              >
                <p className="text-ivory text-xl italic" style={{ fontFamily: 'var(--font-hook)', fontWeight: 400 }}>
                  "Most of the work happens when no one's watching."
                </p>
              </motion.div>
              
              <p className="text-warm-grey leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
                Trained at prestigious institutions and featured in award-winning productions. A storyteller at heart 
                with a passion for creating memorable moments that resonate with audiences.
              </p>
            </div>

            <div className="pt-6 border-t border-amber/20">
              <h4 className="text-xl text-ivory mb-4">Professional Highlights</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-amber flex-shrink-0 mt-1" />
                  <span className="text-warm-grey">Best Actor Award - Independent Film Festival 2024</span>
                </li>
                <li className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-amber flex-shrink-0 mt-1" />
                  <span className="text-warm-grey">Outstanding Performance - Regional Theatre Awards 2023</span>
                </li>
                <li className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-amber flex-shrink-0 mt-1" />
                  <span className="text-warm-grey">Audience Choice Award - Comedy Festival 2023</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <Button variant="secondary" icon={false}>
                <Download className="w-5 h-5" />
                Download Resume
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Extended Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-charcoal border border-amber/20 rounded-lg p-8 md:p-12 relative">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-amber/20" />
            
            <div className="relative z-10">
              <h3 className="text-3xl text-ivory mb-6">The Journey</h3>
              <div className="space-y-4 text-warm-grey leading-relaxed">
                <p>
                  My journey in the performing arts began on a small community theatre stage, where I discovered 
                  the transformative power of storytelling. What started as a childhood fascination evolved into 
                  a dedicated craft, shaped by years of training, collaboration, and countless hours of creative exploration.
                </p>
                <p>
                  From Shakespearean tragedy to contemporary comedy, I've had the privilege of inhabiting diverse 
                  characters and exploring the full spectrum of human experience. Each role has been an opportunity 
                  to connect with audiences on a deeper level, to share stories that entertain, challenge, and inspire.
                </p>
                <p>
                  Beyond the spotlight, I'm passionate about mentoring emerging artists and contributing to the 
                  creative community that has given me so much. Whether I'm on stage, in front of the camera, or 
                  behind the scenes, my commitment remains the same: to tell compelling stories with honesty, 
                  courage, and heart.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}