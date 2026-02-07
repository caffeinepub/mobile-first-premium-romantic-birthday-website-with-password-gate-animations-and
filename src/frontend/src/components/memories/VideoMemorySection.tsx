import { useState, useEffect } from 'react';
import VideoMemoryTile from './VideoMemoryTile';
import { loadVideoMemories, saveVideoMemories, type VideoMemory } from '@/lib/localMemoryStore';

export default function VideoMemorySection() {
  const [videos, setVideos] = useState<VideoMemory[]>([]);

  useEffect(() => {
    const loaded = loadVideoMemories();
    if (loaded.length > 0) {
      setVideos(loaded);
    } else {
      const initial: VideoMemory[] = Array.from({ length: 5 }, (_, i) => ({
        id: `video-${i}`,
        mediaUrl: null,
        mediaType: null,
      }));
      setVideos(initial);
      saveVideoMemories(initial);
    }
  }, []);

  const handleUpdateVideo = (id: string, mediaUrl: string | null, mediaType: 'mp4' | 'mp3' | null) => {
    const updated = videos.map((v) => (v.id === id ? { ...v, mediaUrl, mediaType } : v));
    setVideos(updated);
    saveVideoMemories(updated);
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-transparent via-pink-50/30 to-transparent">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-rose-600 text-center mb-12">
          Our Video Memories 🎥 💕
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoMemoryTile
              key={video.id}
              video={video}
              onUpdate={(mediaUrl, mediaType) => handleUpdateVideo(video.id, mediaUrl, mediaType)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
