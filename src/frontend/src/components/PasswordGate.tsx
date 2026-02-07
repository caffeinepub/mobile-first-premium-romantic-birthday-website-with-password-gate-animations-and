import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

const CORRECT_PASSWORD = '18200403200🧿🎀';

interface PasswordGateProps {
  onUnlock: () => void;
}

export default function PasswordGate({ onUnlock }: PasswordGateProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setError('');
      onUnlock();
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-soft-pink-50 via-rose-gold-50 to-soft-pink-100">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-soft-pink-300/25 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
            size={20 + Math.random() * 30}
          />
        ))}
      </div>
      
      <Card className="w-full max-w-md glass-panel border-soft-pink-200/50 shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <Heart className="text-rose-gold-400 animate-pulse" size={48} fill="currentColor" />
          </div>
          <CardTitle className="text-3xl font-serif text-soft-pink-600">Enter Password</CardTitle>
          <CardDescription className="text-soft-pink-500/70">
            A special moment awaits you 💕
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Enter password..."
                className="text-center text-lg border-soft-pink-200 focus:border-rose-gold-400 focus:ring-rose-gold-400"
              />
              {error && (
                <p className="text-sm text-destructive mt-2 text-center animate-shake">
                  {error}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-soft-pink-400 to-rose-gold-500 hover:from-soft-pink-500 hover:to-rose-gold-600 text-white font-medium"
              size="lg"
            >
              Unlock 🔓
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
