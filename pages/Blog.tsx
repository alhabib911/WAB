import React from 'react';

const mockBlogs = [
  { id: 1, title: 'বন্যা পরবর্তী পুনর্বাসন কাজ শুরু', category: 'সংবাদ', image: 'https://picsum.photos/id/111/600/400', date: '১০ অক্টো, ২০২৪', desc: 'বন্যায় ক্ষতিগ্রস্ত পরিবারগুলোকে নতুন ঘর নির্মাণ করে দেওয়া হচ্ছে। প্রথম ধাপে ১০০টি পরিবার সাহায্য পাচ্ছে।' },
  { id: 2, title: 'শিক্ষার আলো ছড়াতে নতুন স্কুল', category: 'শিক্ষা', image: 'https://picsum.photos/id/22/600/400', date: '০৫ সেপ্টে, ২০২৪', desc: 'চরাঞ্চলের শিশুদের জন্য আমাদের নতুন একটি অবৈতনিক প্রাথমিক বিদ্যালয় যাত্রা শুরু করলো।' },
  { id: 3, title: 'শীতের প্রস্তুতি: আমাদের টার্গেট ২ লাখ কম্বল', category: 'ক্যাম্পেইন', image: 'https://picsum.photos/id/119/600/400', date: '০১ ডিসে, ২০২৪', desc: 'এবারের শীতে উত্তরবঙ্গের প্রতিটি অসহায় মানুষের গায়ে শীতবস্ত্র জড়িয়ে দিতে আমরা প্রস্তুতি নিচ্ছি।' },
];

const Blog: React.FC<{setRoute: (route: string) => void}> = ({setRoute}) => {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16 animate-slide-up">
          <span className="inline-block py-1.5 px-4 rounded-full bg-green-100 text-ngo-green font-extrabold text-sm tracking-widest mb-4">
            আমাদের খবর
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-800 mb-6">ব্লগ ও নিউজ</h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">আমাদের সাম্প্রতিক কার্যক্রম, সাফল্যের গল্প এবং নতুন উদ্যোগগুলোর খবরাখবর।</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockBlogs.map((b, idx) => (
            <div key={b.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-slide-up cursor-pointer group" style={{ animationDelay: `${0.1 * idx}s` }}>
              <div className="relative h-56 overflow-hidden">
                <img src={b.image} alt={b.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-black text-ngo-dark shadow-sm">
                  {b.category}
                </div>
              </div>
              <div className="p-8">
                <div className="text-sm font-bold text-slate-400 mb-3 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
                  {b.date}
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-4 leading-snug group-hover:text-ngo-green transition-colors">{b.title}</h3>
                <p className="text-slate-600 font-medium leading-relaxed mb-6 line-clamp-3">{b.desc}</p>
                <div className="text-ngo-green font-bold flex items-center gap-2">
                  আরও পড়ুন <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
