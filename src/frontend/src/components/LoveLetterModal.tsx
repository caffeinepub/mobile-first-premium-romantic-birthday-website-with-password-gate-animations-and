import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Heart } from 'lucide-react';
import { loveLetter } from '@/content/loveLetter';

interface LoveLetterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LoveLetterModal({ open, onOpenChange }: LoveLetterModalProps) {
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
            {loveLetter.split('\n').map((paragraph, i) => (
              <p key={i} className="text-left">
                {paragraph}
              </p>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
