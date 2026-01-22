import { motion } from 'motion/react';
import { Film, Tv, Theater, Mic } from 'lucide-react';

const credits = [
  {
    category: 'Film',
    icon: Film,
    projects: [
      { title: 'The Last Performance', role: 'Lead', year: '2024' },
      { title: 'Midnight Boulevard', role: 'Supporting', year: '2023' },
      { title: 'City Lights', role: 'Ensemble', year: '2022' },
    ],
  },
  {
    category: 'Television',
    icon: Tv,
    projects: [
      { title: 'Drama Series (Season 3)', role: 'Recurring', year: '2024' },
      { title: 'Comedy Special', role: 'Guest Star', year: '2023' },
      { title: 'Medical Drama', role: 'Co-Star', year: '2022' },
    ],
  },
  {
    category: 'Theatre',
    icon: Theater,
    projects: [
      { title: 'Hamlet', role: 'Laertes', year: '2024' },
      { title: 'A Midsummer Night\'s Dream', role: 'Puck', year: '2023' },
      { title: 'Death of a Salesman', role: 'Bernard', year: '2022' },
    ],
  },
  {
    category: 'Voiceover',
    icon: Mic,
    projects: [
      { title: 'National Commercial Campaign', role: 'Voice', year: '2024' },
      { title: 'Animated Series', role: 'Character Voice', year: '2023' },
      { title: 'Documentary Narration', role: 'Narrator', year: '2023' },
    ],
  },
];

export function CreditsSection() {
  return (
    <section id="credits" className="min-h-screen py-20 px-6 bg-charcoal">
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
            <span className="text-amber tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>CREDITS</span>
          </div>
          <h2 className="text-5xl md:text-6xl mb-6 text-ivory" style={{ fontFamily: 'var(--font-heading)' }}>
            Professional Experience
          </h2>
          <p className="text-warm-grey text-lg max-w-2xl mx-auto">
            A comprehensive record of performances across film, television, theatre, and voiceover
          </p>
        </motion.div>

        {/* Credits Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {credits.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="bg-charcoal border border-amber/20 rounded-lg p-8 hover:border-amber/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-burgundy/20 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-burgundy" />
                  </div>
                  <h3 className="text-2xl text-ivory">{category.category}</h3>
                </div>

                <div className="space-y-4">
                  {category.projects.map((project, projectIndex) => (
                    <motion.div
                      key={projectIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: (categoryIndex * 0.1) + (projectIndex * 0.05) }}
                      className="flex items-start justify-between py-3 border-b border-amber/10 last:border-0"
                    >
                      <div className="flex-1">
                        <h4 className="text-ivory mb-1">{project.title}</h4>
                        <p className="text-warm-grey text-sm">{project.role}</p>
                      </div>
                      <span className="text-amber ml-4">{project.year}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}