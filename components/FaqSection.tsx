/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FaqItem } from '../types';
import { HelpCircle, ChevronDown, Plus, Check } from 'lucide-react';

interface FaqSectionProps {
  faqs: FaqItem[];
  onAddFaq?: (faq: FaqItem) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqs, onAddFaq }) => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'faq-1': true, // Default first open for great presentation
    'faq-2': false
  });
  const [showAskModal, setShowAskModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    if (onAddFaq) {
      onAddFaq({
        id: `faq-${Date.now()}`,
        question: newQuestion.trim(),
        answer: 'Thank you for asking! Our moderators or developer team will verify and post the official answer shortly.'
      });
    }

    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setShowAskModal(false);
      setNewQuestion('');
    }, 1800);
  };

  return (
    <section className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 text-sm sm:text-base">Frequently Asked Questions</h3>
            <p className="text-[11px] text-slate-400">Everything you need to know about this APK</p>
          </div>
        </div>

        <button
          onClick={() => setShowAskModal(true)}
          className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-blue-50 hover:bg-blue-100/80 px-2.5 py-1.5 rounded-lg transition-colors"
        >
          <Plus className="w-3 h-3" />
          <span>Ask Question</span>
        </button>
      </div>

      {/* Accordions */}
      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openItems[faq.id];
          const isLast = index === faqs.length - 1;

          return (
            <details
              key={faq.id}
              open={isOpen}
              onClick={(e) => {
                e.preventDefault();
                toggleItem(faq.id);
              }}
              className={`group cursor-pointer ${!isLast ? 'border-b border-slate-100 pb-3' : ''}`}
            >
              <summary className="font-bold text-slate-800 flex justify-between items-center list-none text-sm sm:text-base select-none">
                <span className="pr-4">{faq.question}</span>
                <span className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-600' : ''}`}>
                  <i className="fa-solid fa-chevron-down text-xs" />
                </span>
              </summary>
              <div className="text-xs text-slate-500 mt-2 leading-relaxed bg-slate-50/60 p-2.5 rounded-xl border border-slate-100/60">
                {faq.answer}
              </div>
            </details>
          );
        })}
      </div>

      {/* Ask Question Modal */}
      {showAskModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm">Ask a question about this APK</h4>
              <button onClick={() => setShowAskModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            {submittedMessage ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Your question has been submitted for review!</span>
              </div>
            ) : (
              <form onSubmit={handleAskQuestion} className="space-y-3">
                <textarea
                  rows={3}
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="e.g. Does this support Samsung OneUI 6.0?"
                  className="w-full border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-blue-500"
                  required
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAskModal(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 font-semibold rounded-lg hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
                  >
                    Submit Question
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
