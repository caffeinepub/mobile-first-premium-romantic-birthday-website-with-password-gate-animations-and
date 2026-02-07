import { Button } from '@/components/ui/button';
import { Heart, Sparkles } from 'lucide-react';

interface EntryOverlayProps {
  onEnter: () => void;
}

export default function EntryOverlay({ onEnter }: EntryOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-soft-pink-100 via-rose-gold-100 to-soft-pink-200 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <Heart
            key={`heart-${i}`}
            className="absolute text-soft-pink-400/35 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
            size={15 + Math.random() * 25}
            fill="currentColor"
          />
        ))}
        {[...Array(20)].map((_, i) => (
          <Sparkles
            key={`sparkle-${i}`}
            className="absolute text-rose-gold-400/45 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
            size={12 + Math.random() * 20}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-soft-pink-600 mb-8 animate-fade-in leading-tight">
          Enter Our World 🌍 💕
          <br />
          <span className="text-3xl md:text-5xl">Of Our Happiness</span>
        </h1>
        
        <Button
          onClick={onEnter}
          size="lg"
          className="text-xl px-12 py-8 bg-gradient-to-r from-soft-pink-500 to-rose-gold-600 hover:from-soft-pink-600 hover:to-rose-gold-700 text-white font-semibold shadow-2xl hover:shadow-rose-gold-500/50 transition-all duration-300 hover:scale-105"
        >
          Kuttu 🧿 🎀 🐶
        </Button>
      </div>
    </div>
  );
}
