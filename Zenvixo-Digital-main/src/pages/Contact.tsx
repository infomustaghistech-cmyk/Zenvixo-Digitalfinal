import { motion } from 'motion/react';
import { Smartphone as WhatsApp, Mail, MapPin, ArrowRight } from 'lucide-react';

export default function Contact() {
  const whatsappNumber = "+1234567890"; // In a real app, this would be an env var or the user's number
  const whatsappMessage = encodeURIComponent("Hello Zenvixo Digital, I'm interested in your services!");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-brand-black min-h-screen pt-32 pb-16 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <span className="text-brand-yellow font-display font-bold text-[10px] uppercase tracking-[0.3em] block mb-4">Get In Touch</span>
            <h1 className="font-display font-bold text-5xl md:text-7xl text-brand-white tracking-tighter leading-[0.9] mb-10">
              LET'S <span className="text-brand-yellow italic">START</span> <br /> 
              SOMETHING <br /> 
              GREAT.
            </h1>
            
            <div className="space-y-8">
              <div className="flex items-start gap-5 group">
                <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-brand-yellow group-hover:bg-brand-yellow group-hover:text-brand-black transition-all shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                   <h4 className="font-display font-bold text-[10px] uppercase tracking-widest text-white/40 mb-1">Email Us</h4>
                   <p className="text-lg text-brand-white font-display font-bold">hello@zenvixo.digital</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-brand-yellow group-hover:bg-brand-yellow group-hover:text-brand-black transition-all shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                   <h4 className="font-display font-bold text-[10px] uppercase tracking-widest text-white/40 mb-1">Visit Us</h4>
                   <p className="text-lg text-brand-white font-display font-bold">Suite 101, Creative District, CA</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
               <WhatsApp size={250} className="text-brand-yellow" />
            </div>
            
            <div className="relative z-10">
               <h3 className="font-display font-bold text-2xl md:text-4xl text-brand-white mb-6 tracking-tighter uppercase leading-[0.9]">
                 INSTANT <br /> <span className="text-brand-yellow">WHATSAPP</span> <br /> CONNECT.
               </h3>
               <p className="text-white/60 text-base mb-10 max-w-sm leading-relaxed">
                 Skip the forms. Message us directly on WhatsApp for lighting fast response times and personal consultation.
               </p>
               
               <a 
                 href={whatsappLink}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-3 bg-brand-yellow text-brand-black px-8 py-4 font-display font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-brand-white transition-all w-full md:w-auto justify-center"
               >
                 <WhatsApp size={16} />
                 Message Now
                 <ArrowRight size={16} />
               </a>
            </div>

            <div className="mt-12 pt-6 border-t border-white/10 text-white/40 text-[9px] uppercase tracking-widest">
               Typical response time: &lt; 30 Minutes
            </div>
          </div>
        </div>
      </div>

      {/* Decorative large text */}
      <div className="absolute bottom-10 left-0 w-full overflow-hidden opacity-5 pointer-events-none select-none">
         <div className="font-display font-bold text-[20vw] whitespace-nowrap text-brand-white tracking-tighter leading-none">
           ZENVIXO • DIGITAL • ZENVIXO • DIGITAL • ZENVIXO • DIGITAL
         </div>
      </div>
    </motion.div>
  );
}
