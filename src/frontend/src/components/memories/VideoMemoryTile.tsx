import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import type { VideoMemory } from '@/lib/localMemoryStore';

interface VideoMemoryTileProps {
  video: VideoMemory;
  onUpdate: (videoUrl: string | null) => void;
}

export default function VideoMemoryTile({ video, onUpdate }: VideoMemoryTileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file);
      onUpdate(url);
    }
  };

  return (
    <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-rose-100 to-pink-100">
      {video.videoUrl ? (
        <video
          src={video.videoUrl}
          controls
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-rose-400 text-lg mb-4">No video yet</p>
        </div>
      )}

      <div className="absolute top-4 right-4 z-10">
        <Button
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="bg-rose-500 hover:bg-rose-600 text-white shadow-lg"
        >
          <Upload size={16} className="mr-1" />
          {video.videoUrl ? 'Replace' : 'Add'}
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
