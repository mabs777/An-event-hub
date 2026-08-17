/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ApkDetails } from '../types';
import { 
  Download, 
  CheckCircle, 
  ShieldCheck, 
  Server, 
  Send, 
  QrCode, 
  Zap, 
  FileCode, 
  AlertCircle, 
  ArrowRight,
  ExternalLink,
  X
} from 'lucide-react';

interface DownloadSectionProps {
  apk: ApkDetails;
  isOpen?: boolean;
  onClose?: () => void;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({ apk, isOpen: initialOpen = false, onClose }) => {
  const [modalOpen, setModalOpen] = useState(initialOpen);
  const [countdown, setCountdown] = useState(3);
  const [ready, setReady] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadCompleted, setDownloadCompleted] = useState(false);
  const [activeMirror, setActiveMirror] = useState<string>('primary');
  const [showQr, setShowQr] = useState(false);

  // Sync external isOpen prop
  useEffect(() => {
    if (initialOpen) {
      handleOpenDownloadModal();
    }
  }, [initialOpen]);

  const handleOpenDownloadModal = () => {
    setModalOpen(true);
    setCountdown(3);
    setReady(false);
    setDownloading(false);
    setProgress(0);
    setDownloadCompleted(false);

    let count = 3;
    const timer = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count <= 0) {
        clearInterval(timer);
        setReady(true);
      }
    }, 800);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    if (onClose) onClose();
  };

  const startDownload = (mirrorName: string = 'Primary Fast Server') => {
    setActiveMirror(mirrorName);
    setDownloading(true);
    setProgress(5);
    setDownloadCompleted(false);

    let current = 5;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 20) + 10;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setProgress(100);
        setDownloading(false);
        setDownloadCompleted(true);
      } else {
        setProgress(current);
      }
    }, 300);
  };

  return (
    <>
      {/* Main Download Section */}
      <section className="text-center pt-2 space-y-2">
        <button
          onClick={handleOpenDownloadModal}
          className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-3 transition-all text-base cursor-pointer group"
        >
          <i className="fa-solid fa-download text-lg group-hover:translate-y-0.5 transition-transform" />
          <span>Download Now ({apk.size})</span>
        </button>

        <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 font-medium pt-1">
          <span className="flex items-center gap-1 text-emerald-600 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            Clean & Safe APK
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-500" />
            High Speed CDN
          </span>
          <span>•</span>
          <span>Version {apk.version}</span>
        </div>
      </section>

      {/* Interactive Download Manager Modal */}
      {modalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl space-y-5 relative my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
              aria-label="Close download window"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 pr-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white text-xl font-bold shadow-md shadow-blue-500/20 shrink-0">
                {apk.iconLetter}
              </div>
              <div className="min-w-0">
                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg leading-tight truncate">
                  Download {apk.name}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                  <span>{apk.version}</span>
                  <span>•</span>
                  <span>{apk.size}</span>
                  <span>•</span>
                  <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </span>
                </p>
              </div>
            </div>

            {/* Countdown / Ready State */}
            {!ready ? (
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black text-xl animate-bounce">
                  {countdown}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Generating Fast Download Link...</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Scanning signature hashes and selecting optimal CDN node</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Download Progress State */}
                {downloading && (
                  <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-2xl space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-bold text-blue-900">
                      <span className="flex items-center gap-1.5">
                        <i className="fa-solid fa-spinner fa-spin text-blue-600" />
                        Downloading APK...
                      </span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-blue-200/60 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="bg-blue-600 h-full rounded-full transition-all duration-200"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px] text-blue-600 font-medium">
                      <span>Server: {activeMirror}</span>
                      <span>Speed: 12.4 MB/s</span>
                    </div>
                  </div>
                )}

                {downloadCompleted && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Download Started Successfully!</span>
                    </div>
                    <p className="text-[11px] text-emerald-700 leading-relaxed">
                      File <span className="font-mono font-bold">{apk.id}_{apk.version}.apk</span> has been sent to your device downloads folder.
                    </p>
                  </div>
                )}

                {/* Primary Download Button */}
                <button
                  onClick={() => startDownload('US Fast Edge CDN')}
                  className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold py-3.5 px-4 rounded-xl shadow-md shadow-blue-500/20 flex items-center justify-between transition-all text-xs sm:text-sm"
                >
                  <span className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    <span>Direct Fast Download (APK)</span>
                  </span>
                  <span className="text-[11px] bg-blue-500/40 px-2 py-0.5 rounded-md font-mono">
                    {apk.size}
                  </span>
                </button>

                {/* Mirror Links */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Alternative Fast Mirrors
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => startDownload('Cloudflare Mirror 1')}
                      className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-slate-50 flex items-center justify-between text-left transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Server className="w-3.5 h-3.5 text-slate-500" />
                        <div>
                          <span className="font-bold text-slate-800 block text-xs">Mirror #1 (Cloudflare)</span>
                          <span className="text-[10px] text-emerald-600 font-semibold">Speed: Ultra Fast</span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    <button
                      onClick={() => startDownload('Google Drive CDN')}
                      className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-slate-50 flex items-center justify-between text-left transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Server className="w-3.5 h-3.5 text-slate-500" />
                        <div>
                          <span className="font-bold text-slate-800 block text-xs">Mirror #2 (Direct Drive)</span>
                          <span className="text-[10px] text-emerald-600 font-semibold">Speed: High Speed</span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => setShowQr(!showQr)}
                      className="flex-1 p-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <QrCode className="w-3.5 h-3.5 text-slate-600" />
                      <span>{showQr ? 'Hide QR Code' : 'Scan QR for Phone'}</span>
                    </button>

                    <a
                      href="https://t.me"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 p-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Send className="w-3.5 h-3.5 text-sky-500" />
                      <span>Telegram Channel</span>
                    </a>
                  </div>

                  {/* QR code box */}
                  {showQr && (
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1.5 animate-fadeIn">
                      <div className="w-28 h-28 mx-auto bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-center">
                        <div className="grid grid-cols-6 gap-1 w-full h-full p-1 bg-slate-900 rounded">
                          {[...Array(36)].map((_, i) => (
                            <div 
                              key={i} 
                              className={`rounded-xs ${i % 2 === 0 || i % 5 === 0 ? 'bg-white' : 'bg-transparent'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-500">Scan with your Android camera to download directly</p>
                    </div>
                  )}
                </div>

                {/* Installation Quick Guide */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500 space-y-1">
                  <span className="font-bold text-slate-700 block">How to install APK:</span>
                  <ol className="list-decimal list-inside space-y-0.5 text-[10px]">
                    <li>Download the APK file to your device.</li>
                    <li>Allow <strong>"Install from Unknown Sources"</strong> in Android settings.</li>
                    <li>Open the APK file and tap <strong>Install</strong>.</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
