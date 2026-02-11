import React, { createContext, useContext, useMemo, useRef, useState, useEffect } from "react";

type AudioCtx = {
  isPlaying: boolean;
  src: string;
  setTrack: (nextSrc: string) => void;
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => Promise<void>;
  volume: number;
  setVolume: (v: number) => void;
};

const Ctx = createContext<AudioCtx | null>(null);

export function useAudio() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAudio must be used inside AudioProvider");
  return v;
}

export function AudioProvider({
  children,
  defaultSrc,
}: {
  children: React.ReactNode;
  defaultSrc: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const convolverRef = useRef<ConvolverNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const [src, setSrc] = useState(defaultSrc);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.75);

  // Create subtle reverb (less echo-chamberic)
  const createReverb = (audioContext: AudioContext): ConvolverNode => {
    const convolver = audioContext.createConvolver();
    const length = audioContext.sampleRate * 0.5; // 0.5 seconds (reduced from 2)
    const impulse = audioContext.createBuffer(2, length, audioContext.sampleRate);
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        const decay = Math.pow(1 - i / length, 3); // Faster decay
        channelData[i] = (Math.random() * 2 - 1) * decay * 0.15; // Reduced from 0.5
      }
    }
    
    convolver.buffer = impulse;
    return convolver;
  };

  useEffect(() => {
    // Initialize Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioContextRef.current = audioContext;

    // Create audio element
    const a = new Audio();
    a.loop = false; // We'll handle looping manually to restart from middle
    a.preload = "auto";
    a.src = src;
    
    // Create audio source from element
    const source = audioContext.createMediaElementSource(a);
    sourceRef.current = source;

    // Create subtle reverb (less echo-chamberic)
    const convolver = createReverb(audioContext);
    convolverRef.current = convolver;

    // Create gain node for volume
    const gainNode = audioContext.createGain();
    gainNode.gain.value = volume;
    gainNodeRef.current = gainNode;

    // Create dry/wet mix for less reverb
    const dryGain = audioContext.createGain();
    dryGain.gain.value = 0.85; // 85% dry signal
    const wetGain = audioContext.createGain();
    wetGain.gain.value = 0.15; // 15% wet (reverb) signal

    // Connect: source -> [dry + reverb] -> gain -> destination
    source.connect(dryGain);
    source.connect(convolver);
    convolver.connect(wetGain);
    dryGain.connect(gainNode);
    wetGain.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    a.addEventListener("play", () => {
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      setIsPlaying(true);
    });
    a.addEventListener("pause", () => setIsPlaying(false));
    a.addEventListener("ended", () => {
      // When song ends, restart from middle (don't restart website)
      if (a.duration && a.duration > 0) {
        // Restart from middle and continue playing
        a.currentTime = a.duration / 2;
        // Continue playing (seamless loop)
        a.play().catch(() => {
          // If autoplay fails, just pause (user can click to resume)
          setIsPlaying(false);
        });
      } else {
        setIsPlaying(false);
      }
    });
    a.addEventListener("loadedmetadata", () => {
      // Set to middle when metadata loads (start from mid-part of music)
      if (a.duration && a.duration > 0) {
        a.currentTime = a.duration / 2;
      }
    }, { once: true });
    
    // Also handle timeupdate to restart from middle when reaching end
    a.addEventListener("timeupdate", () => {
      // If we're near the end (within 1 second), jump back to middle for seamless loop
      if (a.duration && a.currentTime > 0 && a.duration - a.currentTime < 1.0) {
        a.currentTime = a.duration / 2;
      }
    });
    
    audioRef.current = a;

    // Auto-play after first user interaction
    const tryAutoPlay = async () => {
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }
      try {
        await a.play();
      } catch (err) {
        // Autoplay blocked - will need user interaction
        console.log("Autoplay blocked, waiting for user interaction");
      }
    };

    // Also try on any user interaction
    const handleInteraction = () => {
      tryAutoPlay();
    };
    
    // Try to start playing after a short delay (after page load)
    const autoPlayTimer = setTimeout(() => {
      tryAutoPlay();
    }, 500);

    // Listen for user interaction to start playback
    document.addEventListener("click", handleInteraction, { once: true });
    document.addEventListener("touchstart", handleInteraction, { once: true });

    return () => {
      clearTimeout(autoPlayTimer);
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      a.pause();
      source.disconnect();
      convolver.disconnect();
      dryGain.disconnect();
      wetGain.disconnect();
      gainNode.disconnect();
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      const wasPlaying = !audioRef.current.paused;
      const oldTime = audioRef.current.currentTime;
      audioRef.current.src = src;
      audioRef.current.load();
      audioRef.current.addEventListener("loadedmetadata", () => {
        if (audioRef.current && audioRef.current.duration) {
          // Start from middle of new track
          audioRef.current.currentTime = audioRef.current.duration / 2;
          if (wasPlaying) {
            audioRef.current.play().catch(() => {});
          }
        }
      }, { once: true });
    }
  }, [src]);

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume;
    }
  }, [volume]);

  const setTrack = (nextSrc: string) => {
    if (audioRef.current) {
      const wasPlaying = !audioRef.current.paused;
      audioRef.current.pause();
      setSrc(nextSrc);
      if (audioRef.current) {
        audioRef.current.src = nextSrc;
        audioRef.current.load();
        if (wasPlaying) {
          audioRef.current.play().catch(() => {});
        }
      }
    } else {
      setSrc(nextSrc);
    }
  };

  const play = async () => {
    if (audioRef.current && audioContextRef.current) {
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }
      await audioRef.current.play().catch(() => {});
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const toggle = async () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        await play();
      } else {
        pause();
      }
    }
  };

  const setVolume = (v: number) => {
    const nv = Math.min(1, Math.max(0, v));
    setVolumeState(nv);
  };

  const value = useMemo(
    () => ({ isPlaying, src, setTrack, play, pause, toggle, volume, setVolume }),
    [isPlaying, src, volume]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
