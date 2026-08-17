/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface CommentReview {
  id: string;
  author: string;
  avatarColor: string;
  rating: number;
  date: string;
  comment: string;
  tag?: string;
  likes: number;
  userLiked?: boolean;
}

export interface ApkDetails {
  id: string;
  name: string;
  packageName: string;
  version: string;
  size: string;
  minAndroid: string;
  developer: string;
  updateDate: string;
  downloadsCount: string;
  rating: number;
  ratingCount: number;
  iconBg: string;
  iconLetter: string;
  iconImage?: string;
  category: string;
  isMod: boolean;
  modInfo?: string;
  tag: string;
  shortDesc: string;
  fullDesc: string[];
  features: string[];
  screenshots: string[];
  faqs: FaqItem[];
  md5: string;
  sha256: string;
}

export interface DownloadMirror {
  id: string;
  name: string;
  speed: string;
  type: string;
  size: string;
  version: string;
}
