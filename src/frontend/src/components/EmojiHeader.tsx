import { useState, useEffect } from 'react';

const EMOJIS = ['🐶', '🧿', '🎀', '👸🏻', '🫂', '👑', '😘', '🍻', '🌍'];

export default function EmojiHeader() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % EMOJIS.length);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-soft-pink-50/95 via-rose-gold-50/95 to-soft-pink-50/95 backdrop-blur-sm border-b border-soft-pink-200/50 shadow-sm">
      <div className="flex justify-center items-center gap-3 py-3 px-4">
        {EMOJIS.map((emoji, index) => (
          <span
            key={index}
            className={`text-2xl transition-all duration-300 ${
              index === activeIndex
                ? 'scale-125 animate-blink drop-shadow-lg'
                : 'scale-100 opacity-60'
            }`}
          >
            {emoji}
          </span>
        ))}
      </div>
    </header>
  );
}
