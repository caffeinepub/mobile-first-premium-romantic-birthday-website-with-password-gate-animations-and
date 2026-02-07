import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ImageMemoryCard from './ImageMemoryCard';
import { romanticMessages } from '@/content/romanticMessages';
import { loadImageMemories, saveImageMemories, type ImageMemory } from '@/lib/localMemoryStore';

export default function ImageMemorySection() {
  const [memories, setMemories] = useState<ImageMemory[]>([]);

  useEffect(() => {
    const loaded = loadImageMemories();
    if (loaded.length > 0) {
      setMemories(loaded);
    } else {
      // Initialize 43 empty cards with messages
      const initial: ImageMemory[] = Array.from({ length: 43 }, (_, i) => ({
        id: `memory-${i}`,
        imageUrl: null,
        messageIndex: i % romanticMessages.length,
        framing: { x: 0, y: 0, scale: 1 },
      }));
      setMemories(initial);
      saveImageMemories(initial);
    }
  }, []);

  const handleAddCard = () => {
    const newMemory: ImageMemory = {
      id: `memory-${Date.now()}`,
      imageUrl: null,
      messageIndex: memories.length % romanticMessages.length,
      framing: { x: 0, y: 0, scale: 1 },
    };
    const updated = [...memories, newMemory];
    setMemories(updated);
    saveImageMemories(updated);
  };

  const handleUpdateMemory = (id: string, updates: Partial<ImageMemory>) => {
    const updated = memories.map((m) => (m.id === id ? { ...m, ...updates } : m));
    setMemories(updated);
    saveImageMemories(updated);
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-transparent via-rose-50/30 to-transparent">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-rose-600 text-center mb-12">
          Our Beautiful Memories 📸 💕
        </h2>

        <div className="space-y-6">
          {memories.map((memory) => (
            <ImageMemoryCard
              key={memory.id}
              memory={memory}
              message={romanticMessages[memory.messageIndex]}
              onUpdate={(updates) => handleUpdateMemory(memory.id, updates)}
            />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button
            onClick={handleAddCard}
            size="lg"
            className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white"
          >
            <Plus className="mr-2" size={20} />
            Add More Memories
          </Button>
        </div>
      </div>
    </section>
  );
}
