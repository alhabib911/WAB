import React from 'react';

const reports = [
  { year: '২০২৩', title: 'বার্ষিক কার্যক্রম ও আর্থিক প্রতিবেদন ২০২৩', raised: '১২.৫ কোটি', spent: '১১.৮ কোটি', benefited: '৫ লক্ষ+' },
  { year: '২০২২', title: 'বার্ষিক কার্যক্রম ও আর্থিক প্রতিবেদন ২০২২', raised: '৯.২ কোটি', spent: '৮.৯ কোটি', benefited: '৩.৫ লক্ষ+' },
  { year: '২০২১', title: 'করোনা মহামারী বিশেষ প্রতিবেদন ২০২১', raised: '১৫.১ কোটি', spent: '১৫.০ কোটি', benefited: '১০ লক্ষ+' },
];

const AnnualReport: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-ngo-green py-20 text-center text-white relative">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 text-white font-bold text-sm tracking-widest mb-4">
            স্বচ্ছতা ও জবাবদিহিতা
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">বার্ষিক রিপোর্ট</h1>
          <p className="text-green-100 text-lg md:text-xl max-w-2xl mx-auto">
            আপনাদের অনুদান কীভাবে এবং কোথায় ব্যয় হচ্ছে তার বিস্তারিত হিসাব। আমরা শতভাগ স্বচ্ছতায় বিশ্বাস করি।
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-5xl mt-16">
        <div className="grid gap-8">
          {reports.map((report) => (
            <div key={report.year} className="bg-white rounded-3xl p-6 md:p-10 shadow-lg border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 hover:border-ngo-green transition-colors">
              <div className="w-full md:w-auto text-center md:text-left">
                <div className="text-4xl font-black text-slate-200 mb-2">{report.year}</div>
                <h3 className="text-2xl font-extrabold text-ngo-dark mb-4">{report.title}</h3>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="bg-green-50 text-ngo-green px-4 py-2 rounded-xl border border-green-100">
                    <div className="text-xs font-bold uppercase mb-1">মোট সংগ্রহ</div>
                    <div className="text-xl font-extrabold">৳ {report.raised}</div>
                  </div>
                  <div className="bg-orange-50 text-ngo-orange px-4 py-2 rounded-xl border border-orange-100">
                    <div className="text-xs font-bold uppercase mb-1">মোট ব্যয়</div>
                    <div className="text-xl font-extrabold">৳ {report.spent}</div>
                  </div>
                  <div className="bg-blue-50 text-ngo-blue px-4 py-2 rounded-xl border border-blue-100">
                    <div className="text-xs font-bold uppercase mb-1">উপকৃত মানুষ</div>
                    <div className="text-xl font-extrabold">{report.benefited}</div>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => alert('PDF ডাউনলোড শুরু হচ্ছে...')}
                className="w-full md:w-auto shrink-0 bg-slate-800 hover:bg-ngo-dark text-white font-bold py-4 px-8 rounded-2xl flex items-center justify-center gap-3 transition-colors shadow-xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                রিপোর্ট ডাউনলোড (PDF)
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-50 border border-blue-100 rounded-3xl p-8 text-center">
          <h4 className="text-xl font-bold text-ngo-dark mb-2">অডিট সম্পর্কিত তথ্য</h4>
          <p className="text-slate-600 max-w-2xl mx-auto">
            আমাদের সকল আর্থিক লেনদেন এবং বাৎসরিক রিপোর্ট বাংলাদেশ সরকারের সমাজসেবা অধিদপ্তর এবং এনজিও বিষয়ক ব্যুরো দ্বারা স্বীকৃত থার্ড-পার্টি অডিট ফার্ম দ্বারা নিরীক্ষিত।
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnnualReport;
