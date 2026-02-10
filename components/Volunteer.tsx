import React, { useState } from 'react';
import { Volunteer as VolunteerType } from '../types';

const bdLocations: Record<string, Record<string, string[]>> = {
  "ঢাকা": {
    "ঢাকা": ["ধানমন্ডি", "মিরপুর", "গুলশান", "উত্তরা", "মোহাম্মদপুর"],
    "গাজীপুর": ["টঙ্গী", "গাজীপুর সদর", "কালিয়াকৈর", "কাপাসিয়া"],
    "নারায়ণগঞ্জ": ["ফতুল্লা", "রূপগঞ্জ", "সোনারগাঁও", "বন্দর"]
  },
  "চট্টগ্রাম": {
    "চট্টগ্রাম": ["পতেঙ্গা", "হালিশহর", "খুলশী", "ডবলমুরিং", "পাহাড়তলী"],
    "কক্সবাজার": ["উখিয়া", "টেকনাফ", "রামু", "মহেশখালী"]
  },
  "রাজশাহী": {
    "রাজশাহী": ["বোয়ালিয়া", "রাজপাড়া", "মতিহার", "শাহ মখদুম"],
    "বগুড়া": ["বগুড়া সদর", "শাজাহানপুর", "শেরপুর"]
  },
  "সিলেট": {
    "সিলেট": ["সিলেট সদর", "দক্ষিণ সুরমা", "কোতোয়ালী"],
    "সুনামগঞ্জ": ["সুনামগঞ্জ সদর", "ছাতক", "তাহিরপুর"]
  }
};

const Volunteer: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bloodGroup: '',
    nid: '',
    division: '',
    district: '',
    thana: ''
  });

  const divisions = Object.keys(bdLocations);
  const districts = formData.division ? Object.keys(bdLocations[formData.division]) : [];
  const thanas = formData.district && formData.division ? bdLocations[formData.division][formData.district] : [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'division') {
      setFormData({ ...formData, division: value, district: '', thana: '' });
    } else if (name === 'district') {
      setFormData({ ...formData, district: value, thana: '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newVolunteer: VolunteerType = {
      id: Date.now().toString(),
      ...formData
    };

    // Save to Local Storage (Mock Database)
    const existing = JSON.parse(localStorage.getItem('volunteers') || '[]');
    localStorage.setItem('volunteers', JSON.stringify([...existing, newVolunteer]));

    setSuccessMsg('ধন্যবাদ! আপনি সফলভাবে স্বেচ্ছাসেবক হিসেবে নিবন্ধিত হয়েছেন।');
    
    // Reset form after 2 seconds and close
    setTimeout(() => {
      setSuccessMsg('');
      setShowModal(false);
      setFormData({ name: '', email: '', phone: '', bloodGroup: '', nid: '', division: '', district: '', thana: '' });
    }, 2000);
  };

  return (
    <>
      <section className="bg-ngo-blue py-16 text-center px-4 relative z-20">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            স্বেচ্ছাসেবক হিসেবে যোগ দিন
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            আপনার সময় এবং দক্ষতা দিয়ে সমাজের অবহেলিত মানুষের পাশে দাঁড়ান। আমাদের সাথে যুক্ত হয়ে পরিবর্তন আনুন নিজের হাতে।
          </p>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-white text-ngo-blue hover:bg-slate-50 font-bold px-8 py-4 rounded-full text-lg shadow-xl transition-transform hover:-translate-y-1"
          >
            রেজিস্ট্রেশন করুন
          </button>
        </div>
      </section>

      {/* Registration Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-xl text-slate-800">স্বেচ্ছাসেবক নিবন্ধন ফর্ম</h3>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-full hover:bg-slate-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              {successMsg ? (
                <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-xl text-center font-bold text-lg">
                  {successMsg}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">পূর্ণ নাম</label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 focus:outline-none focus:border-ngo-blue" required />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">ইমেইল</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 focus:outline-none focus:border-ngo-blue" required />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">মোবাইল নম্বর</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 focus:outline-none focus:border-ngo-blue" required />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">রক্তের গ্রুপ</label>
                      <select name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 focus:outline-none focus:border-ngo-blue" required>
                        <option value="">নির্বাচন করুন</option>
                        <option value="A+">A+</option><option value="A-">A-</option>
                        <option value="B+">B+</option><option value="B-">B-</option>
                        <option value="O+">O+</option><option value="O-">O-</option>
                        <option value="AB+">AB+</option><option value="AB-">AB-</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 mb-1">জাতীয় পরিচয়পত্র (NID) নম্বর</label>
                      <input type="text" name="nid" value={formData.nid} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 focus:outline-none focus:border-ngo-blue" required />
                    </div>
                    
                    {/* Location Selection */}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">বিভাগ</label>
                      <select name="division" value={formData.division} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 focus:outline-none focus:border-ngo-blue" required>
                        <option value="">নির্বাচন করুন</option>
                        {divisions.map(div => <option key={div} value={div}>{div}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">জেলা</label>
                      <select name="district" value={formData.district} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 focus:outline-none focus:border-ngo-blue" disabled={!formData.division} required>
                        <option value="">নির্বাচন করুন</option>
                        {districts.map(dist => <option key={dist} value={dist}>{dist}</option>)}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 mb-1">উপজেলা / থানা</label>
                      <select name="thana" value={formData.thana} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 focus:outline-none focus:border-ngo-blue" disabled={!formData.district} required>
                        <option value="">নির্বাচন করুন</option>
                        {thanas.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  
                  <button type="submit" className="w-full bg-ngo-blue hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-lg mt-6 shadow-lg shadow-blue-500/30">
                    আবেদন সাবমিট করুন
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

export default Volunteer;
