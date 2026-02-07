export interface ImageMemory {
  id: string;
  imageUrl: string | null;
  messageIndex: number;
  framing: {
    x: number;
    y: number;
    scale: number;
  };
}

export interface VideoMemory {
  id: string;
  videoUrl: string | null;
}

const IMAGE_MEMORIES_KEY = 'birthday_image_memories';
const VIDEO_MEMORIES_KEY = 'birthday_video_memories';

export function loadImageMemories(): ImageMemory[] {
  try {
    const stored = localStorage.getItem(IMAGE_MEMORIES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveImageMemories(memories: ImageMemory[]): void {
  try {
    localStorage.setItem(IMAGE_MEMORIES_KEY, JSON.stringify(memories));
  } catch (error) {
    console.error('Failed to save image memories:', error);
  }
}

export function loadVideoMemories(): VideoMemory[] {
  try {
    const stored = localStorage.getItem(VIDEO_MEMORIES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveVideoMemories(videos: VideoMemory[]): void {
  try {
    localStorage.setItem(VIDEO_MEMORIES_KEY, JSON.stringify(videos));
  } catch (error) {
    console.error('Failed to save video memories:', error);
  }
}
