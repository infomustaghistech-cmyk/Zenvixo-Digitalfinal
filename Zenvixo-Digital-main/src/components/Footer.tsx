import { Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-brand-yellow flex items-center justify-center font-display font-bold text-brand-black text-base skew-x-[-10deg]">
                Z
              </div>
              <span className="font-display font-bold text-lg tracking-tighter text-brand-white">
                ZENVIXO<span className="text-brand-yellow">DIGITAL</span>
              </span>
            </div>
            <p className="text-white/60 max-w-sm mb-6 text-xs leading-relaxed">
              We are a team of passionate digital creators, designers, and developers dedicated to pushing the boundaries of what's possible in the digital industry.
            </p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/zenvixo_digital?igsh=MWxxc3NhYzJvOWhhdQ==" target="_blank" rel="noopener noreferrer" className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/60 hover:text-brand-yellow hover:border-brand-yellow transition-all">
                <Instagram size={14} />
              </a>
              <a href="#" className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/60 hover:text-brand-yellow hover:border-brand-yellow transition-all">
                <Twitter size={14} />
              </a>
              <a href="#" className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/60 hover:text-brand-yellow hover:border-brand-yellow transition-all">
                <Linkedin size={14} />
              </a>
              <a href="https://www.facebook.com/share/18yp1Zfary/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/60 hover:text-brand-yellow hover:border-brand-yellow transition-all">
                <Facebook size={14} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-[10px] uppercase tracking-widest text-brand-white mb-4">Services</h4>
            <ul className="space-y-3 text-white/50 text-[10px]">
              <li>Graphic Designing</li>
              <li>Digital Art</li>
              <li>Web Development</li>
              <li>UI/UX Development</li>
              <li>AI Ad Generation</li>
              <li>Video Editing</li>
              <li>YouTube Automation</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-[10px] uppercase tracking-widest text-brand-white mb-4">Address</h4>
            <p className="text-white/50 text-[10px] leading-relaxed">
              Digital Avenue, Suite 101<br />
              Creative District, CA 90210<br /><br />
              info@zenvixo.digital
            </p>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center gap-4 text-[9px] tracking-widest text-white/30 uppercase">
          <p>© 2026 ZENVIXO DIGITAL. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-white">Privacy Policy</a>
            <a href="#" className="hover:text-brand-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
