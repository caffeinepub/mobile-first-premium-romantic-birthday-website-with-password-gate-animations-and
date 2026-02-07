import { Button } from '@/components/ui/button';
import { Heart, Sparkles } from 'lucide-react';

interface EntryOverlayProps {
  onEnter: () => void;
}

export default function EntryOverlay({ onEnter }: EntryOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-soft-pink-100 via-rose-gold-100 to-soft-pink-200 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
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

      <div className="relative z-20 text-center px-6 max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-soft-pink-600 mb-6 animate-fade-in">
          Enter Our World 💕
        </h1>
        <p className="text-xl md:text-2xl text-rose-gold-600 mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          A journey of love, memories, and endless moments together
        </p>
        <Button
          onClick={onEnter}
          size="lg"
          className="bg-gradient-to-r from-soft-pink-500 to-rose-gold-600 hover:from-soft-pink-600 hover:to-rose-gold-700 text-white text-xl px-12 py-8 shadow-2xl hover:shadow-rose-gold-500/50 transition-all duration-300 hover:scale-105 animate-fade-in"
          style={{ animationDelay: '0.4s' }}
        >
          Enter 💖
        </Button>
      </div>
    </div>
  );
}
