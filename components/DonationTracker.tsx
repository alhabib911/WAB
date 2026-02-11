import React, { useState, useEffect } from 'react';

interface DonationTrackerProps {
  setRoute?: (route: string) => void;
}

const defaultCampaigns = [
  {
    id: 'c1',
    tag: 'জরুরী প্রয়োজন',
    tagColor: 'bg-red-500',
    title: 'বন্যা দুর্গতদের জন্য',
    titleHighlight: 'ত্রাণ তহবিল',
    highlightColor: 'text-red-500',
    desc: 'উত্তরাঞ্চলের সাম্প্রতিক বন্যায় ক্ষতিগ্রস্ত হাজারো মানুষের জন্য জরুরি খাদ্য ও চিকিৎসা সামগ্রী প্রয়োজন। আপনার অনুদান সরাসরি তাদের কাছে পৌঁছে যাবে।',
    goal: 5000000,
    raised: 3250000,
  }
];

const mockDonors = [
  { id: 1, name: 'আরিফ হোসেন', phone: '017****582', amount: 5000 },
  { id: 2, name: 'সাদিয়া ইসলাম', phone: '018****124', amount: 2000 },
  { id: 3, name: 'মাহমুদ হাসান', phone: '019****993', amount: 10000 },
  { id: 4, name: 'রফিক মিয়া', phone: '015****441', amount: 500 },
  { id: 5, name: 'তানজিনা আক্তার', phone: '016****772', amount: 1500 },
];

const DonationTracker: React.FC<DonationTrackerProps> = ({ setRoute }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | 'other'>(1000);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [campaigns, setCampaigns] = useState<any[]>(defaultCampaigns);
  const [showDonorsModal, setShowDonorsModal] = useState(false);

  useEffect(() => {
    const loaded = JSON.parse(localStorage.getItem('customCampaigns') || 'null');
    if (loaded && loaded.length > 0) {
      setCampaigns(loaded);
    }
  }, []);

  // Filter only active campaigns (raised < goal)
  const activeCampaigns = campaigns.filter(c => c.raised < c.goal);

  // Auto-slide effect
  useEffect(() => {
    if (activeCampaigns.length <= 1) return;
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % activeCampaigns.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentIndex, activeCampaigns.length]);

  if (activeCampaigns.length === 0) {
    return (
      <section className="py-20 bg-white relative -mt-8 rounded-t-3xl z-20 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
        <div className="container mx-auto text-center px-4 max-w-3xl">
           <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
           </div>
           <h2 className="text-3xl font-extrabold text-slate-800 mb-4">সকল ক্যাম্পেইনের লক্ষ্যমাত্রা অর্জিত হয়েছে!</h2>
           <p className="text-slate-600 font-medium">আপনাদের অশেষ অনুদানের জন্য ধন্যবাদ। নতুন ক্যাম্পেইন শুরু হলে এখানে দেখতে পাবেন।</p>
        </div>
      </section>
    );
  }

  const activeCamp = activeCampaigns[currentIndex] || activeCampaigns[0];
  const percentage = Math.min(100, Math.round((activeCamp.raised / activeCamp.goal) * 100));

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
    sessionStorage.setItem('campaignId', activeCamp.id);
    if (setRoute) setRoute('donate');
  };

  return (
    <section id="donate" className="py-20 bg-white relative -mt-8 rounded-t-3xl z-20 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-slate-200/50 rounded-full blur-3xl transition-colors duration-1000"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center justify-between">
            
            <div className="w-full md:w-1/2 flex flex-col justify-between min-h-[280px]">
              <div key={activeCamp.id} className="animate-[fadeIn_0.6s_ease-out]">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-3 h-3 rounded-full ${activeCamp.tagColor || 'bg-blue-500'} animate-pulse`}></span>
                  <span className={`text-sm font-bold tracking-wide ${activeCamp.highlightColor || 'text-blue-500'}`}>
                    {activeCamp.tag}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-ngo-dark mb-4 leading-tight">
                  {activeCamp.title} <span className={activeCamp.highlightColor || 'text-blue-500'}>{activeCamp.titleHighlight}</span>
                </h2>
                <p className="text-slate-600 mb-6 leading-relaxed h-[72px] line-clamp-3 font-medium">
                  {activeCamp.desc}
                </p>
                
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-ngo-dark">সংগৃহীত: <span className="text-ngo-green">{formatCurrency(activeCamp.raised)}</span></span>
                    <span className="text-slate-500">লক্ষ্য: {formatCurrency(activeCamp.goal)}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden mb-2">
                    <div 
                      className={`h-4 rounded-full transition-all duration-1000 ease-out relative ${activeCamp.tagColor || 'bg-blue-500'}`}
                      style={{ width: `${percentage}%` }}
                    >
                      <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[progress-stripes_1s_linear_infinite]"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                    <span>{percentage}% সম্পন্ন</span>
                    <button onClick={() => setShowDonorsModal(true)} className="text-blue-600 hover:underline flex items-center gap-1">
                       ডোনার বিস্তারিত
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                    </button>
                  </div>
                </div>
              </div>

              {activeCampaigns.length > 1 && (
                <div className="flex gap-2 mt-6">
                  {activeCampaigns.map((camp, idx) => (
                    <button 
                      key={camp.id} 
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-ngo-dark' : 'w-2 bg-slate-300 hover:bg-slate-400'}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="w-full md:w-5/12 bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-slate-100">
              <h3 className="text-xl font-extrabold text-center mb-6 text-slate-800">আপনার অনুদানের পরিমাণ নির্বাচন করুন</h3>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[500, 1000, 2000, 5000].map((amount) => (
                  <button 
                    key={amount}
                    onClick={() => setSelectedAmount(amount)}
                    className={`border-2 font-black py-3 rounded-xl transition-all ${
                      selectedAmount === amount 
                        ? 'border-ngo-dark bg-slate-800 text-white shadow-md' 
                        : 'border-slate-200 text-slate-600 hover:border-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    ৳ {amount}
                  </button>
                ))}
                <button 
                  onClick={() => setSelectedAmount('other')}
                  className={`col-span-2 border-2 font-black py-3 rounded-xl transition-all ${
                    selectedAmount === 'other'
                      ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-md'
                      : 'border-slate-200 text-slate-600 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  অন্যান্য পরিমাণ
                </button>
              </div>
              <button 
                onClick={handleDonateClick}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black py-4 rounded-xl text-lg shadow-lg shadow-orange-500/30 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                এখনই দান করুন
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDonorsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setShowDonorsModal(false)}></div>
          <div className="relative bg-white rounded-3xl w-full max-w-lg max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="font-extrabold text-xl text-slate-800">সাম্প্রতিক অনুদানকারী</h3>
                <p className="text-xs text-slate-500 mt-1">{activeCamp.title} {activeCamp.titleHighlight}</p>
              </div>
              <button onClick={() => setShowDonorsModal(false)} className="p-2 rounded-full hover:bg-slate-200 text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="overflow-y-auto p-0">
               <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-100 text-xs uppercase text-slate-500 font-bold sticky top-0">
                     <tr>
                        <th className="px-6 py-3 border-b border-slate-200">নাম</th>
                        <th className="px-6 py-3 border-b border-slate-200">ফোন (শেষ ৩ ডিজিট)</th>
                        <th className="px-6 py-3 border-b border-slate-200 text-right">পরিমাণ</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {mockDonors.map(donor => (
                        <tr key={donor.id} className="hover:bg-slate-50 transition-colors">
                           <td className="px-6 py-4 font-bold text-slate-700">{donor.name}</td>
                           <td className="px-6 py-4 font-medium text-slate-500 tracking-widest">{donor.phone}</td>
                           <td className="px-6 py-4 font-black text-green-600 text-right">{formatCurrency(donor.amount)}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-400 font-medium">
              ব্যক্তিগত নিরাপত্তার কারণে সম্পূর্ণ ফোন নম্বর গোপন রাখা হয়েছে।
            </div>
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
    </section>
  );
};

export default DonationTracker;
