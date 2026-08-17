/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ApkDetails } from '../types';
import { 
  Star, 
  ShieldCheck, 
  Download, 
  Smartphone, 
  Calendar, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  Eye, 
  Copy, 
  Check, 
  Share2, 
  Bookmark,
  ChevronRight,
  Maximize2
} from 'lucide-react';

interface ApkHeroProps {
  apk: ApkDetails;
  onDownloadClick: () => void;
}

export const ApkHero: React.FC<ApkHeroProps> = ({ apk, onDownloadClick }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'features' | 'security'>('details');
  const [copiedHash, setCopiedHash] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);

  const handleCopyHash = () => {
    navigator.clipboard.writeText(apk.sha256);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${apk.name} - APKTODO`,
        text: `Download ${apk.name} ${apk.version} (${apk.size}) free on APKTODO!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <section className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs space-y-6">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between text-xs text-slate-500 pb-1 border-b border-slate-100">
        <div className="flex items-center gap-1.5 font-medium">
          <a href="#" className="hover:text-blue-600">Home</a>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <a href="#" className="hover:text-blue-600">{apk.category}</a>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-slate-800 font-bold truncate max-w-[140px] sm:max-w-xs">{apk.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`p-1.5 rounded-lg border transition-colors ${
              bookmarked 
                ? 'bg-amber-50 border-amber-300 text-amber-600' 
                : 'border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
            }`}
            title="Bookmark this APK"
            aria-label="Bookmark"
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>
          <button
            onClick={handleShare}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors"
            title="Share APK"
            aria-label="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main App Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* App Icon */}
        <div className="relative shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-indigo-600 flex items-center justify-center text-white text-3xl sm:text-4xl font-black shadow-md shadow-blue-500/20 border-2 border-white">
            {apk.iconLetter}
          </div>
          {apk.isMod && (
            <span className="absolute -bottom-2 -right-1 bg-rose-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md shadow-xs uppercase tracking-wider">
              PRO MOD
            </span>
          )}
        </div>

        {/* Title & Meta */}
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-sky-100 text-sky-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping" />
              {apk.tag}
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Verified Safe
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
            {apk.name}
          </h1>

          <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            By <span className="text-blue-600 font-bold hover:underline cursor-pointer">{apk.developer}</span>
            <span>•</span>
            <span className="text-slate-400">{apk.packageName}</span>
          </p>

          {/* Rating Stars & Count */}
          <div className="flex items-center gap-2 pt-0.5">
            <div className="flex items-center text-amber-400 text-xs">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-3.5 h-3.5 fill-current ${i < Math.floor(apk.rating) ? 'text-amber-400' : 'text-slate-200'}`} 
                />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-800">{apk.rating}</span>
            <span className="text-[11px] text-slate-400">({apk.ratingCount.toLocaleString()} votes)</span>
            <span className="text-slate-300">•</span>
            <span className="text-[11px] text-emerald-600 font-semibold">{apk.downloadsCount} Downloads</span>
          </div>
        </div>
      </div>

      {/* Specifications Table Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-slate-50/80 p-3.5 rounded-xl border border-slate-100 text-xs">
        <div>
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Version</span>
          <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
            <i className="fa-solid fa-bolt text-amber-500 text-[10px]" />
            {apk.version}
          </span>
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase text-slate-400 block">File Size</span>
          <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
            <i className="fa-solid fa-download text-blue-500 text-[10px]" />
            {apk.size}
          </span>
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Requires</span>
          <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
            <Smartphone className="w-3 h-3 text-slate-500" />
            {apk.minAndroid}
          </span>
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Updated</span>
          <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
            <Calendar className="w-3 h-3 text-slate-500" />
            {apk.updateDate}
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-100 gap-4 text-xs font-bold">
        <button
          onClick={() => setActiveTab('details')}
          className={`pb-2 transition-colors relative ${
            activeTab === 'details'
              ? 'text-blue-600'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          App Overview
          {activeTab === 'details' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('features')}
          className={`pb-2 transition-colors relative ${
            activeTab === 'features'
              ? 'text-blue-600'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Pro Features ({apk.features.length})
          {activeTab === 'features' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`pb-2 transition-colors relative ${
            activeTab === 'security'
              ? 'text-blue-600'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          Security & Hashes
          {activeTab === 'security' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'details' && (
        <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
          <p className="font-medium text-slate-700">{apk.shortDesc}</p>
          {apk.fullDesc.map((para, i) => (
            <p key={i}>{para}</p>
          ))}

          {/* Screenshot Preview Gallery */}
          <div className="pt-2">
            <span className="block font-bold text-slate-800 text-xs mb-2">Screenshots Preview</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {apk.screenshots.map((imgUrl, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedScreenshot(imgUrl)}
                  className="relative group rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200/80 cursor-pointer shadow-xs"
                >
                  <img 
                    src={imgUrl} 
                    alt={`Screenshot ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'features' && (
        <div className="space-y-2.5">
          <div className="p-3 bg-cyan-50 border border-cyan-100 rounded-xl text-cyan-900 text-xs font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-600 shrink-0" />
            <span>{apk.modInfo || 'All Pro Premium features unlocked.'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {apk.features.map((feat, i) => (
              <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-slate-700 font-medium">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-emerald-900">VirusTotal Verified Clean</h4>
              <p className="text-[11px] text-emerald-700 mt-0.5">
                0/68 Antivirus engines flagged this package. Safe from spyware, trojans, and malicious adware.
              </p>
            </div>
          </div>

          <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">SHA-256 Hash</span>
              <div className="flex items-center justify-between gap-2 mt-0.5 font-mono text-[11px] text-slate-600 bg-white p-2 rounded border border-slate-200">
                <span className="truncate">{apk.sha256}</span>
                <button 
                  onClick={handleCopyHash}
                  className="shrink-0 text-slate-400 hover:text-blue-600"
                  title="Copy Hash"
                >
                  {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">MD5 Signature</span>
              <div className="font-mono text-[11px] text-slate-600 bg-white p-2 rounded border border-slate-200">
                {apk.md5}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Modal for Screenshot */}
      {selectedScreenshot && (
        <div 
          onClick={() => setSelectedScreenshot(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="relative max-w-xl max-h-[85vh] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={selectedScreenshot} 
              alt="Screenshot Preview"
              className="w-full h-auto object-contain max-h-[80vh]"
            />
            <button 
              onClick={() => setSelectedScreenshot(null)}
              className="absolute top-3 right-3 bg-black/60 text-white rounded-full p-2 hover:bg-rose-600 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
