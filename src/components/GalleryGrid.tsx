"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { GalleryImage } from "@/lib/media";

export function GalleryGrid({
  images,
  captions,
}: {
  images: GalleryImage[];
  captions: Record<string, string>;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") setActiveIndex((i) => (i === null ? 0 : (i + 1) % images.length));
      if (e.key === "ArrowLeft")
        setActiveIndex((i) => (i === null ? 0 : (i - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, images.length]);

  const active = activeIndex !== null ? images[activeIndex] : null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {images.map((img, idx) => {
          const caption = captions[img.id] || img.id;
          return (
            <button
              key={img.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className="group relative aspect-4/3 overflow-hidden rounded-2xl bg-ink-100 border border-ink-100 shadow-sm hover:shadow-xl transition-all text-start cursor-pointer"
            >
              <Image
                src={img.src}
                alt={caption}
                width={img.width}
                height={img.height}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/15 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <span className="absolute top-3 end-3 flex size-9 items-center justify-center rounded-full bg-ink-950/70 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Expand className="size-4" aria-hidden />
              </span>
              <p className="absolute inset-x-4 bottom-3.5 text-xs sm:text-sm font-semibold text-white leading-snug">
                {caption}
              </p>
            </button>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {active && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/95 p-4 backdrop-blur-md"
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            aria-label="Close"
            className="absolute top-5 end-5 flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-brand-500 hover:text-ink-950 transition-colors"
          >
            <X className="size-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((activeIndex - 1 + images.length) % images.length);
            }}
            aria-label="Previous image"
            className="absolute start-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-brand-500 hover:text-ink-950 transition-colors"
          >
            <ChevronLeft className="size-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full flex flex-col items-center gap-3"
          >
            <div className="relative max-h-[78dvh] overflow-hidden rounded-2xl">
              <Image
                src={active.src}
                alt={captions[active.id] || active.id}
                width={active.width}
                height={active.height}
                className="max-h-[78dvh] w-auto object-contain rounded-2xl"
              />
            </div>
            <p className="text-sm font-semibold text-white text-center">
              {captions[active.id]}
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((activeIndex + 1) % images.length);
            }}
            aria-label="Next image"
            className="absolute end-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-brand-500 hover:text-ink-950 transition-colors"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      )}
    </>
  );
}
