/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, ShieldCheck, Download, Smartphone, Sparkles, X } from 'lucide-react';

interface NavbarProps {
  onSearch: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onOpenDownload: () => void;
}

const CATEGORIES = ['All Apps', 'Photography', 'Tools', 'Entertainment', 'Cloud Gaming', 'MODs'];

export const Navbar: React.FC<NavbarProps> = ({
  onSearch,
  selectedCategory,
  onSelectCategory,
  onOpenDownload
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchMobile, setShowSearchMobile] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Smartphone className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-wider text-slate-900 leading-none flex items-center gap-1">
                APKTODO
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </span>
              <span className="text-[10px] font-semibold text-slate-400 tracking-wide uppercase">Safe APK Portal</span>
            </div>
          </a>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden sm:flex items-center relative flex-1 max-w-xs ml-4">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search APKs, Games, MODs..."
            className="w-full pl-9 pr-8 py-2 text-xs bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-slate-200/80 focus:border-cyan-500 rounded-xl focus:outline-none transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-2.5 text-slate-400 hover:text-slate-600"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setShowSearchMobile(!showSearchMobile)}
            className="sm:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            aria-label="Toggle Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Safe Badge */}
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[11px] font-bold border border-emerald-200/60">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Virus-Free</span>
          </div>

          {/* Quick Download Button */}
          <button
            onClick={onOpenDownload}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm shadow-blue-500/20 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Download</span>
          </button>
        </div>
      </div>

      {/* Mobile Search Expandable Bar */}
      {showSearchMobile && (
        <div className="sm:hidden px-4 pb-3 pt-1 border-t border-slate-100 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search apps..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-slate-100 border border-slate-200 rounded-xl focus:outline-none focus:border-cyan-500"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Categories Bar */}
      <div className="max-w-3xl mx-auto px-4 pb-2.5 overflow-x-auto no-scrollbar flex items-center gap-1.5 text-xs">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-colors ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </header>
  );
};
