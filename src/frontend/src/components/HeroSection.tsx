export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center animate-subtle-zoom"
        style={{
          backgroundImage: 'url(/assets/generated/hero-bg.dim_1080x1920.png)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-rose-900/30 via-pink-900/20 to-rose-900/40" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-12">
        <div className="glass-panel-pink rounded-3xl p-8 md:p-12 space-y-8 shadow-2xl">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-rose-700 text-center leading-tight">
            Happy Birthday My Woman 🧿 🎀<br />
            Bangaaaraaa 🫂 🫀 ❤️
          </h1>

          <div className="text-center space-y-2 text-lg md:text-xl font-medium text-rose-600">
            <p>Renu 🧿🎀👸🏻🫂</p>
            <p>Bachha 🎀👸🏻🧿🌍</p>
            <p>Idiotu ❤️🧿🫂👸🏻🌍🫀</p>
            <p>Bangara 👑🌍🥹💋🫂❤️‍🩹🍻🫶🏻</p>
            <p>Pajili 🐶 👸🏻 🧿</p>
            <p>Darling 😘 😚</p>
            <p>Mine 🧿🍻❤️</p>
            <p>Everything 🧿🎀💟🤍😘</p>
            <p>Kuttu 🐶👸🏻🧿🌍</p>
            <p>Forever 🧿 🎀 👸🏻</p>
            <p>Wfy 🌍 💕 👑 🫂</p>
            <p>Nannavalu 🧿 🎀 👸🏻</p>
            <p>Maa 🤌🏻🥺🫂</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border-2 border-rose-300 space-y-3">
            <p className="text-lg md:text-xl font-semibold text-rose-700 text-center">
              You Are Mine 🧿 🎀 Today, My Tomorrow, My Forever 🛐🐶👑
            </p>
            <p className="text-lg md:text-xl font-semibold text-rose-700 text-center">
              I Love You Endlessly Pajili Jaan Ammu Kuttu 🧿 🌹💕🧿🎀🐶👑
            </p>
            <p className="text-lg md:text-xl font-semibold text-rose-700 text-center">
              You and Me Always And Forever 🧿 🎀
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
