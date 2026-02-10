import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-ngo-blue py-20 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mt-10 -mr-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-ngo-green/20 rounded-full blur-3xl -mb-10 -ml-10"></div>
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-blue-200 font-bold text-sm tracking-widest mb-4 border border-white/20">
            আমাদের সম্পর্কে
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            We Are Bangladesh (WAB)
          </h1>
          <p className="text-blue-100 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            আমরা স্বপ্ন দেখি এমন একটি বাংলাদেশের যেখানে প্রতিটি মানুষের মৌলিক অধিকার নিশ্চিত হবে, এবং কেউ পিছিয়ে থাকবে না।
          </p>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="container mx-auto px-4 md:px-6 max-w-6xl py-20 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 hover:border-ngo-green transition-colors">
            <div className="w-16 h-16 bg-green-50 text-ngo-green rounded-2xl flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-ngo-dark mb-4">আমাদের মিশন</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              প্রান্তিক ও সুবিধাবঞ্চিত মানুষের জীবনমান উন্নয়নে শিক্ষা, স্বাস্থ্য, এবং কর্মসংস্থানের সুযোগ সৃষ্টি করা। আমরা বিশ্বাস করি সঠিক দিকনির্দেশনা ও সামান্য সহায়তায় প্রতিটি মানুষ স্বাবলম্বী হতে পারে।
            </p>
          </div>
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 hover:border-ngo-blue transition-colors">
            <div className="w-16 h-16 bg-blue-50 text-ngo-blue rounded-2xl flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-ngo-dark mb-4">আমাদের ভিশন</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              এমন একটি সমাজ বিনির্মাণ করা যেখানে দারিদ্র্য ও বৈষম্যের কোনো স্থান নেই। যেখানে প্রতিটি শিশু স্কুলে যাবে, প্রতিটি রোগী চিকিৎসা পাবে এবং সবাই মিলেমিশে একটি সুন্দর ভবিষ্যৎ গড়বে।
            </p>
          </div>
        </div>

        {/* Our Story */}
        <div className="mt-20 flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/2">
            <img src="https://picsum.photos/id/119/800/600" alt="Our Story" className="rounded-3xl shadow-2xl" />
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-sm font-bold text-ngo-orange uppercase tracking-widest mb-2">আমাদের গল্প</h2>
            <h3 className="text-4xl font-extrabold text-ngo-dark mb-6">যেভাবে শুরু আমাদের পথচলা</h3>
            <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
              <p>
                ২০১৫ সালের এক শীতের সকালে, ঢাকা বিশ্ববিদ্যালয়ের কয়েকজন শিক্ষার্থীর উদ্যোগে শুরু হয়েছিল 'We Are Bangladesh' এর যাত্রা। ফুটপাতের সুবিধাবঞ্চিত মানুষের মাঝে শীতবস্ত্র বিতরণের মাধ্যমে যে ছোট প্রয়াস শুরু হয়েছিল, তা আজ একটি দেশব্যাপী বড় উদ্যোগে রূপ নিয়েছে।
              </p>
              <p>
                গত ৯ বছরে আমরা দেশের ৫০টিরও বেশি জেলায় আমাদের কার্যক্রম সম্প্রসারিত করেছি। শিক্ষা, চিকিৎসা, দুর্যোগ ব্যবস্থাপনা থেকে শুরু করে নারীদের স্বাবলম্বী করার মতো গুরুত্বপূর্ণ কাজগুলো আমরা অত্যন্ত দক্ষতার সাথে পরিচালনা করে আসছি।
              </p>
              <p className="font-bold text-ngo-dark">
                আমাদের এই দীর্ঘ যাত্রায় পাশে থাকার জন্য আপনাদের সবাইকে আন্তরিক ধন্যবাদ।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
