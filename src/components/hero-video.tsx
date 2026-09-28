"use client";

import { useEffect, useRef } from "react";

const VIDEO_SRC =
  "https://res.cloudinary.com/colt-copy/video/upload/v1790454395/xtx-herovid_dq9yxk.mp4";
const POSTER_SRC =
  "https://res.cloudinary.com/colt-copy/video/upload/so_0/v1790454395/xtx-herovid_dq9yxk.jpg";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // React doesn't write `muted` into the server HTML, so mobile browsers
    // treat the video as unmuted and block autoplay. Set it and retry play().
    video.muted = true;
    video.defaultMuted = true;
    video.play().catch(() => {
      // Autoplay still blocked (e.g. iOS Low Power Mode) – the poster stays visible.
    });
  }, []);

  return (
    <video
      ref={videoRef}
      className="hero__video"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={POSTER_SRC}
      disablePictureInPicture
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src={VIDEO_SRC} type="video/mp4" />
    </video>
  );
}
