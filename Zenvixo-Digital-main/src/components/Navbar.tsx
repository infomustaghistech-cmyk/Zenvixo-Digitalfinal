import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Smartphone as WhatsApp } from 'lucide-react';
import { useState, useEffect } from 'react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-brand-black/90 backdrop-blur-md py-2 border-b border-white/10' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-brand-yellow flex items-center justify-center font-display font-bold text-brand-black text-lg skew-x-[-10deg] group-hover:skew-x-0 transition-transform">
            Z
          </div>
          <span className="font-display font-bold text-lg tracking-tighter text-brand-white">
            ZENVIXO<span className="text-brand-yellow">DIGITAL</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-display text-[10px] uppercase tracking-[0.2em] transition-colors hover:text-brand-yellow ${
                location.pathname === link.path ? 'text-brand-yellow' : 'text-brand-white'
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="underline"
                  className="h-0.5 bg-brand-yellow mt-1"
                />
              )}
            </Link>
          ))}
          <a
            href="https://wa.me/your-number-here"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-brand-yellow text-brand-black px-4 py-2 font-display font-bold uppercase text-[9px] tracking-widest hover:bg-brand-white transition-colors"
          >
            <WhatsApp size={14} />
            Let's Talk
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-brand-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-black border-b border-white/10 p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-display text-lg uppercase tracking-widest ${
                  location.pathname === link.path ? 'text-brand-yellow' : 'text-brand-white'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="https://wa.me/your-number-here"
              className="flex items-center justify-center gap-2 bg-brand-yellow text-brand-black px-6 py-3 font-display font-bold uppercase text-sm tracking-widest"
            >
              <WhatsApp size={18} />
              WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
