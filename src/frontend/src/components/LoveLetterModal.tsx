import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Heart } from 'lucide-react';
import { loveLetter } from '@/content/loveLetter';

interface LoveLetterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LoveLetterModal({ open, onOpenChange }: LoveLetterModalProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    // Reset when modal opens
    if (open) {
      setDisplayedText('');
      setIsTypingComplete(false);

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (prefersReducedMotion) {
        // Show full text immediately if reduced motion is preferred
        setDisplayedText(loveLetter);
        setIsTypingComplete(true);
        return;
      }

      // Typing animation
      let currentIndex = 0;
      const typingSpeed = 20; // milliseconds per character

      const typingInterval = setInterval(() => {
        if (currentIndex < loveLetter.length) {
          setDisplayedText(loveLetter.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsTypingComplete(true);
          clearInterval(typingInterval);
        }
      }, typingSpeed);

      return () => clearInterval(typingInterval);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] glass-panel-pink border-soft-pink-300">
        <DialogHeader>
          <DialogTitle className="text-3xl font-serif text-soft-pink-700 text-center flex items-center justify-center gap-2">
            <Heart className="text-rose-gold-500" fill="currentColor" size={32} />
            My Love Letter To You
            <Heart className="text-rose-gold-500" fill="currentColor" size={32} />
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4 text-soft-pink-600 text-base md:text-lg leading-relaxed">
            {displayedText.split('\n').map((paragraph, i) => (
              <p key={i} className="text-left">
                {paragraph}
                {!isTypingComplete && i === displayedText.split('\n').length - 1 && (
                  <span className="inline-block w-0.5 h-5 bg-soft-pink-600 ml-1 animate-pulse" />
                )}
              </p>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
