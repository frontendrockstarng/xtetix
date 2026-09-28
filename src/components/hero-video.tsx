"use client";

import { useEffect, useRef } from "react";

// Cloudinary re-encodes these as H.264, no audio track, with the moov atom at
// the start ("faststart"), so playback can begin before the whole file loads.
// The original upload (39.5 MB, moov at the end) can't autoplay on mobile.
const VIDEO_BASE = "https://res.cloudinary.com/colt-copy/video/upload";
const VIDEO_PATH = "v1790454395/xtx-herovid_dq9yxk.mp4";
const MOBILE_VIDEO_SRC = `${VIDEO_BASE}/w_960,q_auto:eco,vc_h264,ac_none/${VIDEO_PATH}`;
const DESKTOP_VIDEO_SRC = `${VIDEO_BASE}/w_1280,q_auto,vc_h264,ac_none/${VIDEO_PATH}`;
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
      <source src={MOBILE_VIDEO_SRC} type="video/mp4" media="(max-width: 760px)" />
      <source src={DESKTOP_VIDEO_SRC} type="video/mp4" />
    </video>
  );
}
