import { motion } from 'motion/react';
import { ArrowRight, Palette, Code, Layout, Brain, Video, Paintbrush, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: 'Graphic Designing',
    description: 'Transforming ideas into stunning visual concepts that capture your brand essence.',
    icon: Palette,
    bg: 'https://picsum.photos/seed/graphics/800/600',
  },
  {
    title: 'Digital Art',
    description: 'Bespoke digital illustrations and unique art pieces created for the modern era.',
    icon: Paintbrush,
    bg: 'https://picsum.photos/seed/digitalart/800/600',
  },
  {
    title: 'Web Development',
    description: 'Scalable, performant, and secure web applications built with cutting-edge tech.',
    icon: Code,
    bg: 'https://picsum.photos/seed/webdev/800/600',
  },
  {
    title: 'UI/UX Development',
    description: 'Designing intuitive user interfaces that provide seamless digital experiences.',
    icon: Layout,
    bg: 'https://picsum.photos/seed/uiux/800/600',
  },
  {
    title: 'Video Editing',
    description: 'Professional video production and editing that tells your story effectively.',
    icon: Video,
    bg: 'https://picsum.photos/seed/video/800/600',
  },
  {
    title: 'AI Ad Generation',
    description: 'Leveraging AI power to create high-conversion visual assets for digital campaigns.',
    icon: Brain,
    bg: 'https://picsum.photos/seed/ai/800/600',
  },
  {
    title: 'YouTube Automation',
    description: 'Complete hands-free channel management, from conceptualization to upload.',
    icon: Play,
    bg: 'https://picsum.photos/seed/yt/800/600',
  },
];

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20"
    >
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/zenvixodigital/1920/1080?grayscale" 
            alt="Hero Background"
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/80 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-3 py-1 bg-brand-yellow text-brand-black font-display font-bold text-[10px] uppercase tracking-[0.3em] mb-6 skew-x-[-15deg]">
              Premium Digital Agency
            </span>
            <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-brand-white leading-[0.9] tracking-tighter mb-8 max-w-4xl">
              EVOLVING <span className="text-brand-yellow">DIGITAL</span> DIMENSIONS.
            </h1>
            <p className="text-white/60 text-base md:text-lg max-w-xl mb-10 leading-relaxed">
              Zenvixo Digital is where creativity meets technology. We craft high-end digital experiences for brands that refuse to be ordinary.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/portfolio" 
                className="bg-brand-yellow text-brand-black px-6 py-3 font-display font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-brand-white transition-all flex items-center gap-2 group"
              >
                View Works
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/contact" 
                className="border border-white/20 text-brand-white px-6 py-3 font-display font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-white hover:text-brand-black transition-all"
              >
                Start a Project
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute right-0 bottom-0 p-10 hidden lg:block opacity-5 select-none pointer-events-none">
          <div className="font-display font-bold text-[20rem] leading-none text-brand-yellow">Z</div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-brand-black relative">
        <div className="bg-noise absolute inset-0 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:row justify-between items-end gap-6 mb-16">
            <div>
              <span className="text-brand-yellow font-display font-bold text-[10px] uppercase tracking-widest block mb-4">Our Expertise</span>
              <h2 className="font-display font-bold text-3xl md:text-5xl text-brand-white tracking-tighter">
                SERVICES WE <span className="text-brand-yellow italic">PROVIDE</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-white/10">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 border-r border-b border-white/10 relative overflow-hidden transition-all duration-500 hover:bg-brand-yellow"
              >
                <div className="relative z-10 transition-all duration-500 group-hover:text-brand-black">
                  <div className="w-10 h-10 mb-6 flex items-center justify-center border border-white/20 group-hover:border-brand-black/30">
                    <service.icon size={20} className="text-brand-yellow group-hover:text-brand-black" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3 uppercase tracking-tight">{service.title}</h3>
                  <p className="text-white/50 text-xs leading-relaxed group-hover:text-brand-black/70 mb-6 max-w-xs">
                    {service.description}
                  </p>
                  <Link to="/portfolio" className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                    Explore More <ArrowRight size={10} />
                  </Link>
                </div>
                
                <div className="absolute right-[-5%] bottom-[-5%] opacity-0 group-hover:opacity-5 transition-all duration-700 pointer-events-none">
                   <service.icon size={150} className="text-brand-black" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About CTA */}
      <section className="py-16 bg-brand-yellow flex flex-col md:row items-center justify-center gap-10 px-6">
        <h2 className="font-display font-bold text-2xl md:text-4xl text-brand-black text-center md:text-left tracking-tighter leading-tight">
          READY TO ELEVATE YOUR <br className="hidden md:block" /> DIGITAL PRESENCE?
        </h2>
        <Link 
          to="/contact" 
          className="bg-brand-black text-brand-yellow px-8 py-4 font-display font-bold uppercase text-xs tracking-[0.2em] hover:bg-white hover:text-brand-black transition-all shrink-0"
        >
          Work With Us
        </Link>
      </section>
    </motion.div>
  );
}
