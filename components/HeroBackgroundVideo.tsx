import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  HERO_HAS_WEBM,
  HERO_POSTER,
  HERO_VIDEO_MP4,
  HERO_VIDEO_OBJECT_POSITION,
  HERO_VIDEO_WEBM,
} from "../data/hero";

type HeroBackgroundVideoProps = {
  /** Solo imagen (prefers-reduced-motion / save-data). */
  forcePoster?: boolean;
  objectPosition?: string;
  className?: string;
};

const mediaClass =
  "pointer-events-none absolute inset-0 block h-full min-h-full w-full scale-[1.02] object-cover";

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
  forcePoster = false,
  objectPosition = HERO_VIDEO_OBJECT_POSITION,
  className = "",
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);
  const touchRetriedRef = useRef(false);

  const setVideoRef = useCallback((node: HTMLVideoElement | null) => {
    videoRef.current = node;
    setVideoEl(node);
  }, []);

  const tryPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video || forcePoster) return;
    armVideoForAutoplay(video);
    const playPromise = video.play();
    if (playPromise !== undefined) {
      void playPromise.catch(() => {});
    }
  }, [forcePoster]);

  const markReady = useCallback(() => {
    setReady(true);
    tryPlay();
  }, [tryPlay]);

  useEffect(() => {
    if (forcePoster) {
      setReady(false);
      return;
    }

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

    video.addEventListener("loadeddata", markReady);
    video.addEventListener("canplay", markReady);
    video.addEventListener("playing", markReady);

    window.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", onPageShow);

    const raf = requestAnimationFrame(() => {
      tryPlay();
    });

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("canplay", markReady);
      video.removeEventListener("playing", markReady);
      window.removeEventListener("touchstart", onTouchStart, true);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [forcePoster, videoEl, markReady, tryPlay]);

  if (forcePoster) {
    return (
      <img
        src={HERO_POSTER}
        alt=""
        decoding="async"
        fetchPriority="high"
        className={`${mediaClass} ${className}`.trim()}
        style={{ objectPosition }}
      />
    );
  }

  return (
    <div className="hero-background-media absolute inset-0" aria-hidden>
      <img
        src={HERO_POSTER}
        alt=""
        decoding="async"
        fetchPriority="high"
        className={`${mediaClass} z-0 ${className}`.trim()}
        style={{ objectPosition }}
      />
      <video
        ref={setVideoRef}
        className={`hero-bg-video ${mediaClass} z-[1] transition-opacity duration-500 motion-reduce:transition-none ${
          ready ? "opacity-100" : "opacity-0"
        } ${className}`.trim()}
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
        onLoadedData={markReady}
        onCanPlay={markReady}
        onPlaying={markReady}
      >
        <source src={HERO_VIDEO_MP4} type="video/mp4" />
        {HERO_HAS_WEBM ? <source src={HERO_VIDEO_WEBM} type="video/webm" /> : null}
      </video>
    </div>
  );
};
