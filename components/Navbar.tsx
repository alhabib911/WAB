import React, { useState, useEffect } from 'react';

interface NavbarProps {
  currentRoute: string;
  setRoute: (route: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentRoute, setRoute }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [langVersion, setLangVersion] = useState(0); // force update on lang change
  
  const [headerSettings, setHeaderSettings] = useState({
    type: 'text',
    text: 'WAB',
    image: ''
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAdminContact, setShowAdminContact] = useState(false);
  const [adminContactSuccess, setAdminContactSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const handleLangChange = () => setLangVersion(v => v + 1);
    window.addEventListener('languageChange', handleLangChange);
    
    const settings = JSON.parse(localStorage.getItem('siteSettings') || '{}');
    if (settings.header) {
      setHeaderSettings(settings.header);
    }

    const role = localStorage.getItem('userRole');
    setIsLoggedIn(!!role);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('languageChange', handleLangChange);
    };
  }, [currentRoute]);

  const handleNavClick = (route: string) => {
    setRoute(route);
    setIsMobileMenuOpen(false);
  };

  const toggleLanguage = () => {
    const newLang = window.lang === 'bn' ? 'en' : 'bn';
    window.setLanguage(newLang);
  };

  const handleAdminContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const newContact = {
      id: Date.now().toString(),
      title: fd.get('title'),
      name: fd.get('name'),
      phone: fd.get('phone'),
      email: fd.get('email'),
      details: fd.get('details'),
      type: fd.get('type'),
      date: new Date().toLocaleDateString('bn-BD'),
      status: 'Pending'
    };

    const existing = JSON.parse(localStorage.getItem('adminContacts') || '[]');
    localStorage.setItem('adminContacts', JSON.stringify([newContact, ...existing]));

    setAdminContactSuccess(true);
    setTimeout(() => {
      setAdminContactSuccess(false);
      setShowAdminContact(false);
    }, 2500);
  };

  const navLinks = [
    { nameBn: 'হোম', nameEn: 'Home', route: 'home' },
    { nameBn: 'আমাদের কাজ', nameEn: 'Our Work', route: 'work' },
    { nameBn: 'ব্লগ', nameEn: 'Blog', route: 'blog' },
    { nameBn: 'ইভেন্ট', nameEn: 'Events', route: 'events' },
    { nameBn: 'রক্তদান', nameEn: 'Blood Donation', route: 'blood-donation' },
    { nameBn: 'ক্যারিয়ার', nameEn: 'Careers', route: 'all-jobs' },
  ];

  return (
    <>
      <header 
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled || currentRoute !== 'home' ? 'bg-white shadow-md py-3' : 'bg-white/90 backdrop-blur-sm py-4 lg:bg-transparent lg:py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div 
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            {headerSettings.type === 'image' && headerSettings.image ? (
              <img src={headerSettings.image} alt="Logo" className="h-10 w-auto object-contain" />
            ) : (
              <>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ngo-green to-teal-600 flex items-center justify-center shadow-md transform group-hover:-translate-y-1 transition-transform">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                    <path d="M2.25 4.5l4 15h2.5l3.25-11.5L15.25 19.5h2.5l4-15h-2.5l-2.5 10.5-3.5-12h-2.5l-3.5 12-2.5-10.5h-2.5z" />
                  </svg>
                </div>
                <div className="flex flex-col leading-none justify-center">
                  <span className={`text-2xl font-brand font-black tracking-wider ${isScrolled || currentRoute !== 'home' ? 'text-ngo-dark' : 'text-ngo-dark lg:text-white'}`}>
                    {headerSettings.text || 'WAB'}
                  </span>
                  <span className={`text-[9px] font-bold tracking-[0.15em] uppercase mt-0.5 ${isScrolled || currentRoute !== 'home' ? 'text-ngo-green' : 'text-ngo-green lg:text-teal-200'}`}>
                    We are Bangladesh
                  </span>
                </div>
              </>
            )}
          </div>

          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks.map((link) => (
              <button 
                key={link.route} 
                onClick={() => handleNavClick(link.route)}
                className={`font-medium transition-colors text-sm xl:text-base ${
                  currentRoute === link.route 
                    ? 'text-ngo-green font-bold' 
                    : isScrolled || currentRoute !== 'home' 
                      ? 'text-slate-600 hover:text-ngo-green' 
                      : 'text-white/90 hover:text-white'
                }`}
              >
                {window.t(link.nameBn, link.nameEn)}
              </button>
            ))}
            <button 
              onClick={() => handleNavClick(isLoggedIn ? 'dashboard' : 'login')}
              className={`font-medium transition-colors text-sm xl:text-base ${
                currentRoute === 'login' || currentRoute === 'dashboard'
                  ? 'text-ngo-green font-bold' 
                  : isScrolled || currentRoute !== 'home' 
                    ? 'text-slate-600 hover:text-ngo-green' 
                    : 'text-white/90 hover:text-white'
              }`}
            >
              {window.t(isLoggedIn ? 'ড্যাশবোর্ড' : 'লগইন', isLoggedIn ? 'Dashboard' : 'Login')}
            </button>
          </nav>

          <div className="flex items-center gap-2 lg:gap-3">
            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage}
              className={`px-3 py-1.5 text-xs lg:text-sm rounded-full font-bold transition-all border ${
                isScrolled || currentRoute !== 'home' 
                  ? 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200' 
                  : 'bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm'
              }`}
            >
              {window.lang === 'bn' ? 'EN' : 'BN'}
            </button>

            <button 
              disabled={!isLoggedIn}
              onClick={() => isLoggedIn && setShowAdminContact(true)}
              className={`hidden md:flex px-3 py-1.5 lg:px-4 lg:py-2 text-xs lg:text-sm rounded-full font-bold transition-all ${
                isLoggedIn 
                  ? 'bg-slate-800 hover:bg-slate-900 text-white shadow-lg hover:scale-105 active:scale-95 shadow-slate-500/30' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
              title={!isLoggedIn ? window.t('লগইন করা আবশ্যক', 'Login required') : ''}
            >
              Admin Contact
            </button>
            
            <button 
              onClick={() => handleNavClick('donate')}
              className={`hidden sm:block px-4 py-1.5 lg:px-5 lg:py-2 text-sm lg:text-base rounded-full font-bold shadow-lg transition-transform hover:scale-105 active:scale-95 ${
                currentRoute === 'donate' 
                  ? 'bg-white text-ngo-orange border-2 border-ngo-orange shadow-none' 
                  : 'bg-ngo-orange hover:bg-orange-600 text-white shadow-orange-500/30'
              }`}
            >
              {window.t('দান করুন', 'Donate Now')}
            </button>
            
            <button 
              className="lg:hidden p-2 text-slate-700 bg-slate-100 rounded-full ml-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 py-4 px-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <button 
                key={link.route} 
                onClick={() => handleNavClick(link.route)}
                className={`text-left font-bold py-2.5 px-4 rounded-xl ${
                  currentRoute === link.route ? 'bg-green-50 text-ngo-green' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {window.t(link.nameBn, link.nameEn)}
              </button>
            ))}
            <button 
              onClick={() => handleNavClick(isLoggedIn ? 'dashboard' : 'login')}
              className={`text-left font-bold py-2.5 px-4 rounded-xl text-slate-700 hover:bg-slate-50`}
            >
              {window.t(isLoggedIn ? 'ড্যাশবোর্ড' : 'লগইন', isLoggedIn ? 'Dashboard' : 'Login')}
            </button>
            <button 
              onClick={() => { handleNavClick('donate'); setIsMobileMenuOpen(false); }}
              className={`text-left font-bold py-2.5 px-4 rounded-xl text-ngo-orange hover:bg-orange-50`}
            >
              {window.t('দান করুন', 'Donate Now')}
            </button>
            <button 
              disabled={!isLoggedIn}
              onClick={() => { if(isLoggedIn) { setShowAdminContact(true); setIsMobileMenuOpen(false); } }}
              className={`text-left font-bold py-2.5 px-4 rounded-xl ${isLoggedIn ? 'text-slate-800 bg-slate-100' : 'text-slate-400 bg-slate-50'}`}
            >
              Admin Contact
            </button>
          </div>
        )}
      </header>

      {/* Admin Contact Modal */}
      {showAdminContact && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setShowAdminContact(false)}></div>
          <div className="relative bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-xl text-slate-800">{window.t('অ্যাডমিন কন্টাক্ট', 'Admin Contact')}</h3>
              <button onClick={() => setShowAdminContact(false)} className="p-1 rounded-full hover:bg-slate-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              {adminContactSuccess ? (
                <div className="bg-green-50 border border-green-200 text-green-700 p-8 rounded-2xl text-center font-bold text-xl my-4 shadow-inner">
                  <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  </div>
                  {window.t('ধন্যবাদ! আপনার বার্তাটি অ্যাডমিনের কাছে সফলভাবে পাঠানো হয়েছে।', 'Thank you! Your message has been sent to the admin.')}
                </div>
              ) : (
                <form onSubmit={handleAdminContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">{window.t('টাইটেল / বিষয়', 'Title / Subject')}</label>
                    <input type="text" name="title" required className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 focus:outline-none focus:border-ngo-blue" placeholder={window.t('বিষয় লিখুন', 'Enter subject')} />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">{window.t('আপনার নাম', 'Your Name')}</label>
                    <input type="text" name="name" required className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 focus:outline-none focus:border-ngo-blue" placeholder={window.t('সম্পূর্ণ নাম', 'Full name')} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-1">{window.t('ফোন নম্বর', 'Phone Number')}</label>
                       <input type="tel" name="phone" required className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 focus:outline-none focus:border-ngo-blue" placeholder="01XXX-XXXXXX" />
                     </div>
                     <div>
                       <label className="block text-sm font-bold text-slate-700 mb-1">{window.t('ইমেইল', 'Email')}</label>
                       <input type="email" name="email" required className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 focus:outline-none focus:border-ngo-blue" placeholder="example@email.com" />
                     </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">{window.t('কী ধরনের মেসেজ?', 'Message Type?')}</label>
                    <select name="type" required className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 focus:outline-none focus:border-ngo-blue">
                      <option value="অভিযোগ">{window.t('অভিযোগ (Complaint)', 'Complaint')}</option>
                      <option value="রিকোয়েস্ট">{window.t('রিকোয়েস্ট (Request)', 'Request')}</option>
                      <option value="পরামর্শ">{window.t('পরামর্শ (Suggestion)', 'Suggestion')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">{window.t('বিস্তারিত বিবরণ', 'Details')}</label>
                    <textarea name="details" rows={3} required className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 focus:outline-none focus:border-ngo-blue" placeholder={window.t('আপনার বার্তাটি এখানে বিস্তারিত লিখুন...', 'Write your message here...')}></textarea>
                  </div>
                  <button type="submit" className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3.5 rounded-xl text-lg mt-6 shadow-md transition-colors">
                    {window.t('মেসেজ সাবমিট করুন', 'Submit Message')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
