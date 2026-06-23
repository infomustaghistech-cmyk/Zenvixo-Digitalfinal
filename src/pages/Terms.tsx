import { motion } from 'motion/react';

export default function Terms() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-brand-black min-h-screen pt-32 pb-16 px-6"
    >
      <div className="max-w-4xl mx-auto text-white/80 space-y-8">
        <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-white mb-2 tracking-tighter uppercase">
          Terms & Conditions
        </h1>
        <p className="text-white/40 text-sm mb-12"><strong>Last Updated:</strong> June 16, 2026</p>

        <div className="space-y-6">
          <p>
            Welcome to <strong>Zenvixo Digital</strong>. By accessing our website or using our services, you agree to the following Terms & Conditions.
          </p>

          <h2 className="font-display font-bold text-2xl text-brand-yellow mt-8 mb-4">Our Services</h2>
          <p>Zenvixo Digital provides professional digital services, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Website Development</li>
            <li>E-Commerce Solutions</li>
            <li>UI/UX Design</li>
            <li>Graphic Design</li>
            <li>Digital Art</li>
            <li>2D & 3D Modeling</li>
            <li>AI-Powered Creative Services</li>
            <li>Content Writing</li>
            <li>Branding & Marketing Solutions</li>
            <li>YouTube Automation Support</li>
          </ul>

          <h2 className="font-display font-bold text-2xl text-brand-yellow mt-8 mb-4">Payments</h2>
          <p>
            All project fees and payment terms will be agreed upon before work begins. Projects may require an upfront deposit. Final deliverables will be provided once full payment has been received.
          </p>

          <h2 className="font-display font-bold text-2xl text-brand-yellow mt-8 mb-4">Client Responsibilities</h2>
          <p>
            Clients are responsible for providing accurate project requirements, content, and timely feedback. Delays in communication may affect project timelines.
          </p>

          <h2 className="font-display font-bold text-2xl text-brand-yellow mt-8 mb-4">Revisions</h2>
          <p>
            Reasonable revisions are included according to the agreed project scope. Additional revisions may result in extra charges.
          </p>

          <h2 className="font-display font-bold text-2xl text-brand-yellow mt-8 mb-4">Intellectual Property</h2>
          <p>
            Ownership of final approved deliverables will transfer to the client upon full payment. Zenvixo Digital reserves the right to showcase completed work in its portfolio unless otherwise agreed.
          </p>

          <h2 className="font-display font-bold text-2xl text-brand-yellow mt-8 mb-4">Confidentiality</h2>
          <p>
            We respect the privacy and confidentiality of all client information and project details.
          </p>

          <h2 className="font-display font-bold text-2xl text-brand-yellow mt-8 mb-4">Limitation of Liability</h2>
          <p>
            Zenvixo Digital shall not be responsible for any indirect, incidental, or consequential damages arising from the use of our services.
          </p>

          <h2 className="font-display font-bold text-2xl text-brand-yellow mt-8 mb-4">Termination</h2>
          <p>
            Either party may terminate a project with written notice. Payment for completed work remains due.
          </p>

          <h2 className="font-display font-bold text-2xl text-brand-yellow mt-8 mb-4">Changes to Terms</h2>
          <p>
            We reserve the right to update these Terms & Conditions at any time without prior notice.
          </p>

          <h2 className="font-display font-bold text-2xl text-brand-yellow mt-8 mb-4">Contact Us</h2>
          <p>
            <strong>Zenvixo Digital</strong><br />
            Email: <a href="mailto:support@zenvixodigital.com" className="text-brand-white hover:text-brand-yellow">support@zenvixodigital.com</a><br />
            WhatsApp: +123457899
          </p>

          <p className="mt-8 pt-8 border-t border-white/10 text-white/40 italic">
            By using our services, you acknowledge and agree to these Terms & Conditions.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
