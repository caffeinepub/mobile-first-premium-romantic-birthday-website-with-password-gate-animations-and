import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Save } from 'lucide-react';
import type { ImageMemory } from '@/lib/localMemoryStore';

interface ImageMemoryCardProps {
  memory: ImageMemory;
  message: string;
  onUpdate: (updates: Partial<ImageMemory>) => void;
}

export default function ImageMemoryCard({ memory, message, onUpdate }: ImageMemoryCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [tempFraming, setTempFraming] = useState(memory.framing);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      onUpdate({ imageUrl: url });
    }
  };

  const handleCardClick = () => {
    if (!isEditing && memory.imageUrl) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isEditing) return;
    e.stopPropagation();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX, y: clientY });
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isEditing || !dragStart) return;
    e.preventDefault();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const deltaX = clientX - dragStart.x;
    const deltaY = clientY - dragStart.y;
    setTempFraming((prev) => ({
      ...prev,
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }));
    setDragStart({ x: clientX, y: clientY });
  };

  const handleDragEnd = () => {
    setDragStart(null);
  };

  const handleSave = () => {
    onUpdate({ framing: tempFraming });
    setIsEditing(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div
        className={`card-3d ${isFlipped ? 'flipped' : ''}`}
        onClick={handleCardClick}
        style={{ cursor: isEditing ? 'default' : memory.imageUrl ? 'pointer' : 'default' }}
      >
        {/* Front */}
        <div className="card-face card-front relative aspect-[2/3] rounded-2xl overflow-hidden shadow-xl bg-white">
          {memory.imageUrl ? (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${memory.imageUrl})`,
                backgroundPosition: `${tempFraming.x}px ${tempFraming.y}px`,
                backgroundSize: `${tempFraming.scale * 100}%`,
                cursor: isEditing ? 'move' : 'pointer',
              }}
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-soft-pink-100 to-rose-gold-100">
              <p className="text-soft-pink-400 text-lg">No image yet</p>
            </div>
          )}

          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="bg-gradient-to-r from-soft-pink-500 to-rose-gold-500 hover:from-soft-pink-600 hover:to-rose-gold-600 text-white shadow-lg"
            >
              <Upload size={16} className="mr-1" />
              {memory.imageUrl ? 'Replace' : 'Add'}
            </Button>
            {memory.imageUrl && (
              <>
                {isEditing ? (
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSave();
                    }}
                    className="bg-gradient-to-r from-rose-gold-500 to-soft-pink-500 hover:from-rose-gold-600 hover:to-soft-pink-600 text-white shadow-lg"
                  >
                    <Save size={16} className="mr-1" />
                    Save
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditing(true);
                    }}
                    className="bg-gradient-to-r from-rose-gold-400 to-soft-pink-400 hover:from-rose-gold-500 hover:to-soft-pink-500 text-white shadow-lg"
                  >
                    Adjust
                  </Button>
                )}
              </>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Back */}
        <div className="card-face card-back absolute inset-0 aspect-[2/3] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-soft-pink-400 to-rose-gold-500 flex items-center justify-center p-8">
          <p className="text-white text-center text-lg md:text-xl font-medium leading-relaxed">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
