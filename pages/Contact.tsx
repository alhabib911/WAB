import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-ngo-dark py-16 text-center text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">যোগাযোগ করুন</h1>
          <p className="text-slate-300 text-lg">
            যেকোনো তথ্য, পরামর্শ অথবা আমাদের কার্যক্রমে যুক্ত হতে আমাদের সাথে যোগাযোগ করুন। আমরা সবসময় আপনার পাশে আছি।
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-6xl py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Details */}
          <div>
            <h2 className="text-3xl font-extrabold text-ngo-dark mb-8">আমাদের অফিস সমূহ</h2>
            
            <div className="space-y-6">
              {/* Head Office */}
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex gap-4 items-start">
                <div className="w-12 h-12 bg-ngo-green/10 text-ngo-green rounded-full flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-800 mb-2">হেড অফিস (ঢাকা)</h4>
                  <p className="text-slate-600 leading-relaxed mb-3">বাড়ি নং-১২, রোড-৪, ধানমন্ডি, ঢাকা-১২০৫, বাংলাদেশ।</p>
                  <p className="text-slate-600 font-bold">ফোন: <a href="tel:+8801711000000" className="text-ngo-blue hover:underline">+৮৮০ ১৭১১-০০০০০০</a></p>
                  <p className="text-slate-600 font-bold">ইমেইল: <a href="mailto:info@wab.org.bd" className="text-ngo-blue hover:underline">info@wab.org.bd</a></p>
                </div>
              </div>

              {/* Regional Office */}
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl flex gap-4 items-start">
                <div className="w-12 h-12 bg-ngo-orange/10 text-ngo-orange rounded-full flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-800 mb-2">আঞ্চলিক অফিস (চট্টগ্রাম)</h4>
                  <p className="text-slate-600 leading-relaxed mb-3">ফ্ল্যাট-২বি, সিডিএ এভিনিউ, জিইসি মোড়, চট্টগ্রাম।</p>
                  <p className="text-slate-600 font-bold">ফোন: <a href="tel:+8801811000000" className="text-ngo-blue hover:underline">+৮৮০ ১৮১১-০০০০০০</a></p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-10">
              <h4 className="font-bold text-slate-800 mb-4">সোশ্যাল মিডিয়ায় আমরা</h4>
              <div className="flex gap-4">
                {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                  <button key={social} className="px-5 py-2.5 bg-slate-100 hover:bg-ngo-blue hover:text-white rounded-full text-slate-700 font-bold transition-colors text-sm">
                    {social}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-50 p-8 rounded-3xl shadow-lg border border-slate-200">
            <h2 className="text-2xl font-extrabold text-ngo-dark mb-6">আমাদের মেসেজ পাঠান</h2>
            {showSuccess ? (
              <div className="bg-green-100 border border-green-300 text-green-800 p-6 rounded-2xl text-center">
                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                </div>
                <h4 className="text-xl font-bold mb-2">মেসেজ পাঠানো হয়েছে!</h4>
                <p>আমাদের সাথে যোগাযোগ করার জন্য ধন্যবাদ। খুব শীঘ্রই আমাদের একজন প্রতিনিধি আপনার সাথে যোগাযোগ করবেন।</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">আপনার নাম</label>
                  <input type="text" className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-ngo-blue" placeholder="সম্পূর্ণ নাম" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">ইমেইল অ্যাড্রেস</label>
                  <input type="email" className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-ngo-blue" placeholder="example@email.com" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">বিষয়</label>
                  <input type="text" className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-ngo-blue" placeholder="মেসেজের বিষয়" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">মেসেজ</label>
                  <textarea rows={4} className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-ngo-blue" placeholder="বিস্তারিত লিখুন..." required></textarea>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full bg-ngo-blue hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-blue-500/30 transition-all flex justify-center items-center gap-2">
                  {isSubmitting ? (
                    <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    'মেসেজ সেন্ড করুন'
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
