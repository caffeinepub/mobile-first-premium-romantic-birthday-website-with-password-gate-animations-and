import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles } from 'lucide-react';

export default function BirthdayMessagePopup() {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-16 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="bg-gradient-to-r from-soft-pink-500 to-rose-gold-600 hover:from-soft-pink-600 hover:to-rose-gold-700 text-white text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              Open Birthday Message 🎂 💕
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl glass-panel-pink border-soft-pink-300">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <Heart
                  key={`popup-heart-${i}`}
                  className="absolute text-soft-pink-400/35 animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${3 + Math.random() * 3}s`,
                  }}
                  size={12 + Math.random() * 18}
                  fill="currentColor"
                />
              ))}
              {[...Array(10)].map((_, i) => (
                <Sparkles
                  key={`popup-sparkle-${i}`}
                  className="absolute text-rose-gold-400/45 animate-twinkle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                  size={10 + Math.random() * 15}
                />
              ))}
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl md:text-3xl font-serif text-soft-pink-700 text-center">
                Special Birthday Message 🎉
              </DialogTitle>
            </DialogHeader>
            <div className="relative z-10 py-6 text-center">
              <p className="text-lg md:text-xl leading-relaxed text-soft-pink-600 font-medium">
                As Uh Are Completing Ur 19teen Age & U R Entering in 20s , So By This Birthday U R 20s so, Wishing You A Lovely Birthday To My Life Partner 🥰 🫂 🫀 🎀 🧿 👸🏻
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
