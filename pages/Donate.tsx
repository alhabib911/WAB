import React, { useState, useEffect } from 'react';

const defaultCampaigns = [
  {
    id: 'c1', tag: 'জরুরী প্রয়োজন', tagColor: 'bg-red-500', title: 'বন্যা দুর্গতদের জন্য', titleHighlight: 'ত্রাণ তহবিল', highlightColor: 'text-red-500', desc: 'উত্তরাঞ্চলের সাম্প্রতিক বন্যায় ক্ষতিগ্রস্ত হাজারো মানুষের জন্য জরুরি খাদ্য ও চিকিৎসা সামগ্রী প্রয়োজন।', goal: 5000000, raised: 3250000, image: 'https://picsum.photos/id/292/600/400'
  }
];

const Donate: React.FC = () => {
  const [campaigns, setCampaigns] = useState<any[]>(defaultCampaigns);
  const [amount, setAmount] = useState<number | string>(1000);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false); 
  const [selectedCampId, setSelectedCampId] = useState('');

  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'card'>('bkash');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [lastDonatedAmount, setLastDonatedAmount] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('userRole'));

    const loaded = JSON.parse(localStorage.getItem('customCampaigns') || 'null');
    let activeCamps = defaultCampaigns;
    if(loaded && loaded.length > 0) {
      activeCamps = loaded.filter((c:any) => c.raised < c.goal);
    }
    
    setCampaigns(activeCamps);
    if(activeCamps.length > 0) setSelectedCampId(activeCamps[0].id);

    if (typeof window !== 'undefined') {
      const savedAmount = sessionStorage.getItem('donationAmount');
      if (savedAmount) {
        setAmount(Number(savedAmount));
        sessionStorage.removeItem('donationAmount');
      }
      const savedCampId = sessionStorage.getItem('campaignId');
      if (savedCampId && activeCamps.length > 0) {
        const idx = activeCamps.findIndex((c:any) => c.id === savedCampId);
        if (idx !== -1) {
          setCurrentIndex(idx);
          setSelectedCampId(savedCampId);
        }
        sessionStorage.removeItem('campaignId');
      }
    }
  }, []);

  useEffect(() => {
    if (!isInteracting && campaigns.length > 0) {
      setSelectedCampId(campaigns[currentIndex].id);
    }
  }, [currentIndex, isInteracting, campaigns]);

  useEffect(() => {
    if (isInteracting || campaigns.length <= 1) return;
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % campaigns.length);
    }, 6000);
    return () => clearTimeout(timer);
  }, [currentIndex, isInteracting, campaigns.length]);

  if(campaigns.length === 0) {
    return (
      <div className="py-20 bg-slate-50 min-h-[60vh] flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-3xl shadow-sm border border-slate-100 max-w-2xl">
           <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
           </div>
           <h2 className="text-3xl font-extrabold text-slate-800 mb-4">সকল ক্যাম্পেইনের লক্ষ্যমাত্রা অর্জিত হয়েছে!</h2>
           <p className="text-slate-600 font-medium">আপনাদের অশেষ অনুদানের জন্য ধন্যবাদ। নতুন ক্যাম্পেইন শুরু হলে এখানে দেখতে পাবেন।</p>
        </div>
      </div>
    );
  }

  const activeCamp = campaigns[currentIndex] || campaigns[0];
  const raised = activeCamp.raised;
  const remaining = Math.max(0, activeCamp.goal - raised);
  const percentage = Math.min(100, Math.round((raised / activeCamp.goal) * 100));

  const formatCurrency = (val: number | string) => {
    if (!val) return '৳ ০';
    return new Intl.NumberFormat('bn-BD', { style: 'currency', currency: 'BDT', maximumFractionDigits: 0 }).format(Number(val)).replace('BDT', '৳');
  };

  const handleInteraction = () => setIsInteracting(true);

  const handleCampaignChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedCampId(id);
    const idx = campaigns.findIndex(c => c.id === id);
    if (idx !== -1) setCurrentIndex(idx);
    handleInteraction();
  };

  const handleProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      window.showToast('পেমেন্ট করতে অনুগ্রহ করে লগইন করুন।', 'error');
      return;
    }
    const donationValue = Number(amount);
    if (donationValue <= 0) return;
    
    setShowConfirmModal(true);
  };

  const executePayment = () => {
    const donationValue = Number(amount);
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmModal(false);
      const targetCampaign = campaigns.find(c => c.id === selectedCampId) || activeCamp;
      
      // Update customCampaigns localStorage to reflect raised amount globally
      const allCamps = JSON.parse(localStorage.getItem('customCampaigns') || '[]');
      const updatedCamps = allCamps.map((c:any) => c.id === targetCampaign.id ? { ...c, raised: c.raised + donationValue } : c);
      localStorage.setItem('customCampaigns', JSON.stringify(updatedCamps));
      
      // Update local state (only active ones)
      setCampaigns(updatedCamps.filter((c:any) => c.raised < c.goal));
      
      const existingDonations = JSON.parse(localStorage.getItem('userDonations') || '[]');
      const newDonation = {
         id: Date.now().toString(),
         name: `${targetCampaign.title} ${targetCampaign.titleHighlight}`,
         date: new Date().toLocaleDateString('bn-BD'),
         amount: donationValue,
         method: paymentMethod.toUpperCase(),
         trxId: 'TRX' + Math.random().toString(36).substring(2, 10).toUpperCase()
      };
      localStorage.setItem('userDonations', JSON.stringify([newDonation, ...existingDonations]));

      setLastDonatedAmount(donationValue);
      setShowSuccessModal(true);
      setAmount(1000); 
      setIsInteracting(false); 
      
      // Show generic toast as requested
      window.showToast('ধন্যবাদ! আপনার অনুদান সফলভাবে সম্পন্ন হয়েছে।', 'success');
    }, 1500);
  };

  const selectedCampDetails = campaigns.find(c => c.id === selectedCampId) || activeCamp;

  return (
    <div className="py-12 bg-slate-50 min-h-[80vh] relative">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-ngo-dark mb-4">জরুরী সহায়তা দিন</h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">আপনার একটি ছোট অনুদান একটি পরিবারের মুখে হাসি ফোটাতে পারে। নিরাপদ ও দ্রুত পেমেন্ট গেটওয়ের মাধ্যমে এখনই সাহায্য করুন।</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          
          <div className="w-full lg:w-5/12 bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-28">
            <div key={activeCamp.id} className="animate-[fadeIn_0.5s_ease-out]">
              <div className="flex items-center gap-2 mb-6">
                <span className={`w-3 h-3 rounded-full ${activeCamp.tagColor || 'bg-blue-500'} animate-pulse`}></span>
                <span className={`font-extrabold text-sm tracking-wide bg-slate-50 px-3 py-1 rounded-full border border-slate-100 ${activeCamp.highlightColor || 'text-blue-500'}`}>
                  {activeCamp.tag}
                </span>
              </div>
              
              <h2 className="text-3xl font-black text-slate-800 mb-4 leading-tight">
                {activeCamp.title} <br/><span className={activeCamp.highlightColor || 'text-blue-500'}>{activeCamp.titleHighlight}</span>
              </h2>
              
              <img src={activeCamp.image} alt="Campaign" className="w-full h-56 object-cover rounded-2xl mb-6 shadow-inner" />
              
              <p className="text-slate-600 font-medium mb-8 leading-relaxed h-20 line-clamp-3">{activeCamp.desc}</p>
              
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <div className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-1">মোট সংগৃহীত</div>
                    <div className="text-3xl font-black text-green-500 transition-all duration-500">{formatCurrency(raised)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-1">লক্ষ্যমাত্রা</div>
                    <div className="text-xl font-bold text-slate-700">{formatCurrency(activeCamp.goal)}</div>
                  </div>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden mb-3">
                  <div className={`h-3 rounded-full transition-all duration-1000 ease-out relative ${activeCamp.tagColor || 'bg-blue-500'}`} style={{ width: `${percentage}%` }}>
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[progress-stripes_1s_linear_infinite]"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className={`${activeCamp.highlightColor || 'text-blue-500'}`}>আরও প্রয়োজন: {formatCurrency(remaining)}</span>
                  <span className="bg-white border border-slate-200 text-slate-700 shadow-sm px-2 py-1 rounded-lg">{percentage}% সম্পন্ন</span>
                </div>
              </div>
            </div>

            {campaigns.length > 1 && (
              <div className="flex gap-2 justify-center mt-6">
                {campaigns.map((camp, idx) => (
                  <button key={camp.id} onClick={() => { setCurrentIndex(idx); setSelectedCampId(camp.id); setIsInteracting(false); }} className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-slate-800' : 'w-2 bg-slate-300 hover:bg-slate-400'}`} />
                ))}
              </div>
            )}
          </div>

          {/* Form Side */}
          <div className="w-full lg:w-7/12 bg-white rounded-[2rem] p-8 lg:p-12 shadow-2xl border border-slate-100 relative overflow-hidden" onMouseEnter={handleInteraction} onFocusCapture={handleInteraction}>
            <h3 className="text-2xl font-black text-slate-800 mb-8 border-b border-slate-100 pb-4">পেমেন্ট সম্পন্ন করুন</h3>
            <form onSubmit={handleProceed} className="relative z-10 space-y-8">
              <div>
                <label className="block text-sm font-extrabold text-slate-700 mb-3">কোন ফান্ডে দান করবেন?</label>
                <select value={selectedCampId} onChange={handleCampaignChange} className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3.5 px-4 focus:outline-none focus:border-blue-500 font-extrabold text-slate-800 cursor-pointer">
                  {campaigns.map(c => <option key={c.id} value={c.id}>{c.title} {c.titleHighlight}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-extrabold text-slate-700 mb-4">অনুদানের পরিমাণ নির্বাচন করুন</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  {[500, 1000, 2000, 5000].map((val) => (
                    <button type="button" key={val} onClick={() => { setAmount(val); handleInteraction(); }} className={`font-black py-3.5 rounded-xl transition-all border-2 ${Number(amount) === val ? 'border-slate-800 bg-slate-800 text-white shadow-md hover:-translate-y-0.5' : 'border-slate-200 text-slate-600 hover:border-slate-400 hover:bg-slate-50'}`}>৳ {val}</button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-slate-400">৳</span>
                  <input type="number" value={amount} onChange={(e) => { setAmount(e.target.value); handleInteraction(); }} placeholder="অন্যান্য পরিমাণ লিখুন" className="w-full bg-white border-2 border-slate-200 rounded-xl py-4 pl-12 pr-4 text-xl font-black text-slate-800 focus:outline-none focus:border-blue-500 transition-colors shadow-inner" required min="10" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-extrabold text-slate-700 mb-4">পেমেন্ট মাধ্যম</label>
                <div className="grid grid-cols-3 gap-4">
                   <label className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'bkash' ? 'border-[#e2136e] bg-[#e2136e]/5 shadow-sm' : 'border-slate-200'}`}><input type="radio" className="sr-only" checked={paymentMethod==='bkash'} onChange={()=>setPaymentMethod('bkash')} /><div className="w-10 h-10 bg-[#e2136e] rounded-full flex items-center justify-center text-white font-bold text-xs">bKash</div></label>
                   <label className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'nagad' ? 'border-[#f37021] bg-[#f37021]/5 shadow-sm' : 'border-slate-200'}`}><input type="radio" className="sr-only" checked={paymentMethod==='nagad'} onChange={()=>setPaymentMethod('nagad')} /><div className="w-10 h-10 bg-[#f37021] rounded-full flex items-center justify-center text-white font-bold text-xs">Nagad</div></label>
                   <label className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-50 shadow-sm' : 'border-slate-200'}`}><input type="radio" className="sr-only" checked={paymentMethod==='card'} onChange={()=>setPaymentMethod('card')} /><div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white">💳</div></label>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={!isLoggedIn || !amount} 
                className={`w-full font-black py-5 rounded-xl text-xl shadow-xl transition-all flex items-center justify-center gap-3 ${
                  isLoggedIn && amount 
                    ? 'bg-slate-800 hover:bg-slate-900 text-white shadow-slate-800/20 hover:-translate-y-1' 
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                {!isLoggedIn ? 'লগইন করে পেমেন্ট করুন' : `${formatCurrency(amount)} পেমেন্ট করুন`}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl transform transition-all border border-slate-100">
            <h3 className="text-2xl font-black text-slate-800 mb-6 border-b border-slate-100 pb-4">পেমেন্ট নিশ্চিত করুন</h3>
            
            <div className="space-y-4 mb-8">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="text-xs font-bold text-slate-500 mb-1 uppercase">ফান্ড</div>
                <div className="font-extrabold text-slate-800">{selectedCampDetails.title} {selectedCampDetails.titleHighlight}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                   <div className="text-xs font-bold text-slate-500 mb-1 uppercase">পরিমাণ</div>
                   <div className="font-black text-green-600 text-xl">{formatCurrency(amount)}</div>
                 </div>
                 <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                   <div className="text-xs font-bold text-slate-500 mb-1 uppercase">মাধ্যম</div>
                   <div className="font-extrabold text-slate-800 uppercase">{paymentMethod}</div>
                 </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setShowConfirmModal(false)} 
                disabled={isSubmitting}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-xl transition-colors"
              >
                বাতিল করুন
              </button>
              <button 
                onClick={executePayment} 
                disabled={isSubmitting}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    'হ্যাঁ, পেমেন্ট করুন'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white rounded-[2rem] p-10 max-w-sm w-full text-center shadow-2xl transform transition-all border border-slate-100">
            <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border-4 border-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            </div>
            <h3 className="text-3xl font-black text-slate-800 mb-3">অসংখ্য ধন্যবাদ!</h3>
            <p className="text-slate-600 mb-8 text-lg font-medium leading-relaxed">
              আপনার <span className="font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-md">{formatCurrency(lastDonatedAmount)}</span> অনুদানটি সফলভাবে গৃহীত হয়েছে। আপনার ড্যাশবোর্ড থেকে রসিদ ও ব্যাজ সংগ্রহ করুন।
            </p>
            <button onClick={() => setShowSuccessModal(false)} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-4 rounded-xl transition-colors text-lg">
              বন্ধ করুন
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Donate;
