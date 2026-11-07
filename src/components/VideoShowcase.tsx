"use client";

import { useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { videos } from "@/lib/media";

function VideoCard({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <div
      onClick={togglePlay}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          togglePlay();
        }
      }}
      aria-label={label}
      className="group relative aspect-9/16 overflow-hidden rounded-2xl bg-ink-900 border border-white/10 shadow-xl cursor-pointer"
    >
      <video
        ref={ref}
        src={`${src}#t=0.5`}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-ink-950/20" />

      {/* Center Play Overlay */}
      <span
        className={`absolute inset-0 m-auto flex size-14 items-center justify-center rounded-full bg-brand-500 text-ink-950 shadow-xl transition-all ${
          playing ? "opacity-0 scale-90 group-hover:opacity-90" : "opacity-100 scale-100"
        }`}
      >
        {playing ? <Pause className="size-6 fill-ink-950" /> : <Play className="size-6 fill-ink-950 ms-0.5" />}
      </span>

      {/* Mute Button */}
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute bottom-3 end-3 flex size-9 items-center justify-center rounded-full bg-ink-950/80 text-white backdrop-blur hover:bg-brand-500 hover:text-ink-950 transition-colors"
      >
        {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
      </button>
    </div>
  );
}

export function VideoShowcase({ labelPrefix }: { labelPrefix: string }) {
  if (!videos || videos.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {videos.map((v, i) => (
        <VideoCard key={v.id} src={v.src} label={`${labelPrefix} ${i + 1}`} />
      ))}
    </div>
  );
}
