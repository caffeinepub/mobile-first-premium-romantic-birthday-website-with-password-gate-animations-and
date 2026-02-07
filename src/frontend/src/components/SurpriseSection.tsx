import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Heart } from 'lucide-react';
import { loveLetter } from '@/content/loveLetter';

export default function SurpriseSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-rose-50/50 to-pink-50/50">
      <div className="max-w-3xl mx-auto text-center space-y-12">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-rose-600">
          A Special Surprise For You 💌
        </h2>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-xl px-12 py-8 shadow-2xl hover:shadow-rose-500/50 transition-all duration-300 hover:scale-105"
            >
              Open Love Letter 💌 💕
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] glass-panel-pink border-rose-300">
            <DialogHeader>
              <DialogTitle className="text-3xl font-serif text-rose-700 text-center flex items-center justify-center gap-2">
                <Heart className="text-rose-500" fill="currentColor" size={32} />
                My Love Letter To You
                <Heart className="text-rose-500" fill="currentColor" size={32} />
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-4 text-rose-600 text-base md:text-lg leading-relaxed">
                {loveLetter.split('\n').map((paragraph, i) => (
                  <p key={i} className="text-left">
                    {paragraph}
                  </p>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>

        <div className="glass-panel-pink rounded-3xl p-8 md:p-12 space-y-6 shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-rose-700">
            Birthday Wishes 🎂
          </h3>
          <p className="text-lg md:text-xl text-rose-600 leading-relaxed">
            On this special day, I want you to know how incredibly blessed I am to have you in my life. You bring joy, love, and meaning to every moment we share. May this year bring you all the happiness you deserve, my love.
          </p>
        </div>

        <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-3xl p-8 md:p-12 shadow-2xl">
          <p className="text-2xl md:text-3xl font-serif font-bold text-white leading-relaxed">
            I'm Forever Your's, Always Your's and Endlessly Yours 💯 🫂 🧿 🥺 🐶 🙇🏻 ❤️
          </p>
        </div>
      </div>
    </section>
  );
}
