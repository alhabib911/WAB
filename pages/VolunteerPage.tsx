import React from 'react';
import Volunteer from '../components/Volunteer';

const VolunteerPage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen pt-12 pb-20">
      <div className="container mx-auto px-4 max-w-4xl text-center mb-10">
        <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-ngo-blue font-bold text-sm tracking-widest mb-4">
          আমাদের টিমে স্বাগতম
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-ngo-dark mb-4">
          পরিবর্তনের কারিগর হোন
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
          একটি উন্নত সমাজ গঠনে আপনার মত উদ্যমী মানুষের প্রয়োজন। আমাদের সাথে স্বেচ্ছাসেবক হিসেবে যুক্ত হয়ে সরাসরি কাজ করার সুযোগ গ্রহণ করুন।
        </p>
      </div>

      {/* Render the core Volunteer form logic block */}
      <div className="rounded-3xl overflow-hidden mx-4 md:mx-auto max-w-5xl shadow-2xl">
        <Volunteer />
      </div>
    </div>
  );
};

export default VolunteerPage;
