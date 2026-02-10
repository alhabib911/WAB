import React from 'react';
import Hero from '../components/Hero';
import DonationTracker from '../components/DonationTracker';
import Jobs from '../components/Jobs';

interface HomeProps {
  setRoute: (route: string) => void;
}

const Home: React.FC<HomeProps> = ({ setRoute }) => {
  return (
    <>
      <Hero setRoute={setRoute} />
      
      {/* Restored Donation Tracker section */}
      <DonationTracker setRoute={setRoute} />
      
      {/* Quick Info / Call to Action Banner */}
      <section className="bg-ngo-blue py-16 text-center px-4 relative z-20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            স্বেচ্ছাসেবক হিসেবে যোগ দিন
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            আপনার সময় এবং দক্ষতা দিয়ে সমাজের অবহেলিত মানুষের পাশে দাঁড়ান। আমাদের সাথে যুক্ত হয়ে পরিবর্তন আনুন নিজের হাতে।
          </p>
          <button className="bg-white text-ngo-blue hover:bg-slate-50 font-bold px-8 py-4 rounded-full text-lg shadow-xl transition-transform hover:-translate-y-1">
            রেজিস্ট্রেশন করুন
          </button>
        </div>
      </section>

      <Jobs />
    </>
  );
};

export default Home;
