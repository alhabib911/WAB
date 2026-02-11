import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Donate from './pages/Donate';
import OurWork from './pages/OurWork';
import AllJobs from './pages/AllJobs';
import About from './pages/About';
import Contact from './pages/Contact';
import AnnualReport from './pages/AnnualReport';
import VolunteerPage from './pages/VolunteerPage';
import BloodDonationPage from './pages/BloodDonationPage';
import GalleryPage from './pages/GalleryPage';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import Blog from './pages/Blog';
import Events from './pages/Events';

// Initialize global translation functions early to prevent "window.t is not a function"
if (typeof window !== 'undefined') {
  window.lang = (localStorage.getItem('lang') as 'bn' | 'en') || 'bn';
  window.t = (bn: string, en: string) => window.lang === 'en' ? en : bn;
}

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [toast, setToast] = useState<{msg: string, type: 'success' | 'error' | 'info'} | null>(null);
  const [language, setLanguageState] = useState<'bn' | 'en'>(window.lang);

  // Initialize Global Contexts
  useEffect(() => {
    window.setLanguage = (lang: 'bn' | 'en') => {
      localStorage.setItem('lang', lang);
      setLanguageState(lang);
      window.lang = lang;
      window.dispatchEvent(new Event('languageChange'));
    };

    window.showToast = (msg: string, type: 'success' | 'error' | 'info' = 'success') => {
      const event = new CustomEvent('show-toast', { detail: { msg, type } });
      window.dispatchEvent(event);
    };

    const handleToast = (e: any) => {
      setToast(e.detail);
      setTimeout(() => setToast(null), 3500);
    };

    window.addEventListener('show-toast', handleToast);
    return () => {
      window.removeEventListener('show-toast', handleToast);
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentRoute]);

  const renderPage = () => {
    if (currentRoute === 'dashboard') return <Dashboard setRoute={setCurrentRoute} />;
    
    return (
      <div className="min-h-screen flex flex-col font-sans text-slate-800">
        <Navbar currentRoute={currentRoute} setRoute={setCurrentRoute} />
        <main className="flex-grow pt-20 lg:pt-24">
          {currentRoute === 'home' && <Home setRoute={setCurrentRoute} />}
          {currentRoute === 'donate' && <Donate />}
          {currentRoute === 'work' && <OurWork />}
          {currentRoute === 'all-jobs' && <AllJobs setRoute={setCurrentRoute} />}
          {currentRoute === 'about' && <About />}
          {currentRoute === 'contact' && <Contact />}
          {currentRoute === 'report' && <AnnualReport />}
          {currentRoute === 'volunteer' && <VolunteerPage />}
          {currentRoute === 'blood-donation' && <BloodDonationPage />}
          {currentRoute === 'gallery' && <GalleryPage />}
          {currentRoute === 'login' && <Auth setRoute={setCurrentRoute} />}
          {currentRoute === 'blog' && <Blog setRoute={setCurrentRoute} />}
          {currentRoute === 'events' && <Events />}
        </main>
        <Footer setRoute={setCurrentRoute} />
      </div>
    );
  };

  return (
    <>
      {renderPage()}
      
      {/* Global Toast Container */}
      {toast && (
        <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-[9999] px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-toast-slide font-bold text-sm ${
          toast.type === 'error' ? 'bg-red-600 text-white' : 
          toast.type === 'info' ? 'bg-blue-600 text-white' : 
          'bg-ngo-dark text-white'
        }`}>
          {toast.type === 'success' && (
            <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center text-ngo-dark">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            </div>
          )}
          {toast.type === 'error' && (
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </div>
          )}
          {toast.msg}
        </div>
      )}
    </>
  );
};

export default App;
