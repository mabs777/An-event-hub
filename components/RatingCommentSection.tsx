/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CommentReview } from '../types';
import { ThumbsUp, CheckCircle, MessageSquare, Star, Sparkles, User, Heart } from 'lucide-react';

interface RatingCommentSectionProps {
  comments: CommentReview[];
  onAddComment: (comment: CommentReview) => void;
}

const RATING_LABELS: Record<number, string> = {
  1: 'Poor / Buggy',
  2: 'Fair / Needs Improvement',
  3: 'Good / Works',
  4: 'Very Good / Recommended',
  5: 'Excellent / 5 Stars'
};

const AVATAR_COLORS = [
  'bg-blue-600',
  'bg-emerald-600',
  'bg-purple-600',
  'bg-rose-600',
  'bg-amber-600',
  'bg-indigo-600',
  'bg-teal-600'
];

export const RatingCommentSection: React.FC<RatingCommentSectionProps> = ({
  comments,
  onAddComment
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [authorName, setAuthorName] = useState<string>('');
  const [commentText, setCommentText] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('Verified User');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [likesState, setLikesState] = useState<Record<string, { count: number; liked: boolean }>>({});

  const TAG_OPTIONS = ['Verified User', 'Fast Download', 'Clean APK', 'Working Smooth', 'MOD Tested'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const randomColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];

    const newReview: CommentReview = {
      id: `rev-${Date.now()}`,
      author: authorName.trim() || 'Anonymous User',
      avatarColor: randomColor,
      rating: rating,
      date: 'Just now',
      comment: commentText.trim(),
      tag: selectedTag,
      likes: 1,
      userLiked: true
    };

    onAddComment(newReview);
    setCommentText('');
    setAuthorName('');
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  const toggleLike = (commentId: string, currentLikes: number) => {
    setLikesState(prev => {
      const current = prev[commentId] || { count: currentLikes, liked: false };
      const newLiked = !current.liked;
      return {
        ...prev,
        [commentId]: {
          count: newLiked ? current.count + 1 : current.count - 1,
          liked: newLiked
        }
      };
    });
  };

  return (
    <div className="space-y-4">
      {/* Rating & Comment Form */}
      <section className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-xs">
              <i className="fa-solid fa-pen text-xs" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">Share Your Thoughts</h3>
              <p className="text-[11px] text-slate-400">Leave a review or feedback for fellow Android users</p>
            </div>
          </div>

          <div className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60 hidden xs:block">
            {RATING_LABELS[hoverRating || rating]}
          </div>
        </div>

        {submitted && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2 animate-fadeIn">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Thank you! Your review has been posted successfully.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Optional Name & Tag selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Your Nickname <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. AndroidGamer99"
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                maxLength={30}
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Feedback Tag
              </label>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-500 bg-white transition-colors"
              >
                {TAG_OPTIONS.map((tag) => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Comment Textarea */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Your comment <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-400"
              placeholder="Write your thoughts..."
              required
            />
          </div>

          {/* Stars & Submit Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            {/* Interactive Stars */}
            <div className="flex items-center gap-1 text-slate-300 text-lg">
              {[1, 2, 3, 4, 5].map((starIndex) => {
                const isActive = (hoverRating || rating) >= starIndex;
                return (
                  <i
                    key={starIndex}
                    onClick={() => setRating(starIndex)}
                    onMouseEnter={() => setHoverRating(starIndex)}
                    onMouseLeave={() => setHoverRating(0)}
                    className={`${isActive ? 'fa-solid text-amber-400' : 'fa-regular hover:text-amber-400'} fa-star cursor-pointer transition-colors px-0.5`}
                    title={`${starIndex} Star`}
                  />
                );
              })}
              <span className="text-xs font-semibold text-slate-600 ml-2">
                {rating} / 5
              </span>
            </div>

            {/* Cyan Submit Button */}
            <button
              type="submit"
              className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-700 active:scale-[0.99] text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-cyan-600/20 cursor-pointer"
            >
              Submit comment
            </button>
          </div>
        </form>
      </section>

      {/* User Reviews Feed */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-slate-400" />
            <h4 className="font-bold text-slate-800 text-xs sm:text-sm">
              User Reviews ({comments.length})
            </h4>
          </div>
          <span className="text-[11px] text-slate-400">Sorted by newest</span>
        </div>

        <div className="space-y-2.5">
          {comments.map((rev) => {
            const likeInfo = likesState[rev.id] || { count: rev.likes, liked: rev.userLiked || false };

            return (
              <div
                key={rev.id}
                className="bg-white border border-slate-200/70 rounded-2xl p-4 shadow-xs space-y-2 text-xs transition-colors hover:border-slate-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full ${rev.avatarColor} text-white font-bold flex items-center justify-center text-xs shadow-xs`}>
                      {rev.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block text-xs">{rev.author}</span>
                      <span className="text-[10px] text-slate-400">{rev.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {rev.tag && (
                      <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full hidden xs:inline">
                        {rev.tag}
                      </span>
                    )}
                    <div className="flex items-center text-amber-400 text-xs">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`${i < rev.rating ? 'fa-solid text-amber-400' : 'fa-regular text-slate-200'} fa-star text-[10px]`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-slate-600 leading-relaxed pl-10 pr-2">
                  {rev.comment}
                </p>

                <div className="flex items-center justify-end gap-3 pt-1 border-t border-slate-50 text-[11px]">
                  <button
                    onClick={() => toggleLike(rev.id, rev.likes)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors ${
                      likeInfo.liked
                        ? 'text-rose-600 bg-rose-50 font-bold'
                        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{likeInfo.count} Helpful</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
