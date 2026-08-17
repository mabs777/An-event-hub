/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Shield, FileText, Info, Mail, Heart, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [modalContent, setModalContent] = useState<{ title: string; content: string } | null>(null);

  const openInfo = (title: string, content: string) => {
    setModalContent({ title, content });
  };

  return (
    <>
      <footer className="bg-cyan-700 text-white mt-8 py-8 px-4">
        <div className="max-w-2xl mx-auto space-y-5">
          <div className="flex items-center justify-between">
            <div className="text-xl font-black tracking-wider flex items-center gap-2">
              <span>APKTODO</span>
              <span className="text-[10px] bg-cyan-800 text-cyan-200 px-2 py-0.5 rounded font-mono font-bold">v2.4</span>
            </div>
            <span className="text-[11px] text-cyan-200">© 2026 APKTODO. All rights reserved.</span>
          </div>

          <p className="text-xs text-cyan-100 font-medium">Follow us on</p>

          <div className="flex items-center gap-2.5">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 text-xs transition-colors"
              aria-label="Facebook"
            >
              <i className="fa-brands fa-facebook-f" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 text-xs transition-colors"
              aria-label="LinkedIn"
            >
              <i className="fa-brands fa-linkedin-in" />
            </a>
            <a 
              href="https://pinterest.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 text-xs transition-colors"
              aria-label="Pinterest"
            >
              <i className="fa-brands fa-pinterest-p" />
            </a>
            <a 
              href="https://telegram.org" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 text-xs transition-colors"
              aria-label="Telegram"
            >
              <i className="fa-brands fa-telegram" />
            </a>
          </div>

          <div className="space-y-1.5 text-xs font-semibold pt-1">
            <div>
              <button 
                onClick={() => openInfo('About Us', 'APKTODO is a dedicated platform providing verified, malware-free Android APK packages, MOD applications, and open-source Android tools. Our scanning infrastructure verifies all hashes before hosting.')} 
                className="hover:underline opacity-90 text-left cursor-pointer"
              >
                About Us
              </button>
            </div>
            <div>
              <button 
                onClick={() => openInfo('Privacy Policy', 'We value user privacy. No personal identifying information is stored or shared with 3rd parties. Download logs are strictly anonymized for server load balancing.')} 
                className="hover:underline opacity-90 text-left cursor-pointer"
              >
                Privacy Policy
              </button>
            </div>
            <div>
              <button 
                onClick={() => openInfo('Terms of Use', 'All trademarks and registered trademarks are the property of their respective owners. APKTODO distributes files purely for educational and testing purposes.')} 
                className="hover:underline opacity-90 text-left cursor-pointer"
              >
                Terms of Use
              </button>
            </div>
            <div>
              <button 
                onClick={() => openInfo('Contact & DMCA', 'For copyright requests, partnership inquiries, or APK update submissions, email us at contact@apktodo.example. Responses are typically processed within 24-48 business hours.')} 
                className="hover:underline opacity-90 text-left cursor-pointer"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Info Dialog Modal */}
      {modalContent && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setModalContent(null)}
        >
          <div 
            className="bg-white text-slate-800 rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">{modalContent.title}</h3>
              <button 
                onClick={() => setModalContent(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {modalContent.content}
            </p>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setModalContent(null)}
                className="bg-cyan-700 hover:bg-cyan-800 text-white font-bold px-4 py-2 rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
