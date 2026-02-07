import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, AlertCircle } from 'lucide-react';
import type { VideoMemory } from '@/lib/localMemoryStore';

interface VideoMemoryTileProps {
  video: VideoMemory;
  onUpdate: (mediaUrl: string | null, mediaType: 'mp4' | 'mp3' | null) => void;
}

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB in bytes

export default function VideoMemoryTile({ video, onUpdate }: VideoMemoryTileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);

    if (!file) return;

    // Validate file type
    const isMp4 = file.type === 'video/mp4' || file.name.toLowerCase().endsWith('.mp4');
    const isMp3 = file.type === 'audio/mpeg' || file.type === 'audio/mp3' || file.name.toLowerCase().endsWith('.mp3');
    
    if (!isMp4 && !isMp3) {
      setError('Only MP4 video and MP3 audio files are allowed.');
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
    const mediaType = isMp4 ? 'mp4' : 'mp3';
    onUpdate(url, mediaType);
    e.target.value = '';
  };

  return (
    <div className="relative min-h-[400px] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-rose-100 to-pink-100 flex flex-col">
      {video.mediaUrl ? (
        <div className="flex-1 flex items-center justify-center p-4">
          {video.mediaType === 'mp4' ? (
            <video
              src={video.mediaUrl}
              controls
              className="max-w-full max-h-full object-contain rounded-lg shadow-md"
            />
          ) : video.mediaType === 'mp3' ? (
            <div className="w-full flex flex-col items-center justify-center gap-4">
              <div className="text-6xl">🎵</div>
              <audio
                src={video.mediaUrl}
                controls
                className="w-full max-w-md"
              />
            </div>
          ) : null}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="text-rose-400 text-lg mb-4">No media yet</p>
        </div>
      )}

      <div className="absolute top-4 right-4 z-10">
        <Button
          size="sm"
          onClick={() => {
            setError(null);
            fileInputRef.current?.click();
          }}
          className="bg-rose-500 hover:bg-rose-600 text-white shadow-lg"
        >
          <Upload size={16} className="mr-1" />
          {video.mediaUrl ? 'Replace' : 'Add'}
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
        accept=".mp4,.mp3,video/mp4,audio/mpeg,audio/mp3"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
