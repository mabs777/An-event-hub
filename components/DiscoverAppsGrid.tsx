/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ApkDetails } from '../types';
import { Sparkles, Eye, Download, CheckCircle, ArrowUpRight, Star } from 'lucide-react';

interface DiscoverAppsGridProps {
  apps: ApkDetails[];
  onSelectApp: (app: ApkDetails) => void;
  activeAppId?: string;
}

export const DiscoverAppsGrid: React.FC<DiscoverAppsGridProps> = ({
  apps,
  onSelectApp,
  activeAppId
}) => {
  const [quickViewApp, setQuickViewApp] = useState<ApkDetails | null>(null);

  return (
    <>
      {/* Discover More Apps Heading */}
      <section className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
            <i className="fa-solid fa-gamepad text-base" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-800">Discover More Interesting Apps</h2>
            <p className="text-[11px] text-slate-400 font-medium">Handpicked trending games, streaming & MODs</p>
          </div>
        </div>

        <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
          {apps.length} Apps
        </span>
      </section>

      {/* Apps Grid (2 Columns) */}
      <section className="grid grid-cols-2 gap-3.5">
        {apps.map((app) => {
          const isActive = app.id === activeAppId;

          return (
            <div
              key={app.id}
              onClick={() => onSelectApp(app)}
              className={`bg-white border rounded-2xl p-3.5 flex flex-col justify-between shadow-xs relative transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer group ${
                isActive 
                  ? 'border-blue-500 ring-2 ring-blue-500/20' 
                  : 'border-slate-200/80 hover:border-slate-300'
              }`}
            >
              {/* Badge Top Left */}
              <span className="absolute top-3 left-3 bg-sky-100 text-sky-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span>●</span> {app.tag}
              </span>

              {/* Quick View Button Top Right */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setQuickViewApp(app);
                }}
                className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-700 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                title="Quick preview"
              >
                <Eye className="w-3 h-3" />
              </button>

              {/* App Icon & Title */}
              <div className="pt-5 pb-2 text-center">
                <div className="relative inline-block mx-auto mb-2">
                  <div className={`w-16 h-16 rounded-2xl ${app.iconBg} flex items-center justify-center text-white text-2xl font-bold shadow-sm transition-transform group-hover:scale-105`}>
                    {app.iconLetter}
                  </div>
                  {app.isMod && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-rose-500 text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider shadow-xs whitespace-nowrap">
                      MOD
                    </span>
                  )}
                </div>
                <h3 className={`font-bold text-slate-800 text-xs sm:text-sm truncate group-hover:text-blue-600 transition-colors ${app.isMod ? 'mt-2' : ''}`}>
                  {app.name}
                </h3>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">
                  {app.category}
                </p>
              </div>

              {/* Footer Meta (Version & Size) */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-2.5 text-[10px] sm:text-[11px] text-slate-400 font-medium">
                <span className="flex items-center gap-1 text-slate-500 font-semibold">
                  <i className="fa-solid fa-bolt text-amber-500" /> {app.version}
                </span>
                <span className="flex items-center gap-1 text-slate-500 font-semibold">
                  <i className="fa-solid fa-download text-blue-500" /> {app.size}
                </span>
              </div>
            </div>
          );
        })}
      </section>

      {/* Quick View Modal */}
      {quickViewApp && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setQuickViewApp(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-sm w-full p-5 border border-slate-200 shadow-2xl space-y-4 relative animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQuickViewApp(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <div className={`w-14 h-14 rounded-2xl ${quickViewApp.iconBg} flex items-center justify-center text-white text-2xl font-bold shadow-md`}>
                {quickViewApp.iconLetter}
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-slate-900 text-sm truncate">{quickViewApp.name}</h4>
                <p className="text-xs text-slate-500">{quickViewApp.category}</p>
                <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold mt-0.5">
                  <Star className="w-3 h-3 fill-current" />
                  <span>{quickViewApp.rating}</span>
                  <span className="text-slate-400 font-normal">({quickViewApp.downloadsCount})</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              {quickViewApp.shortDesc}
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
              <div className="p-2 bg-slate-50 rounded-lg">
                <span className="text-[10px] text-slate-400 block font-bold">VERSION</span>
                <span className="font-bold text-slate-800">{quickViewApp.version}</span>
              </div>
              <div className="p-2 bg-slate-50 rounded-lg">
                <span className="text-[10px] text-slate-400 block font-bold">SIZE</span>
                <span className="font-bold text-slate-800">{quickViewApp.size}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => {
                  onSelectApp(quickViewApp);
                  setQuickViewApp(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <span>View Full Details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
