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

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState('home');

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentRoute]);

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
      </main>

      <Footer setRoute={setCurrentRoute} />
    </div>
  );
};

export default App;
