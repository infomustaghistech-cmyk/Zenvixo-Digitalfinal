import { motion } from 'motion/react';
import { Target, Lightbulb, Users, BarChart } from 'lucide-react';

const values = [
  {
    title: 'Precision',
    description: 'We believe in the power of detail. Every pixel, every line of code is meticulously crafted for excellence.',
    icon: Target,
  },
  {
    title: 'Innovation',
    description: 'Breaking boundaries is in our DNA. We constantly explore new technologies to keep our clients ahead.',
    icon: Lightbulb,
  },
  {
    title: 'Collaboration',
    description: 'We work as partners, not just service providers. Your vision combined with our expertise creates magic.',
    icon: Users,
  },
  {
    title: 'Results',
    description: 'Aesthetics are important, but impact is everything. We deliver solutions that drive real-world growth.',
    icon: BarChart,
  },
];

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-brand-black min-h-screen"
    >
      {/* Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="text-brand-yellow font-display font-bold text-[10px] uppercase tracking-[0.3em] block mb-4">Who We Are</span>
          <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-brand-white tracking-tighter leading-[0.9] mb-12">
            WE ARE <span className="text-brand-yellow">ZENVIXO</span>. <br />
            THE FUTURE OF DIGITAL.
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <p className="text-white/80 text-lg leading-relaxed">
                Zenvixo Digital is a premier creative agency born from the desire to merge artistic expression with technical mastery. We specialize in building digital identities that resonate on a global scale.
              </p>
              <p className="text-white/60 text-base leading-relaxed">
                Based in the intersection of design and development, we serve clients ranging from innovative startups to established international brands. Our mission is simple: to create digital assets that aren't just beautiful, but strategically powerful.
              </p>
            </div>
            <div className="bg-brand-yellow p-8 skew-x-[-5deg]">
               <div className="skew-x-[5deg]">
                 <h2 className="font-display font-bold text-2xl text-brand-black mb-4 uppercase italic">Our Mission</h2>
                 <p className="text-brand-black/80 font-medium text-base leading-relaxed italic">
                   "To empower businesses by delivering cutting-edge digital solutions that blend unparalleled creativity with technical precision, ensuring our clients lead the digital conversation."
                 </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Values Grid */}
      <section className="py-32 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {values.map((value, i) => (
              <div key={i} className="flex flex-col gap-6">
                <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center text-brand-yellow">
                   <value.icon size={28} />
                </div>
                <h3 className="font-display font-bold text-2xl text-brand-white uppercase tracking-tight">{value.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team/Philosophy */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:row gap-16 items-center">
          <div className="w-full md:w-1/2 aspect-square bg-white/5 border border-white/10 relative overflow-hidden">
             <img 
               src="https://picsum.photos/seed/team/1000/1000?grayscale" 
               alt="Team Workspace" 
               className="w-full h-full object-cover opacity-60"
               referrerPolicy="no-referrer"
             />
             <div className="absolute inset-0 border-[20px] border-brand-black/30 pointer-events-none" />
          </div>
          <div className="w-full md:w-1/2">
             <h2 className="font-display font-bold text-5xl text-brand-white tracking-tighter mb-8 uppercase">
               DRIVEN BY <br /> <span className="text-brand-yellow">PASSION</span>.
             </h2>
             <p className="text-white/60 text-lg leading-relaxed mb-8">
               Our team consists of specialists across every digital vertical. From award-winning graphic designers to full-stack engineers, we bring a diverse range of perspectives to every project.
             </p>
             <div className="flex gap-12 pt-8 border-t border-white/10">
                <div>
                   <div className="font-display font-bold text-4xl text-brand-yellow">150+</div>
                   <div className="text-white/40 text-xs uppercase tracking-widest mt-2">Projects Done</div>
                </div>
                <div>
                   <div className="font-display font-bold text-4xl text-brand-yellow">12+</div>
                   <div className="text-white/40 text-xs uppercase tracking-widest mt-2">Team Members</div>
                </div>
                <div>
                   <div className="font-display font-bold text-4xl text-brand-yellow">5+</div>
                   <div className="text-white/40 text-xs uppercase tracking-widest mt-2">Global Awards</div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
