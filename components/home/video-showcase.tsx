"use client";

import React, { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Sparkles } from "lucide-react";
import type { Locale } from "@/lib/dictionaries";

interface VideoShowcaseProps {
  locale: Locale;
}

export const VideoShowcase: React.FC<VideoShowcaseProps> = ({ locale }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const isArabic = locale === "ar";

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="py-20 sm:py-28 bg-charcoal-950 text-white relative overflow-hidden">
      {/* Background ambient gold glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold/10 text-gold border border-gold/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {isArabic ? "تجربة واقعية في الهواء الطلق" : "In-Action Demonstration"}
            </span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white">
            {isArabic
              ? "شاهد شواية ستيلورا في قلب الطبيعة"
              : "Witness STEELORA In The Wild"}
          </h2>

          <p className="text-xs sm:text-sm text-steel-300 max-w-2xl mx-auto leading-relaxed">
            {isArabic
              ? "أداء شواء استثنائي، فتح سريع في ثوانٍ معدودة، وهيكل ستانلس ستيل ٣٠٤ مصمم ليدوم مدى الحياة."
              : "Unrivaled pitmaster performance, instant tool-free folding, and 100% pure marine-grade 304 stainless steel."}
          </p>
        </div>

        {/* Video Player Container */}
        <div className="relative rounded-3xl overflow-hidden bg-charcoal-900 border border-gold/30 shadow-2xl shadow-gold/10 group">
          <video
            ref={videoRef}
            src="/videos/grill-video.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            controls
            className="w-full h-auto max-h-[75vh] object-cover mx-auto block"
            poster="/images/hero/hero-bg.png"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {/* Quick Floating Controls */}
          <div className="absolute top-4 end-4 flex items-center gap-2 z-20 opacity-90 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={toggleMute}
              className="p-3 rounded-full bg-charcoal-950/80 backdrop-blur-md border border-steel-gray/30 text-white hover:text-gold hover:border-gold/60 transition-all shadow-lg"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5 text-gold" />
              )}
            </button>

            <button
              type="button"
              onClick={togglePlay}
              className="p-3 rounded-full bg-charcoal-950/80 backdrop-blur-md border border-steel-gray/30 text-white hover:text-gold hover:border-gold/60 transition-all shadow-lg"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 text-gold fill-gold" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
