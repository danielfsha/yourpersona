import TextShimmer from "@/components/text-shimmer";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black overflow-hidden">
      <h1 className="font-serif tracking-tight leading-[1.1] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-center">
        Your personal
        <br />
        <TextShimmer className="">intelligence</TextShimmer>
      </h1>
    </div>
  );
}
