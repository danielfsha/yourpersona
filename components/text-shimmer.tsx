"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TextShimmerProps {
  children: React.ReactNode;
  className?: string;
  /** Change this (e.g. a hover counter) whenever you want the shimmer to play again. */
  replayOn?: number;
}

export default function TextShimmer({
  children,
  className,
  replayOn = 0,
}: TextShimmerProps) {
  const [animationKey, setAnimationKey] = useState(0);

  // The shimmer already plays once when it first appears, so we only need
  // to restart it here whenever the parent asks us to (replayOn changes).
  useEffect(() => {
    setAnimationKey((current) => current + 1);
  }, [replayOn]);

  return (
    <span className="inline-block select-none">
      <style>{`
        @keyframes shimmerFluidSinglePass {
          0% {
            background-position: 100% 0%;
          }
          100% {
            background-position: 0% 0%;
          }
        }

        .shimmer-headline {
          /* 
            Exact color stops from uploaded Figma specifications:
            0%   #000000 100%
            33%  #000000 100%
            40%  #C679C4 100%
            45%  #FA3D1D 100%
            50%  #FFB005 100%
            55%  #E1E1FE 100%
            60%  #0358F7 100%
            67%  #0358F7   0%
            100% #0358F7   0%
          */
          background-image: linear-gradient(
            90deg,
            #000000 0%,
            #000000 33%,
            #C679C4 40%,
            #FA3D1D 45%,
            #FFB005 50%,
            #E1E1FE 55%,
            #0358F7 60%,
            rgba(3, 88, 247, 0) 67%,
            rgba(3, 88, 247, 0) 100%
          );
          background-size: 400% 100%;
          background-repeat: no-repeat;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          display: inline-block;
          line-height: 1.3;
          padding: 0.15em 0;
          margin: -0.15em 0;
          animation: shimmerFluidSinglePass 1.35s cubic-bezier(0.25, 1, 0.35, 1) forwards;
          will-change: background-position;
        }
      `}</style>

      <span
        id="shimmer-headline"
        key={animationKey}
        className={cn("shimmer-headline", className)}
      >
        {children}
      </span>
    </span>
  );
}
