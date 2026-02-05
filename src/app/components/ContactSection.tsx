import { motion } from 'motion/react';
import { Mail, Phone, Instagram, Send } from 'lucide-react';
import { Button } from './Button';
import { useState, FormEvent, useEffect } from 'react';
import emailjs from '@emailjs/browser';

// Vimeo Icon Component
const VimeoIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z" />
  </svg>
);

// Backstage Icon Component
const BackstageIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18L19.82 8 12 11.82 4.18 8 12 4.18zM4 9.72l7 3.5v7l-7-3.5v-7zm16 0v7l-7 3.5v-7l7-3.5z" opacity="0.6" />
  </svg>
);

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Auto-hide success/error message after 2 seconds
  useEffect(() => {
    if (submitStatus === 'success' || submitStatus === 'error') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Initialize EmailJS with your public key
      emailjs.init('iC6fmK4zswnMNLCfY');

      // Send email using EmailJS
      const result = await emailjs.send(
        'service_skeg7dj',  // Your Service ID
        'template_1lvx96f', // Your Template ID
        {
          from_name: formData.name,
          reply_to: formData.email,
          subject: formData.subject,
          message: formData.message,
        }
      );

      console.log('Email sent successfully:', result);
      setSubmitStatus('success');

      // Clear form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Email send failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <section id="contact" className="min-h-screen py-20 px-6 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber/5 to-charcoal pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-2 border border-amber/30 rounded-full mb-6">
            <span className="text-amber tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl mb-6 text-ivory" style={{ fontFamily: 'var(--font-heading)' }}>
            Let's Work Together
          </h2>
          <p className="text-warm-grey text-base md:text-lg max-w-2xl mx-auto">
            Available for auditions, bookings, and creative collaborations
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl md:text-3xl mb-6 text-ivory">Contact Information</h3>
              <div className="space-y-4">
                <a
                  href="mailto:contact@prashanthkrishnamoorthy.org"
                  className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg border border-amber/20 hover:border-amber/50 hover:bg-charcoal/50 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-burgundy/20 flex items-center justify-center flex-shrink-0 group-hover:bg-burgundy/30 transition-colors">
                    <Mail className="w-5 h-5 md:w-6 md:h-6 text-burgundy" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-warm-grey text-xs md:text-sm">Email</p>
                    <p className="text-ivory text-sm md:text-base break-all">contact@prashanthkrishnamoorthy.org</p>
                  </div>
                </a>

                <a
                  href="tel:+18484683766"
                  className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg border border-amber/20 hover:border-amber/50 hover:bg-charcoal/50 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-burgundy/20 flex items-center justify-center flex-shrink-0 group-hover:bg-burgundy/30 transition-colors">
                    <Phone className="w-5 h-5 md:w-6 md:h-6 text-burgundy" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-warm-grey text-xs md:text-sm">Phone</p>
                    <p className="text-ivory text-sm md:text-base">+1 848-468-3766</p>
                  </div>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg md:text-xl mb-4 text-ivory">Follow Me</h4>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/_takeiteasypolicy_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-amber/30 flex items-center justify-center hover:bg-burgundy hover:border-burgundy transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-ivory" />
                </a>
                <a
                  href="https://vimeo.com/1154850516"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-amber/30 flex items-center justify-center hover:bg-burgundy hover:border-burgundy transition-all duration-300"
                  aria-label="Vimeo"
                >
                  <VimeoIcon className="w-5 h-5 text-ivory" />
                </a>
                <a
                  href="https://www.backstage.com/u/prashanth-krishnamoorthy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-amber/30 flex items-center justify-center hover:bg-burgundy hover:border-burgundy transition-all duration-300"
                  aria-label="Backstage"
                >
                  <BackstageIcon className="w-5 h-5 text-ivory" />
                </a>
              </div>
            </div>

            <div className="pt-8 border-t border-amber/20">
              <h4 className="text-lg md:text-xl mb-4 text-ivory">Representation</h4>
              <div className="text-warm-grey space-y-2 text-sm md:text-base">
                <p>Agency Name</p>
                <p>Agent: John Smith</p>
                <p className="break-all">agent@agency.com</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form className="space-y-6 bg-charcoal border border-amber/20 rounded-lg p-4 md:p-8" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-ivory mb-2 text-sm md:text-base">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg bg-charcoal border border-amber/30 text-ivory placeholder-warm-grey focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/20 transition-all"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-ivory mb-2 text-sm md:text-base">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg bg-charcoal border border-amber/30 text-ivory placeholder-warm-grey focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/20 transition-all"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-ivory mb-2 text-sm md:text-base">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 rounded-lg bg-charcoal border border-amber/30 text-ivory placeholder-warm-grey focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/20 transition-all"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-ivory mb-2 text-sm md:text-base">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-charcoal border border-amber/30 text-ivory placeholder-warm-grey focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/20 transition-all resize-none"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <Button icon={false} disabled={isSubmitting}>
                <Send className="w-5 h-5" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>

              {submitStatus === 'success' && (
                <p className="text-green-500 mt-4">Message sent successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-500 mt-4">Failed to send message. Please try again.</p>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-20 pt-12 border-t border-amber/20 text-center"
      >
        <p className="text-warm-grey">
          © 2024 Your Name. All rights reserved.
        </p>
        <p className="text-warm-grey/60 text-sm mt-2">
          Designed with passion. Built for performance.
        </p>
      </motion.footer>
    </section>
  );
}