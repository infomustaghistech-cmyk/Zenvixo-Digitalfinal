import { useState, useRef, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ExternalLink, Play } from 'lucide-react';

const categories = [
  { id: 'graphic-designing', name: 'Graphic Designing' },
  { id: 'digital-art', name: 'Digital Art' },
  { id: 'web-dev', name: 'Web Development' },
  { id: 'ui-ux', name: 'UI/UX Development' },
  { id: 'video-editing', name: 'Video Editing' },
  { id: 'ai-ads', name: 'AI Ad Generation' },
  { id: 'yt-automation', name: 'YouTube Automation' },
];

const subCategories = [
  { id: '2d', name: '2D Art' },
  { id: '3d', name: '3D Art' },
  { id: '2d-animation', name: '2D Animation' },
  { id: '3d-animation', name: '3D Animation' },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('graphic-designing');
  const [activeSubCategory, setActiveSubCategory] = useState('2d');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [dbProjects, setDbProjects] = useState<any[]>([]);

  const isYouTubeUrl = (url?: string) => {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const getYouTubeEmbedUrl = (url: string) => {
    let videoId = '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      videoId = match[2];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setDbProjects(data);
      if (error) console.error("Error fetching data:", error);
    };
    fetchProjects();
  }, []);

  const allItems = dbProjects;

  const filteredItems = allItems.filter(item => {
    if (item.category !== activeCategory) return false;
    if (activeCategory === 'digital-art') {
      return (item as any).subCategory === activeSubCategory;
    }
    return true;
  });

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    if (id === 'digital-art') {
      setActiveSubCategory('2d');
    }
  };

  const handleSubCategoryChange = (subId: string) => {
    setActiveSubCategory(subId);
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

          <AnimatePresence>
            {activeCategory === 'digital-art' && (
              <motion.div 
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden flex flex-wrap gap-2.5 pb-2"
              >
                {subCategories.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => handleSubCategoryChange(sub.id)}
                    className={`font-display font-bold uppercase text-[9px] tracking-widest px-4 py-2 border transition-all relative rounded-full ${
                      activeSubCategory === sub.id
                        ? 'text-brand-black border-brand-yellow bg-brand-yellow'
                        : 'text-white/40 border-white/10 hover:text-white hover:border-white/30 bg-transparent'
                    }`}
                  >
                    {sub.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Portfolio Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden bg-white/5 border border-white/10 aspect-[4/5] cursor-pointer"
                onClick={() => {
                  if (item.media_type === 'link' && item.project_url) {
                    window.open(item.project_url, '_blank');
                  } else {
                    setSelectedProject(item);
                  }
                }}
              >
                {/* Media Indicator Badges */}
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  {item.media_type === 'video' && (
                    <div className="bg-black/60 backdrop-blur-md text-white p-2 rounded-full border border-white/10">
                      <Play size={14} fill="white" className="ml-[1px]" />
                    </div>
                  )}
                  {item.media_type === 'link' && (
                    <div className="bg-black/60 backdrop-blur-md text-brand-yellow p-2 rounded-full border border-white/10">
                      <ExternalLink size={14} />
                    </div>
                  )}
                </div>

                {item.media_type === 'video' && item.video_url && !isYouTubeUrl(item.video_url) ? (
                  <video 
                    src={item.video_url} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                  />
                ) : (
                  <img 
                    src={
                      item.image || 
                      (item.media_type === 'video' && item.video_url && isYouTubeUrl(item.video_url)
                        ? `https://img.youtube.com/vi/${(() => {
                            let videoId = '';
                            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                            const match = item.video_url.match(regExp);
                            if (match && match[2].length === 11) {
                              videoId = match[2];
                            }
                            return videoId;
                          })()}/maxresdefault.jpg`
                        : 'https://picsum.photos/seed/default/1200/800')
                    } 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 md:p-8">
                  <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <h3 className="font-display font-bold text-2xl text-brand-white mb-2 uppercase tracking-tighter">
                      {item.title}
                    </h3>
                    <p className="text-white/60 text-sm mb-6 line-clamp-3">
                      {item.description}
                    </p>
                    <button className="flex items-center gap-2 text-brand-yellow font-display font-bold uppercase text-xs tracking-widest hover:text-white transition-colors">
                      {item.media_type === 'link' ? 'Visit Link' : item.media_type === 'video' ? 'Play Video' : 'View Image'}{' '}
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Multimedia Lightbox Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-10 cursor-pointer backdrop-blur-sm"
            >
              <div className="relative w-full max-w-4xl flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                {selectedProject.media_type === 'video' && selectedProject.video_url ? (
                  isYouTubeUrl(selectedProject.video_url) ? (
                    <iframe
                      src={getYouTubeEmbedUrl(selectedProject.video_url)}
                      title={selectedProject.title}
                      className="w-full aspect-video rounded-lg shadow-2xl border border-white/10 bg-black"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={selectedProject.video_url}
                      className="w-full max-h-[85vh] rounded-lg shadow-2xl border border-white/10 bg-black"
                      controls
                      autoPlay
                    />
                  )
                ) : (
                  <motion.img
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="max-w-full max-h-[85vh] object-contain rounded-md shadow-2xl"
                  />
                )}

                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute -top-14 right-0 text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-3 rounded-full border border-white/10"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}
