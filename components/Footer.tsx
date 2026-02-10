import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-ngo-dark text-slate-300 pt-20 pb-10 border-t-4 border-ngo-green">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ngo-green to-teal-600 flex items-center justify-center shadow-md transform group-hover:-translate-y-1 transition-transform">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                  <path d="M2.25 4.5l4 15h2.5l3.25-11.5L15.25 19.5h2.5l4-15h-2.5l-2.5 10.5-3.5-12h-2.5l-3.5 12-2.5-10.5h-2.5z" />
                </svg>
              </div>
              <div className="flex flex-col leading-none justify-center">
                <span className="text-3xl font-brand font-black tracking-wider text-white">
                  WAB
                </span>
                <span className="text-[9px] font-bold tracking-[0.15em] uppercase mt-0.5 text-ngo-green">
                  We are Bangladesh
                </span>
              </div>
            </div>
            <p className="mb-6 leading-relaxed">
              একটি অলাভজনক প্রতিষ্ঠান যা বাংলাদেশের প্রত্যন্ত অঞ্চলে শিক্ষা, স্বাস্থ্য এবং স্বাবলম্বীতা নিয়ে কাজ করছে।
            </p>
            <div className="flex items-center gap-4">
              {/* Social Icons Placeholders */}
              {[1, 2, 3, 4].map((i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-ngo-green hover:text-white transition-colors">
                  <span className="sr-only">Social Link {i}</span>
                  <div className="w-4 h-4 bg-current rounded-sm"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">দ্রুত লিঙ্ক</h4>
            <ul className="space-y-3">
              {['আমাদের সম্পর্কে', 'কার্যক্রম সমূহ', 'স্বেচ্ছাসেবক হোন', 'বার্ষিক রিপোর্ট', 'যোগাযোগ'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-ngo-green transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-slate-500"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">জরুরী সহায়তা</h4>
            <ul className="space-y-3">
              {['বন্যা পুনর্বাসন', 'শীতবস্ত্র বিতরণ', 'চিকিৎসা তহবিল', 'শিক্ষাবৃত্তি', 'যাকাত ফান্ড'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-ngo-orange transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-slate-500"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Col */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">নিউজলেটার</h4>
            <p className="mb-4 text-sm">আমাদের কাজের সর্বশেষ আপডেট পেতে ইমেইল দিয়ে যুক্ত থাকুন।</p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="আপনার ইমেইল অ্যাড্রেস" 
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-ngo-green transition-colors"
                required
              />
              <button 
                type="submit" 
                className="bg-ngo-green hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors"
              >
                সাবস্ক্রাইব করুন
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-sm">
          <p>&copy; {new Date().getFullYear()} WAB (We are Bangladesh). সর্বস্বত্ব সংরক্ষিত.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">গোপনীয়তা নীতি</a>
            <a href="#" className="hover:text-white">শর্তাবলী</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;