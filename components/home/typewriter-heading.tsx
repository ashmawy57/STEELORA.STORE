"use client";

import React, { useState, useEffect } from "react";

interface TypewriterHeadingProps {
  text: string;
  speed?: number;
  pauseDuration?: number;
}

export const TypewriterHeading: React.FC<TypewriterHeadingProps> = ({
  text,
  speed = 45,
  pauseDuration = 3500,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting && index <= text.length) {
      // Typing mode
      if (index === text.length) {
        // Finished typing full text, pause before deleting or keep full
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      } else {
        timeout = setTimeout(() => {
          setDisplayedText(text.slice(0, index + 1));
          setIndex((prev) => prev + 1);
        }, speed);
      }
    } else if (isDeleting && index >= 0) {
      // Deleting mode
      if (index === 0) {
        setIsDeleting(false);
        timeout = setTimeout(() => {
          setIndex(0);
        }, 500);
      } else {
        timeout = setTimeout(() => {
          setDisplayedText(text.slice(0, index - 1));
          setIndex((prev) => prev - 1);
        }, speed / 2);
      }
    }

    return () => clearTimeout(timeout);
  }, [index, isDeleting, text, speed, pauseDuration]);

  // Reset when text changes (e.g. language switch)
  useEffect(() => {
    setDisplayedText("");
    setIndex(0);
    setIsDeleting(false);
  }, [text]);

  return (
    <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white max-w-5xl leading-[1.15] drop-shadow-2xl min-h-[3.2em] sm:min-h-[2.4em] flex items-center justify-center flex-wrap">
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-sand-light to-gold-light">
        {displayedText}
      </span>
      {/* Blinking Neon Gold Cursor */}
      <span className="inline-block w-[3px] sm:w-[4px] h-[0.9em] ms-1.5 bg-gradient-to-b from-gold-light via-gold to-amber-500 rounded-sm shadow-[0_0_12px_rgba(198,166,100,0.9)] animate-pulse" />
    </h1>
  );
};
