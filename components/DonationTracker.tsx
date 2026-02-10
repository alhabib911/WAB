import React, { useState } from 'react';

interface DonationTrackerProps {
  setRoute?: (route: string) => void;
}

const DonationTracker: React.FC<DonationTrackerProps> = ({ setRoute }) => {
  const [selectedAmount, setSelectedAmount] = useState<number | 'other'>(1000);
  
  // Simulated data for the tracker
  const goal = 5000000; // 50 Lakh
  const raised = 3250000; // 32.5 Lakh
  const percentage = Math.round((raised / goal) * 100);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0,
    }).format(amount).replace('BDT', '৳');
  };

  const handleDonateClick = () => {
    // Save the selected amount to pass it to the Donate page
    if (selectedAmount !== 'other') {
      sessionStorage.setItem('donationAmount', selectedAmount.toString());
    } else {
      sessionStorage.removeItem('donationAmount');
    }
    
    // Navigate to donate page
    if (setRoute) setRoute('donate');
  };

  return (
    <section id="donate" className="py-20 bg-white relative -mt-8 rounded-t-3xl z-20 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-ngo-orange/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center justify-between">
            <div className="w-full md:w-1/2">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-ngo-red animate-pulse"></span>
                <span className="text-ngo-red font-bold text-sm tracking-wide">জরুরী প্রয়োজন</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-ngo-dark mb-4">
                বন্যা দুর্গতদের জন্য <span className="text-ngo-orange">ত্রাণ তহবিল</span>
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                উত্তরাঞ্চলের সাম্প্রতিক বন্যায় ক্ষতিগ্রস্ত হাজারো মানুষের জন্য জরুরি খাদ্য ও চিকিৎসা সামগ্রী প্রয়োজন। আপনার অনুদান সরাসরি তাদের কাছে পৌঁছে যাবে।
              </p>
              
              {/* Progress Bar Area */}
              <div className="mb-4">
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-ngo-blue">সংগৃহীত: {formatCurrency(raised)}</span>
                  <span className="text-slate-500">লক্ষ্য: {formatCurrency(goal)}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-ngo-orange to-red-500 h-4 rounded-full transition-all duration-1000 ease-out relative"
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

            <div className="w-full md:w-5/12 bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
              <h3 className="text-xl font-bold text-center mb-6">আপনার অনুদানের পরিমাণ নির্বাচন করুন</h3>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[500, 1000, 2000, 5000].map((amount) => (
                  <button 
                    key={amount}
                    onClick={() => setSelectedAmount(amount)}
                    className={`border-2 font-bold py-3 rounded-xl transition-all ${
                      selectedAmount === amount 
                        ? 'border-ngo-orange bg-orange-50 text-ngo-orange shadow-sm' 
                        : 'border-slate-200 text-slate-700 hover:border-ngo-orange hover:bg-orange-50'
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
      `}} />
    </section>
  );
};

export default DonationTracker;
