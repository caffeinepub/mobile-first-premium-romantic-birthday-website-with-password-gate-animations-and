import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, AlertCircle } from 'lucide-react';
import type { ImageMemory } from '@/lib/localMemoryStore';

interface ImageMemoryCardProps {
  memory: ImageMemory;
  message: string;
  onUpdate: (updates: Partial<ImageMemory>) => void;
}

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB in bytes

export default function ImageMemoryCard({ memory, message, onUpdate }: ImageMemoryCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);

    if (!file) return;

    // Validate file type
    const isJpg = file.type === 'image/jpeg' || file.type === 'image/jpg' || 
                  file.name.toLowerCase().endsWith('.jpg') || 
                  file.name.toLowerCase().endsWith('.jpeg');
    
    if (!isJpg) {
      setError('Only JPG/JPEG images are allowed.');
      e.target.value = '';
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setError('File size must be 20MB or less.');
      e.target.value = '';
      return;
    }

    const url = URL.createObjectURL(file);
    onUpdate({ imageUrl: url });
    e.target.value = '';
  };

  const handleCardClick = () => {
    if (!isEditing && memory.imageUrl) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div
        className={`card-3d ${isFlipped ? 'flipped' : ''}`}
        onClick={handleCardClick}
        style={{ cursor: isEditing ? 'default' : memory.imageUrl ? 'pointer' : 'default' }}
      >
        {/* Front */}
        <div className="card-face card-front relative aspect-square rounded-2xl overflow-hidden shadow-xl bg-white flex flex-col">
          {memory.imageUrl ? (
            <div className="flex-1 flex items-center justify-center p-4 bg-gradient-to-br from-soft-pink-50 to-rose-gold-50">
              <img
                src={memory.imageUrl}
                alt="Memory"
                className="max-w-full max-h-full object-contain rounded-lg shadow-md"
                style={{ cursor: isEditing ? 'default' : 'pointer' }}
              />
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-soft-pink-100 to-rose-gold-100">
              <p className="text-soft-pink-400 text-lg">No image yet</p>
            </div>
          )}

          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setError(null);
                fileInputRef.current?.click();
              }}
              className="bg-gradient-to-r from-soft-pink-500 to-rose-gold-500 hover:from-soft-pink-600 hover:to-rose-gold-600 text-white shadow-lg"
            >
              <Upload size={16} className="mr-1" />
              {memory.imageUrl ? 'Replace' : 'Add'}
            </Button>
          </div>

          {error && (
            <div className="absolute bottom-4 left-4 right-4 z-10 bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
              <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,image/jpeg"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Back */}
        <div className="card-face card-back absolute inset-0 aspect-square rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-soft-pink-400 to-rose-gold-500 flex items-center justify-center p-8">
          <p className="text-white text-center text-lg md:text-xl font-medium leading-relaxed">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
