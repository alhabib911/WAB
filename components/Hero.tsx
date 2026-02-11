import React, { useState, useEffect } from 'react';

interface HeroProps {
  setRoute: (route: string) => void;
}

// Custom hook for counting up
const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutQuart
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return count;
};

const Hero: React.FC<HeroProps> = ({ setRoute }) => {
  const [heroData, setHeroData] = useState({
    title: 'একসাথে আমরা গড়বো',
    highlight: 'নতুন বাংলাদেশ',
    subtitle: 'আপনার ছোট একটি সাহায্য বদলে দিতে পারে অসংখ্য মানুষের জীবন। আসুন, কাঁধে কাঁধ মিলিয়ে কাজ করি একটি সুন্দর ভবিষ্যতের জন্য।',
    btn1: 'জরুরী সহায়তা দিন',
    btn2: 'আমাদের কাজ দেখুন'
  });

  const districts = useCountUp(64, 2000);
  const beneficiaries = useCountUp(1200000, 2500); // 1.2M
  const volunteers = useCountUp(500, 2000);

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem('siteSettings') || '{}');
    if (settings.hero) {
      setHeroData(settings.hero);
    }
  }, []);

  const formatLargeNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'মিঃ';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'হাজার';
    return new Intl.NumberFormat('bn-BD').format(num);
  };

  return (
    <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden -mt-20 lg:-mt-24">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/id/1018/1920/1080" 
          alt="Helping hands" 
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-start text-white max-w-5xl mt-16">
        <span className="inline-block py-1 px-3 rounded-full bg-ngo-green/20 border border-ngo-green/30 text-ngo-green font-semibold mb-6 backdrop-blur-sm animate-slide-up" style={{ animationDelay: '0.1s' }}>
          পরিবর্তনের অংশ হোন
        </span>
        
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 max-w-3xl drop-shadow-lg animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {heroData.title} <br/>
          <span className="text-ngo-green bg-clip-text text-transparent bg-gradient-to-r from-ngo-green to-teal-400">
            {heroData.highlight}
          </span>
        </h1>
        
        <p className="text-lg md:text-2xl text-slate-200 mb-10 max-w-2xl leading-relaxed drop-shadow-md animate-slide-up" style={{ animationDelay: '0.3s' }}>
          {heroData.subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <button 
            onClick={() => setRoute('donate')}
            className="bg-ngo-orange hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-orange-500/20 text-center transition-transform hover:-translate-y-1"
          >
            {heroData.btn1}
          </button>
          <button 
            onClick={() => setRoute('work')}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg text-center transition-colors flex items-center justify-center gap-2"
          >
            <span>{heroData.btn2}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
        
        {/* Quick Stats with Countdown */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 border-t border-white/20 pt-8 w-full max-w-3xl animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">
              {new Intl.NumberFormat('bn-BD').format(districts)}+
            </div>
            <div className="text-slate-300 text-sm md:text-base">জেলায় কার্যক্রম</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-extrabold text-white mb-1 flex items-baseline">
               {formatLargeNumber(beneficiaries)}+
            </div>
            <div className="text-slate-300 text-sm md:text-base">উপকৃত মানুষ</div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">
              {new Intl.NumberFormat('bn-BD').format(volunteers)}+
            </div>
            <div className="text-slate-300 text-sm md:text-base">স্বেচ্ছাসেবক</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
