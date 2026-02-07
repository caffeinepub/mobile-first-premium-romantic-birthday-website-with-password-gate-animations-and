import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Pause, Play } from 'lucide-react';

interface BackgroundAudioProps {
  enabled: boolean;
}

export default function BackgroundAudio({ enabled }: BackgroundAudioProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/assets/music/background.mp3');
      audioRef.current.loop = true;
    }

    if (enabled && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay blocked, user will need to click play
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [enabled]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex gap-2">
      <Button
        onClick={togglePlay}
        size="icon"
        className="rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-lg"
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </Button>
      <Button
        onClick={toggleMute}
        size="icon"
        className="rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-lg"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </Button>
    </div>
  );
}
