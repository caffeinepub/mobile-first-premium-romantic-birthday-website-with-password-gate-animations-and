import { useState, useEffect } from 'react';
import PasswordGate from './components/PasswordGate';
import EntryOverlay from './components/EntryOverlay';
import EmojiHeader from './components/EmojiHeader';
import HeroSection from './components/HeroSection';
import AmbientBackground from './components/AmbientBackground';
import BirthdayMessagePopup from './components/BirthdayMessagePopup';
import BackgroundAudio from './components/BackgroundAudio';
import ImageMemorySection from './components/memories/ImageMemorySection';
import VideoMemorySection from './components/memories/VideoMemorySection';
import SurpriseSection from './components/SurpriseSection';
import { getUnlockedState, setUnlockedState, getEnteredState, setEnteredState } from './lib/sessionFlags';
import { Heart } from 'lucide-react';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    setIsUnlocked(getUnlockedState());
    setHasEntered(getEnteredState());
  }, []);

  const handleUnlock = () => {
    setUnlockedState(true);
    setIsUnlocked(true);
  };

  const handleEnter = () => {
    setEnteredState(true);
    setHasEntered(true);
    setAudioEnabled(true);
  };

  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      
      {!isUnlocked ? (
        <PasswordGate onUnlock={handleUnlock} />
      ) : !hasEntered ? (
        <EntryOverlay onEnter={handleEnter} />
      ) : (
        <>
          <EmojiHeader />
          <BackgroundAudio enabled={audioEnabled} />
          
          <main className="relative z-10 pt-16">
            <HeroSection />
            <BirthdayMessagePopup />
            <ImageMemorySection />
            <VideoMemorySection />
            <SurpriseSection />
            
            <footer className="py-8 text-center text-sm text-muted-foreground/70">
              <p className="flex items-center justify-center gap-1">
                © 2026. Built with <Heart className="text-rose-gold-400 inline-block" size={14} fill="currentColor" /> using <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="hover:text-rose-gold-400 transition-colors">caffeine.ai</a>
              </p>
            </footer>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
