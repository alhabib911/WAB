import React, { useState, useEffect } from 'react';

interface NavbarProps {
  currentRoute: string;
  setRoute: (route: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentRoute, setRoute }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (route: string) => {
    setRoute(route);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'হোম', route: 'home' },
    { name: 'আমাদের কাজ', route: 'work' },
    { name: 'রক্তদান', route: 'blood-donation' },
    { name: 'গ্যালারি', route: 'gallery' },
    { name: 'স্বেচ্ছাসেবক', route: 'volunteer' },
    { name: 'ক্যারিয়ার', route: 'all-jobs' },
  ];

  return (
    <header 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled || currentRoute !== 'home' ? 'bg-white shadow-md py-3' : 'bg-white/90 backdrop-blur-sm py-4 lg:bg-transparent lg:py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 group cursor-pointer"
          onClick={() => handleNavClick('home')}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ngo-green to-teal-600 flex items-center justify-center shadow-md transform group-hover:-translate-y-1 transition-transform">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
              <path d="M2.25 4.5l4 15h2.5l3.25-11.5L15.25 19.5h2.5l4-15h-2.5l-2.5 10.5-3.5-12h-2.5l-3.5 12-2.5-10.5h-2.5z" />
            </svg>
          </div>
          <div className="flex flex-col leading-none justify-center">
            <span className={`text-2xl font-brand font-black tracking-wider ${isScrolled || currentRoute !== 'home' ? 'text-ngo-dark' : 'text-ngo-dark lg:text-white'}`}>
              WAB
            </span>
            <span className={`text-[9px] font-bold tracking-[0.15em] uppercase mt-0.5 ${isScrolled || currentRoute !== 'home' ? 'text-ngo-green' : 'text-ngo-green lg:text-teal-200'}`}>
              We are Bangladesh
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => handleNavClick(link.route)}
              className={`font-medium transition-colors ${
                currentRoute === link.route 
                  ? 'text-ngo-green font-bold' 
                  : isScrolled || currentRoute !== 'home' 
                    ? 'text-slate-600 hover:text-ngo-green' 
                    : 'text-white/90 hover:text-white'
              }`}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => handleNavClick('donate')}
            className={`px-5 py-2.5 lg:px-6 rounded-full font-bold shadow-lg transition-transform hover:scale-105 active:scale-95 ${
              currentRoute === 'donate' 
                ? 'bg-white text-ngo-orange border-2 border-ngo-orange shadow-none' 
                : 'bg-ngo-orange hover:bg-orange-600 text-white shadow-orange-500/30'
            }`}
          >
            দান করুন
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-slate-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 py-4 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => handleNavClick(link.route)}
              className={`text-left font-medium py-2 border-b border-slate-50 ${
                currentRoute === link.route ? 'text-ngo-green font-bold' : 'text-slate-700 hover:text-ngo-green'
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
