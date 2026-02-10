import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Donate from './pages/Donate';
import OurWork from './pages/OurWork';

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
      </main>

      <Footer />
    </div>
  );
};

export default App;
