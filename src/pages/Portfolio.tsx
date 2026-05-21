import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const categories = [
  { id: 'graphic-designing', name: 'Graphic Designing' },
  { id: 'digital-art', name: 'Digital Art' },
  { id: 'web-dev', name: 'Web Development' },
  { id: 'ui-ux', name: 'UI/UX Development' },
  { id: 'video-editing', name: 'Video Editing' },
  { id: 'ai-ads', name: 'AI Ad Generation' },
  { id: 'yt-automation', name: 'YouTube Automation' },
];

const portfolioItems = [
  {
    id: 1,
    category: 'digital-art',
    title: 'Neon Odyssey',
    image: 'https://picsum.photos/seed/da1/1200/800',
    description: 'A cyberpunk inspired digital illustration exploring future cityscapes.'
  },
  {
    id: 2,
    category: 'digital-art',
    title: 'Organic Fractals',
    image: 'https://picsum.photos/seed/da2/1200/800',
    description: 'Digital art piece focusing on the intersection of nature and algorithms.'
  },
  {
    id: 3,
    category: 'graphic-designing',
    title: 'Apex Branding',
    image: 'https://picsum.photos/seed/gd1/1200/800',
    description: 'Complete brand identity for a modern architectural firm.'
  },
  {
    id: 4,
    category: 'graphic-designing',
    title: 'Velvet Magazine',
    image: 'https://picsum.photos/seed/gd2/1200/800',
    description: 'Editorial design and layout for a high-fashion digital publication.'
  },
  {
    id: 5,
    category: 'web-dev',
    title: 'Quantum Dashboard',
    image: 'https://picsum.photos/seed/wd1/1200/800',
    description: 'Real-time data visualization platform for quantum computing research.'
  },
  {
    id: 6,
    category: 'web-dev',
    title: 'E-commerce Core',
    image: 'https://picsum.photos/seed/wd2/1200/800',
    description: 'A headless commerce solution built with React and high-performance APIs.'
  },
  {
    id: 7,
    category: 'ui-ux',
    title: 'ZenFlow Mobile',
    image: 'https://picsum.photos/seed/uiux1/1200/800',
    description: 'A meditation app focusing on minimal cognitive load and fluid animations.'
  },
  {
    id: 8,
    category: 'video-editing',
    title: 'Cinematic Reels',
    image: 'https://picsum.photos/seed/vid1/1200/800',
    description: 'Fast-paced, high-impact social media video production for tech influencers.'
  },
  {
    id: 9,
    category: 'ai-ads',
    title: 'Neural Campaigns',
    image: 'https://picsum.photos/seed/aiad1/1200/800',
    description: 'AI-generated visual assets for highly targeted AdSense and social media campaigns.'
  },
  {
    id: 10,
    category: 'yt-automation',
    title: 'Growth Engine',
    image: 'https://picsum.photos/seed/ytaut1/1200/800',
    description: 'End-to-end automated channel management, from script to high-retention upload.'
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('graphic-designing');
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredItems = portfolioItems.filter(item => item.category === activeCategory);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setCurrentIndex(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 bg-brand-black min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <span className="text-brand-yellow font-display font-bold text-[10px] uppercase tracking-[0.3em] block mb-4">Our Showcase</span>
          <h1 className="font-display font-bold text-4xl md:text-6xl text-brand-white tracking-tighter mb-8">
            CRAFTED <span className="text-brand-yellow">WORKS</span>.
          </h1>
          
          <div className="flex flex-wrap gap-4 md:gap-6 border-b border-white/10 pb-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`font-display font-bold uppercase text-[9px] tracking-widest transition-all relative pb-3 ${
                  activeCategory === cat.id ? 'text-brand-yellow' : 'text-white/40 hover:text-white'
                }`}
              >
                {cat.name}
                {activeCategory === cat.id && (
                  <motion.div layoutId="cat-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-brand-yellow" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Slider */}
        <div className="relative group">
          <div className="overflow-hidden aspect-[16/9] bg-white/5 border border-white/10 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={filteredItems[currentIndex].id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img 
                  src={filteredItems[currentIndex].image} 
                  alt={filteredItems[currentIndex].title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                   <motion.div
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ delay: 0.2 }}
                   >
                     <h3 className="font-display font-bold text-3xl md:text-5xl text-brand-white mb-2 uppercase tracking-tighter">
                       {filteredItems[currentIndex].title}
                     </h3>
                     <p className="text-white/60 text-sm md:text-base max-w-xl mb-6">
                       {filteredItems[currentIndex].description}
                     </p>
                     <button className="flex items-center gap-2 text-brand-yellow font-display font-bold uppercase text-xs tracking-widest hover:text-white transition-colors">
                       View Case Study <ExternalLink size={14} />
                     </button>
                   </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Content Indicators */}
            <div className="absolute top-8 right-8 flex gap-2">
               {filteredItems.map((_, i) => (
                 <div key={i} className={`h-1 transition-all duration-300 ${i === currentIndex ? 'w-8 bg-brand-yellow' : 'w-2 bg-white/20'}`} />
               ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-end gap-2 mt-8">
            <button 
              onClick={prevSlide}
              className="w-16 h-16 border border-white/10 flex items-center justify-center text-white/40 hover:bg-brand-yellow hover:text-brand-black hover:border-brand-yellow transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="w-16 h-16 border border-white/10 flex items-center justify-center text-white/40 hover:bg-brand-yellow hover:text-brand-black hover:border-brand-yellow transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
