import { motion } from 'motion/react';

export default function PrivacyPolicy() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-brand-black min-h-screen pt-32 pb-16 px-6"
    >
      <div className="max-w-4xl mx-auto text-white/80 space-y-8">
        <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-white mb-2 tracking-tighter uppercase">
          Privacy Policy
        </h1>
        <p className="text-white/40 text-sm mb-12"><strong>Last Updated:</strong> June 16, 2026</p>

        <div className="space-y-6">
          <p>
            At <strong>Zenvixo Digital</strong>, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website or services.
          </p>

          <h2 className="font-display font-bold text-2xl text-brand-yellow mt-8 mb-4">Information We Collect</h2>
          <p>We may collect the following information:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name</li>
            <li>Email Address</li>
            <li>Phone Number</li>
            <li>Business Information</li>
            <li>Project Requirements</li>
            <li>Payment and Billing Information</li>
            <li>Website Usage Data</li>
          </ul>

          <h2 className="font-display font-bold text-2xl text-brand-yellow mt-8 mb-4">How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide and manage our services</li>
            <li>Communicate regarding projects and support</li>
            <li>Process payments and invoices</li>
            <li>Improve our website and customer experience</li>
            <li>Send important updates related to our services</li>
          </ul>

          <h2 className="font-display font-bold text-2xl text-brand-yellow mt-8 mb-4">Information Sharing</h2>
          <p>
            Zenvixo Digital does not sell, rent, or trade your personal information to third parties.
          </p>
          <p>
            We may share information with trusted service providers when necessary to deliver our services or comply with legal obligations.
          </p>

          <h2 className="font-display font-bold text-2xl text-brand-yellow mt-8 mb-4">Data Security</h2>
          <p>
            We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, or misuse.
          </p>

          <h2 className="font-display font-bold text-2xl text-brand-yellow mt-8 mb-4">Cookies</h2>
          <p>
            Our website may use cookies and similar technologies to improve website functionality and user experience.
          </p>

          <h2 className="font-display font-bold text-2xl text-brand-yellow mt-8 mb-4">Third-Party Services</h2>
          <p>
            Our website may contain links to third-party websites or services. We are not responsible for the privacy practices of those third-party platforms.
          </p>

          <h2 className="font-display font-bold text-2xl text-brand-yellow mt-8 mb-4">Data Retention</h2>
          <p>
            We retain personal information only for as long as necessary to provide our services, fulfill legal obligations, and resolve disputes.
          </p>

          <h2 className="font-display font-bold text-2xl text-brand-yellow mt-8 mb-4">Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal information by contacting us.
          </p>

          <h2 className="font-display font-bold text-2xl text-brand-yellow mt-8 mb-4">Changes to This Policy</h2>
          <p>
            We reserve the right to update this Privacy Policy at any time. Any changes will be posted on this page with an updated revision date.
          </p>

          <h2 className="font-display font-bold text-2xl text-brand-yellow mt-8 mb-4">Contact Us</h2>
          <p>
            <strong>Zenvixo Digital</strong><br />
            USA-Based Digital Agency<br />
            Email: <a href="mailto:support@zenvixodigital.com" className="text-brand-white hover:text-brand-yellow">support@zenvixodigital.com</a><br />
            WhatsApp: +134679
          </p>

          <p className="mt-8 pt-8 border-t border-white/10 text-white/40 italic">
            By using our website or services, you agree to the terms outlined in this Privacy Policy.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
