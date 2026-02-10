import React, { useState, useEffect } from 'react';

interface DonationTrackerProps {
  setRoute?: (route: string) => void;
}

const campaigns = [
  {
    id: 'c1',
    tag: 'জরুরী প্রয়োজন',
    tagColor: 'bg-ngo-red',
    title: 'বন্যা দুর্গতদের জন্য',
    titleHighlight: 'ত্রাণ তহবিল',
    highlightColor: 'text-ngo-orange',
    desc: 'উত্তরাঞ্চলের সাম্প্রতিক বন্যায় ক্ষতিগ্রস্ত হাজারো মানুষের জন্য জরুরি খাদ্য ও চিকিৎসা সামগ্রী প্রয়োজন। আপনার অনুদান সরাসরি তাদের কাছে পৌঁছে যাবে।',
    goal: 5000000,
    raised: 3250000,
  },
  {
    id: 'c2',
    tag: 'শীতকালীন সহায়তা',
    tagColor: 'bg-blue-500',
    title: 'অসহায় মানুষের জন্য',
    titleHighlight: 'শীতবস্ত্র বিতরণ',
    highlightColor: 'text-blue-500',
    desc: 'তীব্র শীতে কাঁপছে উত্তরের জনপদ। আসুন, আমাদের পুরনো বা নতুন শীতবস্ত্র দিয়ে এই অসহায় মানুষগুলোর পাশে দাঁড়াই।',
    goal: 2000000,
    raised: 850000,
  },
  {
    id: 'c3',
    tag: 'চিকিৎসা তহবিল',
    tagColor: 'bg-teal-500',
    title: 'দরিদ্র রোগীদের',
    titleHighlight: 'চিকিৎসা সহায়তা',
    highlightColor: 'text-teal-500',
    desc: 'অভাবের তাড়নায় অনেকেই প্রয়োজনীয় চিকিৎসা নিতে পারছেন না। আপনার জাকাত বা সাদাকাহ দিয়ে বাঁচাতে পারেন একটি অমূল্য জীবন।',
    goal: 3000000,
    raised: 1200000,
  },
  {
    id: 'c4',
    tag: 'শিক্ষা সহায়তা',
    tagColor: 'bg-indigo-500',
    title: 'সুবিধাবঞ্চিত শিশুদের',
    titleHighlight: 'শিক্ষাসামগ্রী',
    highlightColor: 'text-indigo-500',
    desc: 'বই, খাতা ও পেন্সিলের অভাবে ঝরে পড়ছে অনেক মেধাবী শিশু। তাদের শিক্ষার আলোয় আলোকিত করতে আমাদের এই উদ্যোগ।',
    goal: 1000000,
    raised: 750000,
  }
];

const DonationTracker: React.FC<DonationTrackerProps> = ({ setRoute }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | 'other'>(1000);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % campaigns.length);
    }, 5000); // Slides every 5 seconds
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const activeCamp = campaigns[currentIndex];
  const percentage = Math.round((activeCamp.raised / activeCamp.goal) * 100);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0,
    }).format(amount).replace('BDT', '৳');
  };

  const handleDonateClick = () => {
    if (selectedAmount !== 'other') {
      sessionStorage.setItem('donationAmount', selectedAmount.toString());
    } else {
      sessionStorage.removeItem('donationAmount');
    }
    // Save the specific campaign ID so the Donate page knows which one was selected
    sessionStorage.setItem('campaignId', activeCamp.id);
    
    if (setRoute) setRoute('donate');
  };

  return (
    <section id="donate" className="py-20 bg-white relative -mt-8 rounded-t-3xl z-20 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-slate-200/50 rounded-full blur-3xl transition-colors duration-1000"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center justify-between">
            
            {/* Left Side: Campaign Details Slider */}
            <div className="w-full md:w-1/2 flex flex-col justify-between min-h-[280px]">
              <div key={activeCamp.id} className="animate-[fadeIn_0.6s_ease-out]">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-3 h-3 rounded-full ${activeCamp.tagColor} animate-pulse`}></span>
                  <span className={`text-sm font-bold tracking-wide ${activeCamp.tagColor.replace('bg-', 'text-')}`}>
                    {activeCamp.tag}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-ngo-dark mb-4 leading-tight">
                  {activeCamp.title} <span className={activeCamp.highlightColor}>{activeCamp.titleHighlight}</span>
                </h2>
                <p className="text-slate-600 mb-6 leading-relaxed h-[72px] line-clamp-3">
                  {activeCamp.desc}
                </p>
                
                {/* Progress Bar Area */}
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-ngo-dark">সংগৃহীত: <span className="text-ngo-green">{formatCurrency(activeCamp.raised)}</span></span>
                    <span className="text-slate-500">লক্ষ্য: {formatCurrency(activeCamp.goal)}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                    <div 
                      className={`h-4 rounded-full transition-all duration-1000 ease-out relative ${activeCamp.tagColor}`}
                      style={{ width: `${percentage}%` }}
                    >
                      <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[progress-stripes_1s_linear_infinite]"></div>
                    </div>
                  </div>
                  <div className="mt-2 text-right text-xs font-bold text-slate-500">
                    {percentage}% সম্পন্ন
                  </div>
                </div>
              </div>

              {/* Slider Dots */}
              <div className="flex gap-2 mt-6">
                {campaigns.map((camp, idx) => (
                  <button 
                    key={camp.id} 
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-ngo-dark' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Side: Amount Selection */}
            <div className="w-full md:w-5/12 bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
              <h3 className="text-xl font-bold text-center mb-6">আপনার অনুদানের পরিমাণ নির্বাচন করুন</h3>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[500, 1000, 2000, 5000].map((amount) => (
                  <button 
                    key={amount}
                    onClick={() => setSelectedAmount(amount)}
                    className={`border-2 font-bold py-3 rounded-xl transition-all ${
                      selectedAmount === amount 
                        ? 'border-ngo-dark bg-slate-800 text-white shadow-sm' 
                        : 'border-slate-200 text-slate-700 hover:border-ngo-dark hover:bg-slate-50'
                    }`}
                  >
                    ৳ {amount}
                  </button>
                ))}
                <button 
                  onClick={() => setSelectedAmount('other')}
                  className={`col-span-2 border-2 font-bold py-3 rounded-xl transition-all ${
                    selectedAmount === 'other'
                      ? 'border-ngo-blue bg-blue-50 text-ngo-blue shadow-sm'
                      : 'border-slate-200 text-slate-700 hover:border-ngo-blue hover:bg-blue-50'
                  }`}
                >
                  অন্যান্য পরিমাণ
                </button>
              </div>
              <button 
                onClick={handleDonateClick}
                className="w-full bg-ngo-orange hover:bg-orange-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-orange-500/30 transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                এখনই দান করুন
              </button>
              <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                ১০০% নিরাপদ ও সুরক্ষিত পেমেন্ট
              </p>
            </div>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes progress-stripes {
          from { background-position: 1rem 0; }
          to { background-position: 0 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </section>
  );
};

export default DonationTracker;
