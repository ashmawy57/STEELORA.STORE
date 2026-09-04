"use client";

import React, { useRef, useEffect } from "react";

export const HeroBackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay policy handled silently
        });
      }
    }
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover object-center pointer-events-none"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        <source src="/hero video.mp4" type="video/mp4" />
      </video>
      {/* Subtle bottom shadow gradient to blend smoothly into the next section */}
      <div className="absolute bottom-0 inset-x-0 h-28 sm:h-40 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/30 to-transparent pointer-events-none" />
    </div>
  );
};
