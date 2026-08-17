/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const dismissed = localStorage.getItem('apktodo_cookie_dismissed');
    if (dismissed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('apktodo_cookie_dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div 
      id="cookie-banner" 
      className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white text-xs py-3 px-4 flex items-center justify-between gap-3 shadow-xl z-50 border-t border-slate-800"
    >
      <p className="text-[11px] text-slate-300">
        We use cookies to ensure that we give you the best experience on our website.
      </p>
      <button 
        onClick={handleDismiss} 
        className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 font-bold px-3.5 py-1 rounded-lg shrink-0 text-xs transition-all cursor-pointer"
      >
        Ok
      </button>
    </div>
  );
};
