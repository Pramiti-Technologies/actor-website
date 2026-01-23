import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  target?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'glow' | 'slide' | 'minimal';
  icon?: boolean;
  rounded?: boolean;
  disabled?: boolean;
}

export function Button({ children, href, target, onClick, variant = 'primary', icon = true, rounded = false, disabled = false }: ButtonProps) {
  const navigate = useNavigate();

  const getButtonStyles = () => {
    const roundedClass = rounded ? 'rounded-full' : 'rounded-sm';

    switch (variant) {
      case 'primary':
        return {
          className: `relative inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-10 md:py-5 bg-burgundy text-ivory text-sm md:text-base ${roundedClass} overflow-hidden group shadow-lg hover:shadow-2xl`,
          hoverEffect: (
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r from-burgundy-hover to-burgundy ${roundedClass}`}
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          ),
          animation: { scale: 1.02, y: -2 }
        };

      case 'secondary':
        return {
          className: `relative inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-10 md:py-5 bg-transparent border-2 border-amber text-amber text-sm md:text-base ${roundedClass} overflow-hidden group`,
          hoverEffect: (
            <>
              <motion.div
                className={`absolute inset-0 bg-amber ${roundedClass}`}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
                style={{ originX: 0 }}
              />
              <motion.div
                className={`absolute inset-0 border-2 border-ivory opacity-0 group-hover:opacity-100 ${roundedClass}`}
                transition={{ duration: 0.3 }}
              />
            </>
          ),
          animation: { scale: 1.02 },
          textHover: "group-hover:text-ivory"
        };

      case 'outline':
        return {
          className: `relative inline-flex items-center gap-2 md:gap-3 px-5 py-3 md:px-8 md:py-4 bg-charcoal border-2 border-warm-grey/40 text-warm-grey text-sm md:text-base ${roundedClass} group hover:border-burgundy`,
          hoverEffect: (
            <motion.div
              className={`absolute inset-0 bg-burgundy/10 ${roundedClass}`}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          ),
          animation: { x: 4 },
          textHover: "group-hover:text-burgundy"
        };

      case 'glow':
        return {
          className: `relative inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-10 md:py-5 bg-gradient-to-r from-burgundy to-burgundy-hover text-ivory text-sm md:text-base ${roundedClass} group shadow-lg`,
          hoverEffect: (
            <>
              <motion.div
                className={`absolute -inset-1 bg-gradient-to-r from-amber via-burgundy to-amber ${roundedClass} opacity-0 group-hover:opacity-75 blur-lg`}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.75 }}
                transition={{ duration: 0.5 }}
              />
              <div className={`absolute inset-0 bg-gradient-to-r from-burgundy to-burgundy-hover ${roundedClass}`} />
            </>
          ),
          animation: { scale: 1.05 }
        };

      case 'slide':
        return {
          className: `relative inline-flex items-center gap-2 md:gap-3 px-6 py-3 md:px-10 md:py-5 bg-charcoal border border-amber/30 text-amber text-sm md:text-base ${roundedClass} overflow-hidden group`,
          hoverEffect: (
            <motion.div
              className={`absolute inset-0 bg-gradient-to-r from-amber/20 via-burgundy/20 to-amber/20 ${roundedClass}`}
              initial={{ x: '-100%', skewX: -12 }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
          ),
          animation: { x: 8 },
          textHover: "group-hover:text-ivory"
        };

      case 'minimal':
        return {
          className: `inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 text-amber text-sm md:text-base group hover:text-burgundy ${roundedClass}`,
          hoverEffect: (
            <motion.div
              className={`absolute bottom-0 left-0 right-0 h-0.5 bg-burgundy ${roundedClass}`}
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
              style={{ originX: 0 }}
            />
          ),
          animation: { x: 4 }
        };

      default:
        return {
          className: `inline-flex items-center gap-2 md:gap-3 px-5 py-3 md:px-8 md:py-4 bg-burgundy text-ivory text-sm md:text-base ${roundedClass}`,
          animation: {}
        };
    }
  };

  const buttonStyle = getButtonStyles();

  const content = (
    <>
      {buttonStyle.hoverEffect}
      <span className={`relative z-10 flex items-center gap-2 md:gap-3 transition-colors duration-300 ${buttonStyle.textHover || ''}`}>
        {children}
        {icon && (
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-2" />
        )}
      </span>
    </>
  );

  const MotionButton = motion.button;

  if (href) {
    // Check if it's an internal route (starts with /) or hash link (starts with #)
    const isInternalRoute = href.startsWith('/');
    const isHashLink = href.startsWith('#');

    const handleClick = () => {
      if (isInternalRoute) {
        navigate(href);
      } else if (isHashLink) {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.open(href, target || '_blank');
      }
    };

    return (
      <MotionButton
        whileHover={disabled ? {} : buttonStyle.animation}
        whileTap={disabled ? {} : { scale: 0.98 }}
        className={`${buttonStyle.className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleClick}
        disabled={disabled}
      >
        {content}
      </MotionButton>
    );
  }

  return (
    <MotionButton
      whileHover={disabled ? {} : buttonStyle.animation}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={`${buttonStyle.className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </MotionButton>
  );
}