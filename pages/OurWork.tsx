import React from 'react';
import ImpactMap from '../components/ImpactMap';

const OurWork: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <div className="bg-ngo-dark py-16 text-center text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-ngo-green font-bold text-sm tracking-widest mb-4">
            আমাদের ইমপ্যাক্ট
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            দেশের প্রতিটি কোণায় আমরা
          </h1>
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
            ম্যাপের মাধ্যমে দেখুন আমাদের চলমান প্রজেক্টগুলো। প্রতিটি পয়েন্টে লুকিয়ে আছে একেকটি নতুন জীবনের গল্প, আপনার সামান্য সাহায্যেই যা সম্ভব হয়েছে।
          </p>
        </div>
      </div>

      {/* The Map Component */}
      <ImpactMap />
      
      {/* Bottom CTA */}
      <div className="bg-slate-50 py-16 text-center border-t border-slate-200">
        <h2 className="text-2xl font-bold text-ngo-dark mb-4">আমাদের কাজের অংশ হতে চান?</h2>
        <p className="text-slate-600 mb-6">আপনার ছোট একটি অনুদান আমাদের প্রজেক্টগুলোকে আরও ত্বরান্বিত করতে পারে।</p>
      </div>
    </div>
  );
};

export default OurWork;
