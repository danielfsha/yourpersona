"use client";
import TextShimmer from "@/components/text-shimmer";
import { useState } from "react";

export default function Hero() {
  // Every time someone hovers the headline, play the shimmer again.
  const [timesHovered, setTimesHovered] = useState(0);

  return (
    <div>
      <h1
        onMouseEnter={() => setTimesHovered((count) => count + 1)}
        className="group font-serif tracking-tight leading-[1.1] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-center"
      >
        Your personal
        <br />
        <TextShimmer replayOn={timesHovered}>intelligence</TextShimmer>
      </h1>
    </div>
  );
}
