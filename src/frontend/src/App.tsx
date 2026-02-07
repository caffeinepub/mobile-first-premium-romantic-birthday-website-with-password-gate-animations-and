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

  if (!isUnlocked) {
    return <PasswordGate onUnlock={handleUnlock} />;
  }

  if (!hasEntered) {
    return <EntryOverlay onEnter={handleEnter} />;
  }

  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <EmojiHeader />
      <BackgroundAudio enabled={audioEnabled} />
      
      <main className="relative z-10 pt-16">
        <HeroSection />
        <BirthdayMessagePopup />
        <ImageMemorySection />
        <VideoMemorySection />
        <SurpriseSection />
        
        <footer className="py-8 text-center text-sm text-muted-foreground/70">
          <p>© 2026. Built with <span className="text-rose-gold-400">♥</span> using <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="hover:text-rose-gold-400 transition-colors">caffeine.ai</a></p>
        </footer>
      </main>
    </div>
  );
}

export default App;
