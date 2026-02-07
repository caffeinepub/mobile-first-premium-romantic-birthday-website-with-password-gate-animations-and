import { useEffect, useRef } from 'react';

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      type: 'heart' | 'petal' | 'kiss';
    }

    const particles: Particle[] = [];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 10 + Math.random() * 20,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: Math.random() * 0.5 + 0.2,
        opacity: 0.1 + Math.random() * 0.2,
        type: i % 3 === 0 ? 'kiss' : i % 3 === 1 ? 'heart' : 'petal',
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.y > canvas.height + particle.size) {
          particle.y = -particle.size;
          particle.x = Math.random() * canvas.width;
        }
        if (particle.x > canvas.width + particle.size) {
          particle.x = -particle.size;
        }
        if (particle.x < -particle.size) {
          particle.x = canvas.width + particle.size;
        }

        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.font = `${particle.size}px serif`;
        
        // Use pink/rose-gold colors for all particles
        if (particle.type === 'kiss') {
          ctx.fillStyle = '#f472b6'; // pink
        } else if (particle.type === 'heart') {
          ctx.fillStyle = '#fb7185'; // rose
        } else {
          ctx.fillStyle = '#fda4af'; // light pink
        }
        
        const emoji = particle.type === 'kiss' ? '💋' : particle.type === 'heart' ? '💖' : '🌸';
        ctx.fillText(emoji, particle.x, particle.y);
        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}
