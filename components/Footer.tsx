import React, { useEffect, useState } from 'react';

interface FooterProps {
  setRoute: (route: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setRoute }) => {
  const [footerSettings, setFooterSettings] = useState({
    type: 'text',
    text: 'WAB',
    image: '',
    tagline: 'একটি অলাভজনক প্রতিষ্ঠান যা বাংলাদেশের প্রত্যন্ত অঞ্চলে শিক্ষা, স্বাস্থ্য এবং স্বাবলম্বীতা নিয়ে কাজ করছে।',
    social: [
      { id: 1, icon: 'Facebook', link: '#' },
      { id: 2, icon: 'Twitter', link: '#' },
      { id: 3, icon: 'Instagram', link: '#' },
      { id: 4, icon: 'LinkedIn', link: '#' }
    ]
  });

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem('siteSettings') || '{}');
    if (settings.footer) {
      setFooterSettings(prev => ({ ...prev, ...settings.footer }));
    } else if (settings.footerText) { 
      setFooterSettings(prev => ({ ...prev, tagline: settings.footerText, text: settings.siteName || prev.text }));
    }
  }, []);

  const handleNewsletter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailInput = e.currentTarget.elements.namedItem('email') as HTMLInputElement;
    const email = emailInput.value;
    
    const existing = JSON.parse(localStorage.getItem('newsletters') || '[]');
    const newEntry = { id: Date.now().toString(), email, date: new Date().toLocaleDateString('bn-BD') };
    localStorage.setItem('newsletters', JSON.stringify([newEntry, ...existing]));
    
    window.showToast('ধন্যবাদ! সাবস্ক্রাইব সম্পন্ন হয়েছে।');
    e.currentTarget.reset();
  };

  const quickLinks = [
    { name: 'আমাদের সম্পর্কে', route: 'about' },
    { name: 'কার্যক্রম সমূহ', route: 'work' },
    { name: 'ব্লগ ও নিউজ', route: 'blog' },
    { name: 'ইভেন্ট ক্যালেন্ডার', route: 'events' },
    { name: 'স্বেচ্ছাসেবক হোন', route: 'volunteer' },
    { name: 'বার্ষিক রিপোর্ট', route: 'report' },
    { name: 'যোগাযোগ', route: 'contact' }
  ];

  const emergencyLinks = [
    { name: 'বন্যা পুনর্বাসন', route: 'donate' },
    { name: 'শীতবস্ত্র বিতরণ', route: 'donate' },
    { name: 'চিকিৎসা তহবিল', route: 'donate' },
    { name: 'শিক্ষাবৃত্তি', route: 'donate' },
    { name: 'যাকাত ফান্ড', route: 'donate' }
  ];

  return (
    <footer className="bg-ngo-dark text-slate-300 pt-20 pb-10 border-t-4 border-ngo-green">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <div 
              className="flex items-center gap-3 mb-6 group cursor-pointer"
              onClick={() => setRoute('home')}
            >
              {footerSettings.type === 'image' && footerSettings.image ? (
                <img src={footerSettings.image} alt="Footer Logo" className="h-12 w-auto object-contain" loading="lazy" />
              ) : (
                <>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ngo-green to-teal-600 flex items-center justify-center shadow-md transform group-hover:-translate-y-1 transition-transform">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                      <path d="M2.25 4.5l4 15h2.5l3.25-11.5L15.25 19.5h2.5l4-15h-2.5l-2.5 10.5-3.5-12h-2.5l-3.5 12-2.5-10.5h-2.5z" />
                    </svg>
                  </div>
                  <div className="flex flex-col leading-none justify-center">
                    <span className="text-3xl font-brand font-black tracking-wider text-white">
                      {footerSettings.text || 'WAB'}
                    </span>
                    <span className="text-[9px] font-bold tracking-[0.15em] uppercase mt-0.5 text-ngo-green">
                      We are Bangladesh
                    </span>
                  </div>
                </>
              )}
            </div>
            <p className="mb-6 leading-relaxed text-sm">
              {footerSettings.tagline}
            </p>
            <div className="flex items-center gap-3">
              {footerSettings.social?.map((item: any) => (
                <a key={item.id} href={item.link} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-ngo-green hover:text-white transition-colors overflow-hidden">
                  <span className="sr-only">Social Link {item.id}</span>
                  {item.icon && item.icon.startsWith('data:') ? (
                    <img src={item.icon} alt="social" className="w-4 h-4 object-contain" loading="lazy" />
                  ) : (
                    <span className="text-xs font-bold">{item.icon?.substring(0, 1)}</span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">দ্রুত লিঙ্ক</h4>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => setRoute(link.route)}
                    className="hover:text-ngo-green transition-colors flex items-center gap-2 group cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-ngo-green transition-colors"></span>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">জরুরী সহায়তা</h4>
            <ul className="space-y-3 text-sm">
              {emergencyLinks.map((link) => (
                <li key={link.name}>
                  <button 
                    onClick={() => setRoute(link.route)}
                    className="hover:text-ngo-orange transition-colors flex items-center gap-2 group cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-ngo-orange transition-colors"></span>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Col */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">নিউজলেটার</h4>
            <p className="mb-4 text-sm text-slate-400">আমাদের কাজের সর্বশেষ আপডেট পেতে ইমেইল দিয়ে যুক্ত থাকুন।</p>
            <form className="flex flex-col gap-3" onSubmit={handleNewsletter}>
              <input 
                type="email" 
                name="email"
                placeholder="আপনার ইমেইল অ্যাড্রেস" 
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-ngo-green transition-colors"
                required
              />
              <button 
                type="submit" 
                className="bg-ngo-green hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-colors text-sm"
              >
                সাবস্ক্রাইব করুন
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} {footerSettings.text || 'WAB'}. সর্বস্বত্ব সংরক্ষিত.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <button onClick={() => setRoute('about')} className="hover:text-white">গোপনীয়তা নীতি</button>
            <button onClick={() => setRoute('about')} className="hover:text-white">শর্তাবলী</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;