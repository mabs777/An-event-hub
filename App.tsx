/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ApkDetails, CommentReview, FaqItem } from './types';
import { PRIMARY_APK, DISCOVER_APPS, INITIAL_COMMENTS } from './data/appsData';
import { Navbar } from './components/Navbar';
import { ApkHero } from './components/ApkHero';
import { FaqSection } from './components/FaqSection';
import { DownloadSection } from './components/DownloadSection';
import { DiscoverAppsGrid } from './components/DiscoverAppsGrid';
import { RatingCommentSection } from './components/RatingCommentSection';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';

const App: React.FC = () => {
  const [currentApk, setCurrentApk] = useState<ApkDetails>(PRIMARY_APK);
  const [comments, setComments] = useState<CommentReview[]>(INITIAL_COMMENTS);
  const [faqs, setFaqs] = useState<FaqItem[]>(PRIMARY_APK.faqs);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Apps');
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  // Filter discover apps based on search & category
  const filteredApps = DISCOVER_APPS.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === 'All Apps') return matchesSearch;
    if (selectedCategory === 'MODs') return matchesSearch && app.isMod;
    return matchesSearch && app.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  const handleSelectApp = (app: ApkDetails) => {
    setCurrentApk(app);
    setFaqs(app.faqs || PRIMARY_APK.faqs);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddComment = (newComment: CommentReview) => {
    setComments(prev => [newComment, ...prev]);
  };

  const handleAddFaq = (newFaq: FaqItem) => {
    setFaqs(prev => [...prev, newFaq]);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b] pb-24 selection:bg-cyan-500 selection:text-white">
      {/* Top App Bar Navigation */}
      <Navbar
        onSearch={(q) => setSearchQuery(q)}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        onOpenDownload={() => setIsDownloadOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Main APK Overview & Specs */}
        <ApkHero
          apk={currentApk}
          onDownloadClick={() => setIsDownloadOpen(true)}
        />

        {/* FAQ Accordion Section */}
        <FaqSection
          faqs={faqs}
          onAddFaq={handleAddFaq}
        />

        {/* Main Download Button */}
        <DownloadSection
          apk={currentApk}
          isOpen={isDownloadOpen}
          onClose={() => setIsDownloadOpen(false)}
        />

        {/* Discover More Interesting Apps */}
        <DiscoverAppsGrid
          apps={filteredApps.length > 0 ? filteredApps : DISCOVER_APPS}
          onSelectApp={handleSelectApp}
          activeAppId={currentApk.id}
        />

        {/* Rating & Comment Form */}
        <RatingCommentSection
          comments={comments}
          onAddComment={handleAddComment}
        />
      </main>

      {/* APKTODO Footer */}
      <Footer />

      {/* Cookie Banner */}
      <CookieBanner />
    </div>
  );
};

export default App;
