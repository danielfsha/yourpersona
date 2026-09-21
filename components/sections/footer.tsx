"use client";
import TextShimmer from "@/components/text-shimmer";
import { useState } from "react";
import Logo from "../ui/logo";

export default function Footer() {
  // Every time someone hovers the headline, play the shimmer again.
  const [timesHovered, setTimesHovered] = useState(0);

  return (
    <div className="w-full p-1 flex items-center justify-center">
      <h1
        onMouseEnter={() => setTimesHovered((count) => count + 1)}
        className="group font-serif tracking-tight leading-none text-[270px] text-center font-thin flex items-center justify-center"
      >
        <Logo className="mr-12 size-[200px]" />
        <TextShimmer replayOn={timesHovered}>Persona</TextShimmer>
      </h1>
    </div>
  );
}
