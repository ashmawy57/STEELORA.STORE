"use client";

import React, { useEffect, useRef, useState } from "react";

export type RevealAnimation =
  | "fade-up"
  | "fade-down"
  | "fade-in"
  | "scale-up"
  | "slide-right"
  | "slide-left";

interface RevealProps {
  children: React.ReactNode;
  animation?: RevealAnimation;
  delay?: number; // ms
  duration?: number; // ms
  threshold?: number;
  className?: string;
  as?: React.ElementType;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  threshold = 0.12,
  className = "",
  as: Component = "div",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (domRef.current) observer.unobserve(domRef.current);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const currentElem = domRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) observer.unobserve(currentElem);
    };
  }, [threshold]);

  const getAnimationStyles = () => {
    const transitionStyle: React.CSSProperties = {
      transitionProperty: "opacity, transform",
      transitionDuration: `${duration}ms`,
      transitionTimingFunction: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      transitionDelay: `${delay}ms`,
      willChange: "opacity, transform",
    };

    if (isVisible) {
      return {
        ...transitionStyle,
        opacity: 1,
        transform: "translate3d(0, 0, 0) scale(1)",
      };
    }

    switch (animation) {
      case "fade-up":
        return {
          ...transitionStyle,
          opacity: 0,
          transform: "translate3d(0, 24px, 0)",
        };
      case "fade-down":
        return {
          ...transitionStyle,
          opacity: 0,
          transform: "translate3d(0, -24px, 0)",
        };
      case "scale-up":
        return {
          ...transitionStyle,
          opacity: 0,
          transform: "scale(0.96)",
        };
      case "slide-right":
        return {
          ...transitionStyle,
          opacity: 0,
          transform: "translate3d(-28px, 0, 0)",
        };
      case "slide-left":
        return {
          ...transitionStyle,
          opacity: 0,
          transform: "translate3d(28px, 0, 0)",
        };
      case "fade-in":
      default:
        return {
          ...transitionStyle,
          opacity: 0,
          transform: "translate3d(0, 0, 0)",
        };
    }
  };

  return (
    <Component
      ref={domRef}
      style={getAnimationStyles()}
      className={className}
    >
      {children}
    </Component>
  );
};
