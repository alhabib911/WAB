import React, { useState, useEffect } from 'react';

// --- COMPREHENSIVE BD LOCATIONS DATA ---
const bdLocations: Record<string, Record<string, string[]>> = {
  "ঢাকা": {
    "ঢাকা": ["সাভার", "ধানমন্ডি", "মিরপুর", "মোহাম্মদপুর", "উত্তরা", "গুলশান", "তেজগাঁও", "মতিঝিল"],
    "গাজীপুর": ["টঙ্গী", "কালিয়াকৈর", "শ্রীপুর", "গাজীপুর সদর", "কাপাসিয়া"],
    "নারায়ণগঞ্জ": ["ফতুল্লা", "সিদ্ধিরগঞ্জ", "রূপগঞ্জ", "সোনারগাঁও", "আড়াইহাজার"],
    "টাঙ্গাইল": ["টাঙ্গাইল সদর", "সখীপুর", "বাসাইল", "ঘাটাইল", "কালিহাতী"],
    "কিশোরগঞ্জ": ["কিশোরগঞ্জ সদর", "ভৈরব", "বাজিতপুর", "কটিয়াদী"],
    "মানিকগঞ্জ": ["মানিকগঞ্জ সদর", "সিংগাইর", "শিবালয়"],
    "মুন্সিগঞ্জ": ["মুন্সিগঞ্জ সদর", "শ্রীনগর", "সিরাজদিখান", "লৌহজং"],
    "নরসিংদী": ["নরসিংদী সদর", "শিবপুর", "রায়পুরা", "পলাশ"],
    "ফরিদপুর": ["ফরিদপুর সদর", "বোয়ালমারী", "ভাঙ্গা"],
    "মাদারীপুর": ["মাদারীপুর সদর", "শিবচর", "কালকিনি"],
    "রাজবাড়ী": ["রাজবাড়ী সদর", "গোয়ালন্দ", "পাংশা"],
    "শরীয়তপুর": ["শরীয়তপুর সদর", "জাজিরা", "নড়িয়া"],
    "গোপালগঞ্জ": ["গোপালগঞ্জ সদর", "টুঙ্গিপাড়া", "কোটালিপাড়া"]
  },
  "চট্টগ্রাম": {
    "চট্টগ্রাম": ["কোতোয়ালী", "পতেঙ্গা", "হালিশহর", "সীতাকুণ্ড", "মিরসরাই", "হাটহাজারী", "পটিয়া"],
    "কক্সবাজার": ["কক্সবাজার সদর", "উখিয়া", "টেকনাফ", "রামু", "চকরিয়া"],
    "রাঙ্গামাটি": ["রাঙ্গামাটি সদর", "কাপ্তাই", "বাঘাইছড়ি"],
    "বান্দরবান": ["বান্দরবান সদর", "থানচি", "রুমা", "লামা"],
    "খাগড়াছড়ি": ["খাগড়াছড়ি সদর", "দীঘিনালা", "মাটিরাঙ্গা"],
    "ফেনী": ["ফেনী সদর", "ছাগলনাইয়া", "দাগনভূঞা"],
    "লক্ষ্মীপুর": ["লক্ষ্মীপুর সদর", "রামগতি", "রায়পুর"],
    "কুমিল্লা": ["কুমিল্লা আদর্শ সদর", "লাকসাম", "দাউদকান্দি", "চৌদ্দগ্রাম", "বরুড়া"],
    "নোয়াখালী": ["নোয়াখালী সদর", "বেগমগঞ্জ", "চাটখিল", "কোম্পানীগঞ্জ"],
    "ব্রাহ্মণবাড়িয়া": ["ব্রাহ্মণবাড়িয়া সদর", "আশুগঞ্জ", "কসবা", "নবীনগর"],
    "চাঁদপুর": ["চাঁদপুর সদর", "হাজীগঞ্জ", "মতলব", "ফরিদগঞ্জ"]
  },
  "রাজশাহী": {
    "রাজশাহী": ["বোয়ালিয়া", "মতিহার", "গোদাগাড়ী", "তানোর", "বাঘমারা", "চারঘাট"],
    "সিরাজগঞ্জ": ["সিরাজগঞ্জ সদর", "শাহজাদপুর", "বেলকুচি", "উল্লাপাড়া"],
    "পাবনা": ["পাবনা সদর", "ঈশ্বরদী", "সাঁথিয়া", "সুজানগর"],
    "বগুড়া": ["বগুড়া সদর", "শাজাহানপুর", "শেরপুর", "শিবগঞ্জ"],
    "নাটোর": ["নাটোর সদর", "সিংড়া", "বড়াইগ্রাম", "গুরুদাসপুর"],
    "জয়পুরহাট": ["জয়পুরহাট সদর", "পাঁচবিবি", "কালাই"],
    "চাঁপাইনবাবগঞ্জ": ["চাঁপাইনবাবগঞ্জ সদর", "শিবগঞ্জ", "গোমস্তাপুর"],
    "নওগাঁ": ["নওগাঁ সদর", "পত্নীতলা", "মহাদেবপুর", "মান্দা"]
  },
  "খুলনা": {
    "খুলনা": ["সোনাডাঙ্গা", "খালিশপুর", "ডুমুরিয়া", "বটিয়াঘাটা", "রূপসা", "কয়রা"],
    "যশোর": ["যশোর সদর", "অভয়নগর", "মনিরামপুর", "ঝিকরগাছা"],
    "সাতক্ষীরা": ["সাতক্ষীরা সদর", "তালা", "শ্যামনগর", "আশাশুনি"],
    "মেহেরপুর": ["মেহেরপুর সদর", "গাংনী", "মুজিবনগর"],
    "নড়াইল": ["নড়াইল সদর", "লোহাগড়া", "কালিয়া"],
    "চুয়াডাঙ্গা": ["চুয়াডাঙ্গা সদর", "আলমডাঙ্গা", "দামুড়হুদা"],
    "কুষ্টিয়া": ["কুষ্টিয়া সদর", "কুমারখালী", "ভেড়ামারা", "মিরপুর"],
    "মাগুরা": ["মাগুরা সদর", "শ্রীপুর", "মহম্মদপুর"],
    "বাগেরহাট": ["বাগেরহাট সদর", "ফকিরহাট", "মোংলা", "মোরেলগঞ্জ"],
    "ঝিনাইদহ": ["ঝিনাইদহ সদর", "শৈলকুপা", "কালীগঞ্জ"]
  },
  "বরিশাল": {
    "বরিশাল": ["বরিশাল সদর", "বাকেরগঞ্জ", "উজিরপুর", "বানারীপাড়া"],
    "ঝালকাঠি": ["ঝালকাঠি সদর", "নলছিটি", "রাজাপুর"],
    "পটুয়াখালী": ["পটুয়াখালী সদর", "বাউফল", "গলাচিপা", "দশমিনা"],
    "পিরোজপুর": ["পিরোজপুর সদর", "ভান্ডারিয়া", "মঠবাড়ীয়া"],
    "ভোলা": ["ভোলা সদর", "দৌলতখান", "বোরহানউদ্দিন", "চরফ্যাশন"],
    "বরগুনা": ["বরগুনা সদর", "আমতলী", "পাথরঘাটা"]
  },
  "সিলেট": {
    "সিলেট": ["সিলেট সদর", "জৈন্তাপুর", "গোয়াইনঘাট", "কানাইঘাট", "জকিগঞ্জ", "বিয়ানীবাজার"],
    "মৌলভীবাজার": ["মৌলভীবাজার সদর", "শ্রীমঙ্গল", "কুলাউড়া", "বড়লেখা"],
    "হবিগঞ্জ": ["হবিগঞ্জ সদর", "নবীগঞ্জ", "মাধবপুর", "চুনারুঘাট"],
    "সুনামগঞ্জ": ["সুনামগঞ্জ সদর", "কোম্পানীগঞ্জ", "ছাতক", "তাহিরপুর", "দিরাই"]
  },
  "রংপুর": {
    "রংপুর": ["রংপুর সদর", "পীরগঞ্জ", "বদরগঞ্জ", "মিঠাপুকুর", "গংগাচড়া"],
    "পঞ্চগড়": ["পঞ্চগড় সদর", "তেঁতুলিয়া", "বোদা", "দেবীগঞ্জ"],
    "দিনাজপুর": ["দিনাজপুর সদর", "বীরগঞ্জ", "নবাবগঞ্জ", "বিরামপুর"],
    "লালমনিরহাট": ["লালমনিরহাট সদর", "হাতীবান্ধা", "কালীগঞ্জ"],
    "নীলফামারী": ["নীলফামারী সদর", "সৈয়দপুর", "জলঢাকা", "ডোমার"],
    "গাইবান্ধা": ["গাইবান্ধা সদর", "গোবিন্দগঞ্জ", "পলাশবাড়ী"],
    "ঠাকুরগাঁও": ["ঠাকুরগাঁও সদর", "পীরগঞ্জ", "বালিয়াডাঙ্গী"],
    "কুড়িগ্রাম": ["কুড়িগ্রাম সদর", "উলিপুর", "নাগেশ্বরী", "ভুরুঙ্গামারী"]
  },
  "ময়মনসিংহ": {
    "ময়মনসিংহ": ["ময়মনসিংহ সদর", "ত্রিশাল", "ভালুকা", "মুক্তাগাছা", "ফুলবাড়ীয়া"],
    "শেরপুর": ["শেরপুর সদর", "নকলা", "নালিতাবাড়ী", "ঝিনাইগাতী"],
    "জামালপুর": ["জামালপুর সদর", "বকশীগঞ্জ", "মাদারগঞ্জ", "মেলান্দহ"],
    "নেত্রকোনা": ["নেত্রকোনা সদর", "কেন্দুয়া", "মোহনগঞ্জ", "পূর্বধলা"]
  }
};

const Volunteer: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('userRole'));
  }, []);

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', bloodGroup: '', nid: '', division: '', district: '', thana: '', profession: ''
  });

  const divisions = Object.keys(bdLocations);
  const districts = formData.division ? Object.keys(bdLocations[formData.division] || {}) : [];
  const thanas = formData.district && formData.division ? bdLocations[formData.division][formData.district] || [] : [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'division') setFormData({ ...formData, division: value, district: '', thana: '' });
    else if (name === 'district') setFormData({ ...formData, district: value, thana: '' });
    else setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      window.showToast('আবেদন সাবমিট করতে অনুগ্রহ করে আগে লগইন করুন।', 'error');
      return;
    }

    const newVolunteer = { id: Date.now().toString(), ...formData, status: 'Active' };
    const existing = JSON.parse(localStorage.getItem('volunteers') || '[]');
    localStorage.setItem('volunteers', JSON.stringify([newVolunteer, ...existing]));

    window.showToast('ধন্যবাদ! আপনি সফলভাবে স্বেচ্ছাসেবক হিসেবে নিবন্ধিত হয়েছেন।');
    setFormData({ name: '', email: '', phone: '', bloodGroup: '', nid: '', division: '', district: '', thana: '', profession: '' });
  };

  return (
    <section className="bg-ngo-dark py-24 px-4 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="w-full lg:w-5/12 text-white text-center lg:text-left">
            <span className="inline-block py-1 px-4 rounded-full bg-white/10 border border-white/20 text-blue-200 font-extrabold text-xs tracking-widest mb-6 uppercase animate-slide-up">
              আমাদের সাথে যুক্ত হোন
            </span>
            <h2 className="text-2xl md:text-4xl font-black mb-6 leading-tight animate-slide-up" style={{ animationDelay: '0.1s' }}>
              স্বেচ্ছাসেবক হিসেবে যোগ দিন
            </h2>
            <p className="text-slate-300 text-lg mb-10 leading-relaxed font-medium animate-slide-up" style={{ animationDelay: '0.2s' }}>
              আপনার সময় এবং দক্ষতা দিয়ে সমাজের অবহেলিত মানুষের পাশে দাঁড়ান। আমাদের সাথে যুক্ত হয়ে পরিবর্তন আনুন নিজের হাতে।
            </p>
            <div className="hidden lg:grid grid-cols-2 gap-6 mt-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
                <div className="text-4xl font-black mb-1 text-white">৫০+</div>
                <div className="text-blue-200 text-sm font-bold uppercase tracking-wider">জেলায় কার্যক্রম</div>
              </div>
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
                <div className="text-4xl font-black mb-1 text-white">৫০০+</div>
                <div className="text-blue-200 text-sm font-bold uppercase tracking-wider">ভলান্টিয়ার</div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-7/12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl relative">
              <h3 className="font-black text-3xl text-slate-800 mb-8 border-b-2 border-slate-100 pb-4">নিবন্ধন ফর্ম</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-extrabold text-slate-700 mb-2">পূর্ণ নাম</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3.5 px-4 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors font-medium text-slate-800" required />
                  </div>
                  <div>
                    <label className="block text-sm font-extrabold text-slate-700 mb-2">পেশা</label>
                    <input type="text" name="profession" value={formData.profession} onChange={handleInputChange} placeholder="যেমন: শিক্ষার্থী, শিক্ষক" className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3.5 px-4 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors font-medium text-slate-800" required />
                  </div>
                  <div>
                    <label className="block text-sm font-extrabold text-slate-700 mb-2">ইমেইল</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3.5 px-4 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors font-medium text-slate-800" required />
                  </div>
                  <div>
                    <label className="block text-sm font-extrabold text-slate-700 mb-2">মোবাইল নম্বর</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3.5 px-4 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors font-medium text-slate-800" required />
                  </div>
                  <div>
                    <label className="block text-sm font-extrabold text-slate-700 mb-2">রক্তের গ্রুপ</label>
                    <select name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange} className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3.5 px-4 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors cursor-pointer font-bold text-slate-800" required>
                      <option value="">নির্বাচন করুন</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-extrabold text-slate-700 mb-2">NID নম্বর</label>
                    <input type="text" name="nid" value={formData.nid} onChange={handleInputChange} className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3.5 px-4 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors font-medium text-slate-800" required />
                  </div>
                  
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6 border-t-2 border-slate-100 pt-6 mt-2">
                    <div>
                      <label className="block text-sm font-extrabold text-slate-700 mb-2">বিভাগ</label>
                      <select name="division" value={formData.division} onChange={handleInputChange} className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3.5 px-4 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors cursor-pointer font-medium" required>
                        <option value="">নির্বাচন করুন</option>
                        {divisions.map(div => <option key={div} value={div}>{div}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-extrabold text-slate-700 mb-2">জেলা</label>
                      <select name="district" value={formData.district} onChange={handleInputChange} className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3.5 px-4 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors cursor-pointer disabled:opacity-50 font-medium" disabled={!formData.division} required>
                        <option value="">নির্বাচন করুন</option>
                        {districts.map(dist => <option key={dist} value={dist}>{dist}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-extrabold text-slate-700 mb-2">থানা</label>
                      <select name="thana" value={formData.thana} onChange={handleInputChange} className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3.5 px-4 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors cursor-pointer disabled:opacity-50 font-medium" disabled={!formData.district} required>
                        <option value="">নির্বাচন করুন</option>
                        {thanas.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4.5 rounded-xl text-lg mt-8 shadow-xl shadow-blue-600/30 transition-all hover:-translate-y-1 block leading-none" style={{paddingTop: '18px', paddingBottom: '18px'}}>
                  আবেদন সাবমিট করুন
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Volunteer;