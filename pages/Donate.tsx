import React, { useState, useEffect } from 'react';

// Reusing campaigns array. In a real app this would be in a shared data file or fetched via API.
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
    image: 'https://picsum.photos/id/292/600/400'
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
    image: 'https://picsum.photos/id/325/600/400'
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
    image: 'https://picsum.photos/id/428/600/400'
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
    image: 'https://picsum.photos/id/20/600/400'
  }
];

const Donate: React.FC = () => {
  // Initialize states
  const [amount, setAmount] = useState<number | string>(1000);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false); // Used to pause slider

  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'card'>('bkash');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastDonatedAmount, setLastDonatedAmount] = useState<number>(0);
  
  // Local tracker state so UI updates when user donates
  const [localRaised, setLocalRaised] = useState<Record<string, number>>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAmount = sessionStorage.getItem('donationAmount');
      if (savedAmount) {
        setAmount(Number(savedAmount));
        sessionStorage.removeItem('donationAmount');
      }
      const savedCampId = sessionStorage.getItem('campaignId');
      if (savedCampId) {
        const idx = campaigns.findIndex(c => c.id === savedCampId);
        if (idx !== -1) setCurrentIndex(idx);
        sessionStorage.removeItem('campaignId');
      }
    }
    
    // Initialize raised amounts
    const raisedData: Record<string, number> = {};
    campaigns.forEach(c => raisedData[c.id] = c.raised);
    setLocalRaised(raisedData);
  }, []);

  // Auto-slide effect (paused if user interacts with the form)
  useEffect(() => {
    if (isInteracting) return;
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % campaigns.length);
    }, 6000);
    return () => clearTimeout(timer);
  }, [currentIndex, isInteracting]);

  const activeCamp = campaigns[currentIndex];
  const raised = localRaised[activeCamp.id] || activeCamp.raised;
  const remaining = Math.max(0, activeCamp.goal - raised);
  const percentage = Math.min(100, Math.round((raised / activeCamp.goal) * 100));

  const formatCurrency = (val: number | string) => {
    if (!val) return '৳ ০';
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0,
    }).format(Number(val)).replace('BDT', '৳');
  };

  const handleInteraction = () => {
    setIsInteracting(true);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    const donationValue = Number(amount);
    
    if (donationValue <= 0) return;
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      // Update local raised amount for the specific campaign
      setLocalRaised(prev => ({ ...prev, [activeCamp.id]: prev[activeCamp.id] + donationValue }));
      setLastDonatedAmount(donationValue);
      setShowSuccessModal(true);
      setAmount(1000); 
      setIsInteracting(false); // Resume sliding after completion
    }, 1500);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-[80vh] relative">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-ngo-dark mb-4">
            জরুরী সহায়তা দিন
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            আপনার একটি ছোট অনুদান একটি পরিবারের মুখে হাসি ফোটাতে পারে। নিরাপদ ও দ্রুত পেমেন্ট গেটওয়ের মাধ্যমে এখনই সাহায্য করুন।
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Column: Urgent Need Details */}
          <div className="w-full lg:w-5/12 bg-white rounded-3xl p-8 shadow-sm border border-slate-200 sticky top-28">
            <div key={activeCamp.id} className="animate-[fadeIn_0.5s_ease-out]">
              <div className="flex items-center gap-2 mb-6">
                <span className={`w-3 h-3 rounded-full ${activeCamp.tagColor} animate-pulse`}></span>
                <span className={`font-bold text-sm tracking-wide bg-slate-50 px-3 py-1 rounded-full border border-slate-100 ${activeCamp.tagColor.replace('bg-', 'text-')}`}>
                  {activeCamp.tag}
                </span>
              </div>
              
              <h2 className="text-3xl font-extrabold text-ngo-dark mb-4 leading-tight">
                {activeCamp.title} <br/><span className={activeCamp.highlightColor}>{activeCamp.titleHighlight}</span>
              </h2>
              
              <img 
                src={activeCamp.image} 
                alt={activeCamp.titleHighlight} 
                className="w-full h-48 object-cover rounded-2xl mb-6 shadow-inner"
              />
              
              <p className="text-slate-600 mb-8 leading-relaxed h-20 line-clamp-3">
                {activeCamp.desc}
              </p>
              
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <div className="text-sm font-bold text-slate-500 mb-1">মোট সংগৃহীত তহবিল</div>
                    <div className="text-3xl font-extrabold text-ngo-green transition-all duration-500 scale-100 origin-left">
                      {formatCurrency(raised)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-slate-500 mb-1">লক্ষ্যমাত্রা</div>
                    <div className="text-xl font-bold text-slate-700">{formatCurrency(activeCamp.goal)}</div>
                  </div>
                </div>
                
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden mb-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-1000 ease-out relative ${activeCamp.tagColor}`}
                    style={{ width: `${percentage}%` }}
                  >
                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[progress-stripes_1s_linear_infinite]"></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className={`${activeCamp.highlightColor} transition-all duration-500`}>আরও প্রয়োজন: {formatCurrency(remaining)}</span>
                  <span className="bg-slate-200 text-slate-800 px-2 py-1 rounded-md transition-all">{percentage}% সম্পন্ন</span>
                </div>
              </div>
            </div>

            {/* Slider Dots */}
            <div className="flex gap-2 justify-center mt-6">
              {campaigns.map((camp, idx) => (
                <button 
                  key={camp.id} 
                  onClick={() => { setCurrentIndex(idx); setIsInteracting(false); }}
                  className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-ngo-dark' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Payment Gateway Form */}
          <div className="w-full lg:w-7/12 bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-slate-200 relative overflow-hidden" onMouseEnter={handleInteraction} onFocusCapture={handleInteraction}>
            {/* Decorative BG */}
            <div className={`absolute top-0 right-0 w-64 h-64 ${activeCamp.tagColor.replace('bg-', 'bg-').replace('500', '100')} opacity-30 rounded-full blur-3xl pointer-events-none transition-colors duration-1000`}></div>

            <h3 className="text-2xl font-bold text-ngo-dark mb-2">পেমেন্ট সম্পন্ন করুন</h3>
            <p className="text-sm font-semibold text-slate-500 mb-8 flex items-center gap-1.5">
              নির্বাচিত ফান্ড: <span className={`${activeCamp.highlightColor}`}>{activeCamp.title} {activeCamp.titleHighlight}</span>
            </p>
            
            <form onSubmit={handlePayment} className="relative z-10 space-y-8">
              
              {/* Amount Selection */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-4">অনুদানের পরিমাণ নির্বাচন করুন</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  {[500, 1000, 2000, 5000].map((val) => (
                    <button 
                      type="button"
                      key={val}
                      onClick={() => { setAmount(val); handleInteraction(); }}
                      className={`font-bold py-3 rounded-xl transition-all border-2 ${
                        Number(amount) === val 
                          ? 'border-ngo-dark bg-slate-800 text-white shadow-sm' 
                          : 'border-slate-200 text-slate-600 hover:border-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      ৳ {val}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-500">৳</span>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => { setAmount(e.target.value); handleInteraction(); }}
                    placeholder="অন্যান্য পরিমাণ লিখুন"
                    className="w-full bg-white border-2 border-slate-200 rounded-xl py-3 pl-10 pr-4 text-lg font-bold text-ngo-dark focus:outline-none focus:border-slate-800 transition-colors"
                    required
                    min="10"
                  />
                </div>
              </div>

              {/* Donor Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">আপনার নাম (ঐচ্ছিক)</label>
                  <input 
                    type="text" 
                    placeholder="নাম লিখুন"
                    onChange={handleInteraction}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-ngo-blue focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">মোবাইল নম্বর</label>
                  <input 
                    type="tel" 
                    placeholder="01XXXXXXXXX"
                    onChange={handleInteraction}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-ngo-blue focus:bg-white transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-4">পেমেন্ট মাধ্যম</label>
                <div className="grid grid-cols-3 gap-4">
                  {/* bKash */}
                  <label className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'bkash' ? 'border-[#e2136e] bg-[#e2136e]/5 shadow-sm' : 'border-slate-200 hover:border-[#e2136e]/50'}`}>
                    <input type="radio" name="payment" value="bkash" className="sr-only" checked={paymentMethod === 'bkash'} onChange={() => { setPaymentMethod('bkash'); handleInteraction(); }} />
                    <div className="w-10 h-10 bg-[#e2136e] rounded-full flex items-center justify-center text-white font-bold text-xs">bKash</div>
                    <span className={`text-sm font-bold ${paymentMethod === 'bkash' ? 'text-[#e2136e]' : 'text-slate-500'}`}>বিকাশ</span>
                  </label>
                  
                  {/* Nagad */}
                  <label className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'nagad' ? 'border-[#f37021] bg-[#f37021]/5 shadow-sm' : 'border-slate-200 hover:border-[#f37021]/50'}`}>
                    <input type="radio" name="payment" value="nagad" className="sr-only" checked={paymentMethod === 'nagad'} onChange={() => { setPaymentMethod('nagad'); handleInteraction(); }} />
                    <div className="w-10 h-10 bg-[#f37021] rounded-full flex items-center justify-center text-white font-bold text-xs">Nagad</div>
                    <span className={`text-sm font-bold ${paymentMethod === 'nagad' ? 'text-[#f37021]' : 'text-slate-500'}`}>নগদ</span>
                  </label>
                  
                  {/* Card */}
                  <label className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'card' ? 'border-ngo-blue bg-blue-50 shadow-sm' : 'border-slate-200 hover:border-ngo-blue/50'}`}>
                    <input type="radio" name="payment" value="card" className="sr-only" checked={paymentMethod === 'card'} onChange={() => { setPaymentMethod('card'); handleInteraction(); }} />
                    <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg>
                    </div>
                    <span className={`text-sm font-bold ${paymentMethod === 'card' ? 'text-ngo-blue' : 'text-slate-500'}`}>কার্ড</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={isSubmitting || !amount || Number(amount) <= 0}
                className={`w-full hover:opacity-90 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-lg shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${activeCamp.tagColor}`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    প্রসেস হচ্ছে...
                  </>
                ) : (
                  <>
                    {formatCurrency(amount)} পেমেন্ট করুন
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </>
                )}
              </button>
              
              <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1 mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                SSLCommerz দ্বারা ১০০% নিরাপদ ও সুরক্ষিত পেমেন্ট
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl transform transition-all">
            <div className="w-20 h-20 bg-green-100 text-ngo-green rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h3 className="text-3xl font-extrabold text-ngo-dark mb-2">ধন্যবাদ!</h3>
            <p className="text-slate-600 mb-8 text-lg">
              আপনার <span className="font-bold text-ngo-green">{formatCurrency(lastDonatedAmount)}</span> অনুদানটি সফলভাবে <span className="font-bold">{activeCamp.titleHighlight}</span> তহবিলে যুক্ত হয়েছে।
            </p>
            <button 
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3.5 rounded-xl transition-colors active:scale-95"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      )}

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
    </div>
  );
};

export default Donate;
