"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

export interface FeatureItem {
  id?: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  image: string;
}

export interface FeatureAccordionShowcaseProps {
  features?: FeatureItem[];
  coverImage?: string;
  defaultOpenIndex?: number | null;
  theme?: "dark" | "light" | "system";
  className?: string;
}

const DEFAULT_FEATURES: FeatureItem[] = [
  {
    id: "materials",
    title: "Materials",
    content: (
      <p>
        Materials. Knit for every day, Liquid for the gym and the rain, Suede
        for dinner.
      </p>
    ),
    image:
      "https://assets.codepen.io/605876/the-faux-phone-closeup.png?format=auto",
  },
  {
    id: "colors",
    title: "Colors",
    content: (
      <p>Colors. Carbone Black, Beige Perla, Brown Mocha and Capri Orange.</p>
    ),
    image:
      "https://assets.codepen.io/605876/the-faux-phone-breakdown.png?format=auto",
  },
  {
    id: "brain",
    title: "Brain",
    content: (
      <p>
        The brain. It hears you, understands what you said, and hands the task
        to your Persona in the time it takes t
      </p>
    ),
    image:
      "https://assets.codepen.io/605876/the-faux-phone-parallax.png?format=auto",
  },
  {
    id: "voice",
    title: "Voice",
    content: (
      <p>
        Speak. Listen. Either way. Two mics hear a whisper across the room; a
        speaker answers out loud. Pair your headphones and it moves to your ears
        without a tap.
      </p>
    ),
    image:
      "https://assets.codepen.io/605876/the-faux-phone-lion-king.png?format=auto",
  },
  {
    id: "ring",
    title: "Ring",
    content: (
      <p>
        One ring of light. It tells you where your task is: listening, working,
        done. No screen, no notification, no looking down.
      </p>
    ),
    image:
      "https://assets.codepen.io/605876/the-faux-phone-camera-shot.png?format=auto",
  },
  {
    id: "magnetic-snap",
    title: "Magnetic Snap",
    content: (
      <p>
        Magnetic snap. Closes one-handed and stays closed through a workout.
        Pull, and it lets go. No buckle, no pin.
      </p>
    ),
    image:
      "https://assets.codepen.io/605876/the-faux-phone-camera-shot.png?format=auto",
  },
];

const DEFAULT_COVER =
  "https://assets.codepen.io/605876/the-faux-phone.png?format=auto";

const COMPONENT_STYLES = `
:root {
  --ease: cubic-bezier(.42,0,.58,1);
  --bounce: linear(
    0 0%, 0.4214 6.61%, 0.5762 9.59%,
    0.7047 12.55%, 0.8115 15.61%,
    0.8964 18.78%, 0.9614 22.13%,
    1.0078 25.74%, 1.0282 28.18%,
    1.0422 30.82%, 1.0503 33.7%,
    1.0527 36.95%, 1.0468 42.53%,
    1.015 58.45%, 1.0045 67.2%,
    0.9987 80.44%, 1 100%
  );
  --speed: 0.5s;
  --width: 300px;
  --sizing: 56px;
  --background: light-dark(hsl(0 0% 10% / 0.45), hsl(0 0% 40% / 0.5));
  --hover-background: light-dark(hsl(0 0% 18% / 0.75), hsl(0 0% 48% / 0.5));
  --distance: 15%;
}

@keyframes showcase-slide {
  0% {
    scale: var(--from-scale, 0);
    translate: var(--from-x, -200px) var(--from-y, 0);
  }
}
@keyframes showcase-start {
  0% {
    width: var(--sizing);
  }
}
@keyframes showcase-color-in {
  0% {
    color: #0000;
  }
}
@keyframes showcase-fade-in {
  0% {
    opacity: 0;
  }
}

.showcase-section details:nth-of-type(3) {
  animation:
    showcase-slide .75s 0.5s both var(--bounce),
    showcase-start .6s 1.05s var(--bounce) both,
    showcase-color-in .6s 1.25s var(--bounce) both;
}
.showcase-section details:nth-of-type(1),
.showcase-section details:nth-of-type(2) {
  --from-y: 75%;
}
.showcase-section details:nth-of-type(4),
.showcase-section details:nth-of-type(5),
.showcase-section details:nth-of-type(6) {
  --from-y: -75%;
}
.showcase-section details:nth-of-type(2),
.showcase-section details:nth-of-type(4) {
  --index: 1;
}
.showcase-section details:nth-of-type(1),
.showcase-section details:nth-of-type(5) {
  --index: 2;
}
.showcase-section details:nth-of-type(6) {
  --index: 3;
}
.showcase-section details:nth-of-type(1),
.showcase-section details:nth-of-type(2),
.showcase-section details:nth-of-type(4),
.showcase-section details:nth-of-type(5),
.showcase-section details:nth-of-type(6) {
  --from-scale: 1;
  --from-x: 35%;
  animation:
    showcase-start .6s calc(1.05s + (var(--index) * 0.08s)) var(--bounce) both,
    showcase-fade-in .6s calc(1.05s + (var(--index) * 0.08s)) var(--bounce) both,
    showcase-slide .6s calc(1.05s + (var(--index) * 0.08s)) var(--bounce) both,
    showcase-color-in .6s calc(1.25s + (var(--index) * 0.08s)) var(--bounce) both;
}

.showcase-section {
  margin-block: 2rem;
  display: flex;
  place-items: center;
  gap: 1rem;
  position: relative;
  min-height: 500px;
  aspect-ratio: 4 / 3;
  justify-content: flex-start;
  overflow: hidden;
  max-width: calc(100vw - 2rem);
  width: 800px;
  border-radius: 2rem;
  container-type: inline-size;
  background: var(--background);
}

.showcase-section .column:first-of-type {
  padding-left: 4rem;
  display: grid;
  grid-auto-rows: auto;
  width: var(--width);
  place-items: center;
  justify-items: start;
  gap: .5rem;
  z-index: 20;
  flex: 1 0 var(--width);
}

.showcase-section .column:last-of-type {
  width: 100cqi;
  height: 100%;
  position: relative;
  display: grid;
  grid-auto-flow: row;
  place-items: center;
  gap: .675rem;
  pointer-events: none;
}

.showcase-section .column:last-of-type .img-block {
  position: absolute;
  inset: 0;
}

.showcase-section .column:last-of-type .img-block .img-wrapper {
  width: 100%;
  object-fit: cover;
  height: 100%;
}

.showcase-section .column:last-of-type .img-block .img-wrapper img {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  aspect-ratio: 1;
  height: 100%;
  width: 100cqw;
  object-fit: cover;
}

.showcase-section summary {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  padding: 1.5rem;
  border-radius: calc(var(--sizing) * 0.5);
  height: var(--sizing);
  min-height: var(--sizing);
  cursor: pointer;
  z-index: 20;
  position: relative;
  transition-property: opacity, width;
  transition-duration: calc(var(--speed) * 0.5), calc(var(--speed) * 1.5);
  transition-timing-function: var(--ease), var(--bounce);
  transition-delay: calc(var(--speed) * 1.05), 0s;
  white-space: nowrap;
  font-weight: 600;
  outline-color: canvasText;
}

.showcase-section summary svg {
  width: 24px;
  aspect-ratio: 1;
}

.showcase-section [open] summary {
  opacity: 0;
  pointer-events: none;
  transition-delay: 0s;
  width: var(--width);
}

.showcase-section details {
  display: inline-block;
  border-radius: calc(var(--sizing) * 0.5);
  overflow: hidden;
  min-height: var(--sizing);
  background: var(--background);
  backdrop-filter: blur(20px) saturate(180%);
  color: #fff;
  transition: background 0.2s var(--ease);
}

.showcase-section details:hover:not([open]) {
  background: var(--hover-background);
}

.showcase-section summary:marker {
  opacity: 0;
}

.showcase-section details::details-content {
  opacity: 0;
  transition-property: content-visibility, height, width, opacity;
  transition-duration: var(--speed), calc(var(--speed) * 1.6), calc(var(--speed) * 1.6), calc(var(--speed) * 0.5);
  transition-behavior: allow-discrete;
  transition-timing-function: var(--ease), var(--bounce), var(--bounce), var(--ease);
  overflow: visible;
  height: var(--sizing);
  margin-top: calc(var(--sizing) * -1);
  width: 120px;
  min-height: var(--sizing);
}

.showcase-section [open]::details-content {
  height: fit-content;
  width: var(--width);
  opacity: 1;
  transition-delay: 0s, 0s, 0s, calc(var(--speed) * 1);
}

.showcase-section .content {
  width: var(--width);
  min-height: var(--sizing);
}

.showcase-section details,
.showcase-section details::details-content {
  interpolate-size: allow-keywords;
}

.showcase-section .content p {
  margin: 0;
  width: var(--width);
  padding: 1.5rem;
  display: inline-block;
}

.showcase-section .content a {
  text-decoration: underline;
  text-underline-offset: 3px;
  color: #fff;
}
.showcase-section .content a:hover {
  color: #93c5fd;
}

/* Action Controls */
.showcase-section [data-action] {
  position: absolute;
  display: grid;
  place-items: center;
  width: 36px;
  aspect-ratio: 1;
  border: 0;
  cursor: pointer;
  padding: 0;
  border-radius: 50%;
  background: var(--background);
  transition-property: opacity, background, translate, transform;
  transition-duration: 0.26s;
  transition-timing-function: var(--ease);
  z-index: 20;
}

.showcase-section [data-action]:hover {
  background: var(--hover-background);
}

.showcase-section [data-action]::after {
  content: '';
  position: absolute;
  inset: -4px;
}

.showcase-section [data-action] svg {
  width: 22px;
  color: #fff;
  stroke-width: 3;
}

.showcase-section [data-action="next"],
.showcase-section [data-action="previous"] {
  position: absolute;
  top: 50%;
  left: 1rem;
}

.showcase-section [data-action="previous"] {
  translate: 0 -150%;
}

.showcase-section [data-action="next"] {
  translate: 0 50%;
}

.showcase-section [data-action="next"] svg {
  rotate: 180deg;
}

.showcase-section [data-action="exit"] {
  position: absolute;
  right: 1rem;
  top: 1rem;
}

.showcase-section [data-action="exit"] svg {
  rotate: 45deg;
}

.showcase-section:not(:has([open])) [data-action] {
  opacity: 0;
  transform: translateY(1rem);
  pointer-events: none;
}

/* Images & Parallax */
.showcase-section .img-wrapper {
  display: inline-block;
  transform: translateX(0);
  transition-duration: calc(var(--speed) * 0), calc(var(--speed) * 0.35), calc(var(--speed) * 1.15);
  transition-timing-function: var(--ease), var(--ease), var(--bounce);
  transform-origin: 100% 150%;
  transition-property: transform, opacity, scale;
}

.showcase-section[data-checking-details="true"] .img-wrapper {
  transform-origin: 50% 100%;
  transition-timing-function: var(--ease);
  transition-duration: calc(var(--speed) * 0.6), calc(var(--speed) * 0.25), calc(var(--speed) * 0.65);
}

.showcase-section .img-block:nth-of-type(1) {
  z-index: 10;
}

.showcase-section .img-block:nth-of-type(1) .img-wrapper {
  transform-origin: 50% 50%;
  transition-property: translate, opacity, scale;
  transition-duration: calc(var(--speed) * .4), calc(var(--speed) * 0.35), calc(var(--speed) * 1.15);
  transition-timing-function: ease-in, var(--ease), var(--bounce);
}

.showcase-section:has(details:nth-of-type(1)[open]) .column:last-of-type .img-block:nth-of-type(2),
.showcase-section:has(details:nth-of-type(2)[open]) .column:last-of-type .img-block:nth-of-type(3),
.showcase-section:has(details:nth-of-type(3)[open]) .column:last-of-type .img-block:nth-of-type(4),
.showcase-section:has(details:nth-of-type(4)[open]) .column:last-of-type .img-block:nth-of-type(5),
.showcase-section:has(details:nth-of-type(5)[open]) .column:last-of-type .img-block:nth-of-type(6),
.showcase-section:has(details:nth-of-type(6)[open]) .column:last-of-type .img-block:nth-of-type(7) {
  translate: var(--distance) 0;
  z-index: 2;
}

.showcase-section:has(details:nth-of-type(1)[open]) .column:last-of-type .img-block:nth-of-type(2) .img-wrapper,
.showcase-section:has(details:nth-of-type(2)[open]) .column:last-of-type .img-block:nth-of-type(3) .img-wrapper,
.showcase-section:has(details:nth-of-type(3)[open]) .column:last-of-type .img-block:nth-of-type(4) .img-wrapper,
.showcase-section:has(details:nth-of-type(4)[open]) .column:last-of-type .img-block:nth-of-type(5) .img-wrapper,
.showcase-section:has(details:nth-of-type(5)[open]) .column:last-of-type .img-block:nth-of-type(6) .img-wrapper,
.showcase-section:has(details:nth-of-type(6)[open]) .column:last-of-type .img-block:nth-of-type(7) .img-wrapper {
  transform: translateX(calc(var(--distance) * -1)); 
  transition-delay: calc(var(--speed) * 0.2);
}

.showcase-section:not(:has([open])) div.column:nth-of-type(2) div.img-block:first-of-type {
  translate: 0 0;
}

.showcase-section:not(:has([open])) div.column:nth-of-type(2) div.img-block:first-of-type .img-wrapper {
  transform: translateX(0%);
  transition-delay: calc(var(--speed) * 0.2);
}

.showcase-section:not(:has(details:nth-of-type(1)[open])) .column:last-of-type .img-block:nth-of-type(2) .img-wrapper,
.showcase-section:not(:has(details:nth-of-type(2)[open])) .column:last-of-type .img-block:nth-of-type(3) .img-wrapper,
.showcase-section:not(:has(details:nth-of-type(3)[open])) .column:last-of-type .img-block:nth-of-type(4) .img-wrapper,
.showcase-section:not(:has(details:nth-of-type(4)[open])) .column:last-of-type .img-block:nth-of-type(5) .img-wrapper,
.showcase-section:not(:has(details:nth-of-type(5)[open])) .column:last-of-type .img-block:nth-of-type(6) .img-wrapper,
.showcase-section:not(:has(details:nth-of-type(6)[open])) .column:last-of-type .img-block:nth-of-type(7) .img-wrapper {
  transition-property: translate, opacity, scale;
  transition-timing-function: ease-in, ease-out, ease-in;
  translate: 0 0;
  scale: 0.9;
  opacity: 0;
}

.showcase-section .img-block:nth-of-type(1) .img-wrapper img {
  object-position: calc(50% + 4rem) 50%;
}

.showcase-section .img-block:nth-of-type(2) .img-wrapper img {
  object-position: right;
}

.showcase-section[data-checking-details="true"]:not(:has(details:nth-of-type(1)[open])) .column:last-of-type .img-block:nth-of-type(2) .img-wrapper,
.showcase-section[data-checking-details="true"]:not(:has(details:nth-of-type(2)[open])) .column:last-of-type .img-block:nth-of-type(3) .img-wrapper,
.showcase-section[data-checking-details="true"]:not(:has(details:nth-of-type(3)[open])) .column:last-of-type .img-block:nth-of-type(4) .img-wrapper,
.showcase-section[data-checking-details="true"]:not(:has(details:nth-of-type(4)[open])) .column:last-of-type .img-block:nth-of-type(5) .img-wrapper,
.showcase-section[data-checking-details="true"]:not(:has(details:nth-of-type(5)[open])) .column:last-of-type .img-block:nth-of-type(6) .img-wrapper,
.showcase-section[data-checking-details="true"]:not(:has(details:nth-of-type(6)[open])) .column:last-of-type .img-block:nth-of-type(7) .img-wrapper {
  transform-origin: 50% 100%;
  translate: calc(var(--distance) * -1) 0;
}

.showcase-section:has([open]) .column:last-of-type .img-block:first-of-type .img-wrapper {
  translate: 0 0;
  scale: 1.25;
  opacity: 0;
}
`;

export default function FeatureAccordionShowcase({
  features = DEFAULT_FEATURES,
  coverImage = DEFAULT_COVER,
  defaultOpenIndex = null,
  theme: initialTheme = "dark",
  className = "",
}: FeatureAccordionShowcaseProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
  const [checkingDetails, setCheckingDetails] = useState<boolean>(false);
  const [currentTheme, setCurrentTheme] = useState<"dark" | "light" | "system">(
    initialTheme,
  );
  const sectionRef = useRef<HTMLElement>(null);

  // Synchronize checking-details state with animation timing
  useEffect(() => {
    if (openIndex === null) {
      setCheckingDetails(false);
      return;
    }

    // Set checking details to true after transition settles to enable parallax displacement
    setCheckingDetails(false);
    const timer = setTimeout(() => {
      setCheckingDetails(true);
    }, 450);

    return () => clearTimeout(timer);
  }, [openIndex]);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  const handleNext = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setOpenIndex((prev) => {
        if (prev === null) return 0;
        return (prev + 1) % features.length;
      });
    },
    [features.length],
  );

  const handlePrevious = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setOpenIndex((prev) => {
        if (prev === null) return features.length - 1;
        return (prev - 1 + features.length) % features.length;
      });
    },
    [features.length],
  );

  const handleExit = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenIndex(null);
  }, []);

  // Keyboard navigation support (ArrowUp, ArrowDown, Escape)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (openIndex === null) return;
      if (e.key === "Escape") {
        setOpenIndex(null);
      } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        setOpenIndex((prev) =>
          prev !== null ? (prev + 1) % features.length : 0,
        );
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        setOpenIndex((prev) =>
          prev !== null
            ? (prev - 1 + features.length) % features.length
            : features.length - 1,
        );
      }
    },
    [openIndex, features.length],
  );

  return (
    <div
      id="feature-showcase-container"
      className={`relative flex flex-col items-center justify-center p-4 sm:p-8 w-full font-sans ${className}`}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <style dangerouslySetInnerHTML={{ __html: COMPONENT_STYLES }} />

      <main
        id="showcase-main"
        className="relative flex items-center justify-center"
      >
        <section
          ref={sectionRef}
          id="showcase-section"
          className="showcase-section"
          data-checking-details={checkingDetails ? "true" : "false"}
        >
          {/* Column 1: Accordion Feature Disclosures */}
          <div id="features-column" className="column">
            {features.map((feature, idx) => {
              const isOpen = openIndex === idx;
              return (
                <details
                  key={feature.id || idx}
                  name="feature"
                  open={isOpen}
                  id={`feature-details-${idx}`}
                >
                  <summary
                    id={`feature-summary-${idx}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleToggle(idx);
                    }}
                    tabIndex={0}
                    role="button"
                    aria-expanded={isOpen}
                  >
                    {feature.icon || (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    )}
                    <span>{feature.title}</span>
                  </summary>
                  <div className="content" id={`feature-content-${idx}`}>
                    {feature.content}
                  </div>
                </details>
              );
            })}
          </div>

          {/* Column 2: Phone Visual Stages */}
          <div id="images-column" className="column">
            {/* Block 0: Default Cover Phone Image */}
            <div className="img-block" id="cover-img-block">
              <div className="img-wrapper">
                <img
                  src={coverImage}
                  alt="Default Phone Showcase"
                  loading="eager"
                />
              </div>
            </div>

            {/* Blocks 1..N: Specific Phone Feature Angles */}
            {features.map((feature, idx) => (
              <div
                key={`img-${feature.id || idx}`}
                className="img-block"
                id={`feature-img-block-${idx}`}
              >
                <div className="img-wrapper">
                  <img src={feature.image} alt={feature.title} loading="lazy" />
                </div>
              </div>
            ))}
          </div>

          {/* Control Navigation Buttons */}
          <button
            type="button"
            id="btn-next-feature"
            aria-label="Next feature"
            data-action="next"
            onClick={handleNext}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          </button>

          <button
            type="button"
            id="btn-previous-feature"
            aria-label="Previous feature"
            data-action="previous"
            onClick={handlePrevious}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          </button>

          <button
            type="button"
            id="btn-exit-feature"
            aria-label="Exit detail view"
            data-action="exit"
            onClick={handleExit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
        </section>
      </main>
    </div>
  );
}
