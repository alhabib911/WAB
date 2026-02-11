import React, { useState } from 'react';

const mockEvents = [
  { id: 1, date: '15 Nov 2024', title: 'বার্ষিক চ্যারিটি ডিনার', location: 'ঢাকা', desc: 'অসহায় শিশুদের শিক্ষার জন্য ফান্ড রেইজিং ইভেন্ট।' },
  { id: 2, date: '01 Dec 2024', title: 'ফ্রি মেডিকেল ক্যাম্প', location: 'বান্দরবান', desc: 'দুর্গম এলাকার মানুষের জন্য বিনামূল্যে চিকিৎসা সেবা প্রদান।' },
  { id: 3, date: '20 Dec 2024', title: 'শীতবস্ত্র বিতরণ অভিযান', location: 'কুড়িগ্রাম', desc: 'তীব্র শীতে অসহায় মানুষদের মাঝে শীতের কাপড় বিতরণ।' },
];

const Events: React.FC = () => {
  const handleShare = async (e: any) => {
    if (navigator.share) {
      try { await navigator.share({ title: e.title, text: e.desc, url: window.location.href }); } catch (err) {}
    } else {
      window.showToast('ইভেন্টের লিংক কপি করা হয়েছে!', 'info');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16 animate-slide-up">
          <span className="inline-block py-1.5 px-4 rounded-full bg-blue-100 text-ngo-blue font-extrabold text-sm tracking-widest mb-4">
            আপকামিং প্রোগ্রাম
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-800 mb-6">ইভেন্ট ক্যালেন্ডার</h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">আমাদের আগামী ইভেন্টগুলোতে অংশগ্রহণ করুন এবং মানুষের কল্যাণে অবদান রাখুন।</p>
        </div>

        <div className="space-y-6">
          {mockEvents.map((evt, idx) => (
            <div key={evt.id} className="bg-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all animate-slide-up" style={{ animationDelay: `${0.1 * idx}s` }}>
              <div className="w-full md:w-48 h-32 bg-slate-50 rounded-2xl border-2 border-slate-100 flex flex-col items-center justify-center shrink-0">
                <div className="text-ngo-blue font-black text-3xl">{evt.date.split(' ')[0]}</div>
                <div className="text-slate-500 font-extrabold uppercase tracking-widest text-sm">{evt.date.split(' ')[1]} {evt.date.split(' ')[2]}</div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-black text-slate-800 mb-2">{evt.title}</h3>
                <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500 font-bold mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                  {evt.location}
                </div>
                <p className="text-slate-600 font-medium">{evt.desc}</p>
              </div>
              <div className="w-full md:w-auto flex flex-row md:flex-col gap-3 shrink-0">
                <button onClick={() => window.showToast('ইভেন্টে আপনাকে স্বাগতম!', 'success')} className="flex-1 bg-ngo-dark hover:bg-slate-800 text-white font-bold px-8 py-3.5 rounded-xl transition-colors text-center shadow-lg">অংশগ্রহণ করুন</button>
                <button onClick={() => handleShare(evt)} className="flex-1 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold px-8 py-3.5 rounded-xl transition-colors text-center flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg>
                  শেয়ার
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
