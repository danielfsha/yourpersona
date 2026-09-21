"use client";
import TextShimmer from "@/components/text-shimmer";
import { useState } from "react";

export default function Hero() {
  // Every time someone hovers the headline, play the shimmer again.
  const [timesHovered, setTimesHovered] = useState(0);

  return (
    <div className="w-full p-8 flex flex-col items-center justify-center gap-1">
      <h1
        onMouseEnter={() => setTimesHovered((count) => count + 1)}
        className="group font-serif tracking-tight leading-[1.1] text-6xl text-center"
      >
        Your personal
        <br />
        <TextShimmer replayOn={timesHovered}>intelligence</TextShimmer>
      </h1>

      <p className="text-center mt-4 text-lg max-w-sm mx-auto col text-zinc-700 dark:text-zinc-300">
        Discover the power of your personal intelligence with Persona.
      </p>
    </div>
  );
}
