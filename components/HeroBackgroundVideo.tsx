import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  HERO_HAS_WEBM,
  HERO_VIDEO_MP4,
  HERO_VIDEO_OBJECT_POSITION,
  HERO_VIDEO_WEBM,
} from "../data/hero";

type HeroBackgroundVideoProps = {
  objectPosition?: string;
  className?: string;
};

const mediaClass =
  "hero-bg-video pointer-events-none absolute inset-0 z-0 block h-full min-h-full w-full scale-[1.02] object-cover opacity-100";

function armVideoForAutoplay(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.volume = 0;
  video.controls = false;
  video.removeAttribute("controls");
  video.setAttribute("muted", "");
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "true");
  video.setAttribute("x-webkit-airplay", "deny");
  video.setAttribute("disablepictureinpicture", "");
  video.setAttribute("disableremoteplayback", "");
}

export const HeroBackgroundVideo: React.FC<HeroBackgroundVideoProps> = ({
  objectPosition = HERO_VIDEO_OBJECT_POSITION,
  className = "",
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
  const touchRetriedRef = useRef(false);

  const setVideoRef = useCallback((node: HTMLVideoElement | null) => {
    videoRef.current = node;
    setVideoEl(node);
  }, []);

  const tryPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    armVideoForAutoplay(video);
    if (video.paused) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        void playPromise.catch(() => {});
      }
    }
  }, []);

  useEffect(() => {
    const video = videoEl;
    if (!video) return;

    armVideoForAutoplay(video);

    const onTouchStart = () => {
      if (touchRetriedRef.current) return;
      touchRetriedRef.current = true;
      tryPlay();
      window.removeEventListener("touchstart", onTouchStart, true);
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") tryPlay();
    };

    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) tryPlay();
    };

    const onPause = () => {
      if (!document.hidden) tryPlay();
    };

    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    video.addEventListener("playing", tryPlay);
    video.addEventListener("pause", onPause);

    window.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", onPageShow);

    const raf = requestAnimationFrame(tryPlay);
    let playAttempts = 0;
    const retryTimer = window.setInterval(() => {
      if (!video.paused || document.hidden) return;
      if (++playAttempts > 30) {
        window.clearInterval(retryTimer);
        return;
      }
      tryPlay();
    }, 700);

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(retryTimer);
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      video.removeEventListener("playing", tryPlay);
      video.removeEventListener("pause", onPause);
      window.removeEventListener("touchstart", onTouchStart, true);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [videoEl, tryPlay]);

  return (
    <video
      ref={setVideoRef}
      src={HERO_VIDEO_MP4}
      className={`${mediaClass} ${className}`.trim()}
      style={{ objectPosition }}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      tabIndex={-1}
      aria-hidden
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
      controlsList="nodownload noplaybackrate noremoteplayback"
    >
      <source src={HERO_VIDEO_MP4} type="video/mp4" />
      {HERO_HAS_WEBM ? <source src={HERO_VIDEO_WEBM} type="video/webm" /> : null}
    </video>
  );
};
