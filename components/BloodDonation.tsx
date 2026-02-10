import React from 'react';

const bloodRequests = [
  { id: 1, group: 'O+', location: 'ঢাকা মেডিকেল কলেজ, ঢাকা', time: 'আজ বিকাল ৫টার মধ্যে', phone: '01711-XXXXXX', urgent: true },
  { id: 2, group: 'AB-', location: 'চমেক হাসপাতাল, চট্টগ্রাম', time: 'আগামীকাল সকাল ৯টা', phone: '01811-XXXXXX', urgent: false },
  { id: 3, group: 'B+', location: 'রাজশাহী মেডিকেল কলেজ', time: 'আজ রাত ৮টার মধ্যে', phone: '01911-XXXXXX', urgent: true },
  { id: 4, group: 'A+', location: 'ইবনে সিনা হাসপাতাল, সিলেট', time: 'আগামীকাল দুপুর ১২টা', phone: '01611-XXXXXX', urgent: false },
];

const BloodDonation: React.FC = () => {
  return (
    <section className="py-20 bg-red-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-red-200/50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-red-200/40 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md text-red-500 mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 mb-4">
            রক্তদান: <span className="text-red-600">জীবন বাঁচান</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            জরুরী রক্তের প্রয়োজনে সহজেই রক্তদাতা খুঁজুন অথবা নিজেই রক্তদাতা হিসেবে আমাদের সাথে যুক্ত হোন।
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Search Form */}
          <div className="w-full lg:w-5/12 bg-white rounded-3xl p-8 shadow-xl border border-red-100">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-red-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              রক্তদাতা খুঁজুন
            </h3>
            
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">রক্তের গ্রুপ</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-red-400 focus:bg-white text-slate-700 font-medium">
                  <option value="">নির্বাচন করুন</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">বিভাগ</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-red-400 focus:bg-white text-slate-700 font-medium">
                  <option value="">নির্বাচন করুন</option>
                  <option value="ঢাকা">ঢাকা</option>
                  <option value="চট্টগ্রাম">চট্টগ্রাম</option>
                  <option value="রাজশাহী">রাজশাহী</option>
                  <option value="সিলেট">সিলেট</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">জেলা</label>
                  <input type="text" placeholder="যেমন: ঢাকা" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-red-400 focus:bg-white text-slate-700" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">উপজেলা/থানা</label>
                  <input type="text" placeholder="যেমন: ধানমন্ডি" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-red-400 focus:bg-white text-slate-700" />
                </div>
              </div>

              <button type="button" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-red-500/30 transition-transform active:scale-95 mt-4">
                অনুসন্ধান করুন
              </button>
            </form>
          </div>

          {/* Right Column: Emergency Requests Feed */}
          <div className="w-full lg:w-7/12">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
                জরুরী রক্তের প্রয়োজন
              </h3>
              <button className="text-sm font-bold text-red-600 hover:text-red-700 underline">সব রিকোয়েস্ট দেখুন</button>
            </div>

            <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
              {bloodRequests.map((req) => (
                <div key={req.id} className="bg-white p-5 rounded-2xl shadow-sm border border-red-50 hover:shadow-md hover:border-red-200 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-red-50 text-red-600 font-extrabold text-xl flex items-center justify-center border border-red-100">
                      {req.group}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-slate-800">{req.location}</span>
                        {req.urgent && (
                          <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full">খুব জরুরী</span>
                        )}
                      </div>
                      <div className="text-sm text-slate-500 flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          {req.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="w-full sm:w-auto px-5 py-2.5 bg-slate-50 hover:bg-red-50 text-slate-700 hover:text-red-600 border border-slate-200 hover:border-red-200 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 text-sm shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.265-3.965-6.861-6.861l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                    যোগাযোগ
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center bg-white border border-slate-200 p-4 rounded-2xl">
              <p className="text-sm text-slate-600 mb-3">আপনি কি রক্ত দিতে ইচ্ছুক?</p>
              <button className="text-red-600 font-bold underline hover:text-red-700">রক্তদাতা হিসেবে নিবন্ধন করুন</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BloodDonation;
