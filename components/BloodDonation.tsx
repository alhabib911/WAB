import React, { useState } from 'react';

// --- MOCK DATA ---

// Dependent Locations Data
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

// Mock Blood Requests with Extended Info
const initialRequests = [
  { id: 1, group: 'O+', location: 'ঢাকা মেডিকেল কলেজ, ঢাকা', time: 'আজ বিকাল ৫টার মধ্যে', phone1: '01711-123456', phone2: '01811-654321', problem: 'ডেঙ্গু জ্বর, জরুরি ভিত্তিতে প্লাটিলেট প্রয়োজন', urgent: true },
  { id: 2, group: 'AB-', location: 'চমেক হাসপাতাল, চট্টগ্রাম', time: 'আগামীকাল সকাল ৯টা', phone1: '01811-987654', phone2: '01511-123789', problem: 'সিজারিয়ান অপারেশন', urgent: false },
  { id: 3, group: 'B+', location: 'রাজশাহী মেডিকেল কলেজ', time: 'আজ রাত ৮টার মধ্যে', phone1: '01911-456123', phone2: '01611-789456', problem: 'সড়ক দুর্ঘটনায় প্রচুর রক্তক্ষরণ হয়েছে', urgent: true },
  { id: 4, group: 'A+', location: 'ইবনে সিনা হাসপাতাল, সিলেট', time: 'আগামীকাল দুপুর ১২টা', phone1: '01611-321654', phone2: '', problem: 'থ্যালাসেমিয়া রোগীর জন্য নিয়মিত রক্ত প্রয়োজন', urgent: false },
  { id: 5, group: 'O-', location: 'স্কয়ার হাসপাতাল, ঢাকা', time: 'আগামীকাল সন্ধ্যা ৬টা', phone1: '01722-112233', phone2: '01922-334455', problem: 'ওপেন হার্ট সার্জারি', urgent: true },
];

// Mock Donors for Search Results
const mockDonors = [
  { id: 101, name: "রহিম শেখ", phone: "01711-XXXXXX", email: "rahim@email.com", group: "A+", lastDonation: "১২ মে, ২০২৩" },
  { id: 102, name: "করিম মিয়া", phone: "01811-XXXXXX", email: "karim@email.com", group: "O+", lastDonation: "১০ আগস্ট, ২০২৩" },
  { id: 103, name: "ফাতেমা আক্তার", phone: "01911-XXXXXX", email: "fatema@email.com", group: "B+", lastDonation: "১ জানুয়ারি, ২০২৪" },
  { id: 104, name: "ইমরান খান", phone: "01611-XXXXXX", email: "imran@email.com", group: "AB+", lastDonation: "এখনো রক্ত দেননি" },
  { id: 105, name: "আরিফ হোসেন", phone: "01511-XXXXXX", email: "arif@email.com", group: "O-", lastDonation: "১৫ নভেম্বর, ২০২৩" },
];

const BloodDonation: React.FC = () => {
  // Form States
  const [selectedDiv, setSelectedDiv] = useState('');
  const [selectedDist, setSelectedDist] = useState('');
  const [selectedThana, setSelectedThana] = useState('');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');

  // Modal States
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showRegModal, setShowRegModal] = useState(false);
  const [showAllReqModal, setShowAllReqModal] = useState(false);
  const [showNewReqModal, setShowNewReqModal] = useState(false);
  const [selectedReq, setSelectedReq] = useState<any>(null); // For Contact Details Modal

  // Derived Dropdown Options
  const divisions = Object.keys(bdLocations);
  const districts = selectedDiv ? Object.keys(bdLocations[selectedDiv]) : [];
  const thanas = selectedDist && selectedDiv ? bdLocations[selectedDiv][selectedDist] : [];

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDiv(e.target.value);
    setSelectedDist('');
    setSelectedThana('');
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDist(e.target.value);
    setSelectedThana('');
  };

  const handleSearch = () => {
    setShowSearchResults(true);
  };

  // UI Helper for Modal Overlay
  const ModalOverlay: React.FC<{ children: React.ReactNode; onClose: () => void }> = ({ children, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div className="absolute inset-0 cursor-pointer" onClick={onClose}></div>
      <div className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {children}
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-red-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-red-200/50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-red-200/40 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md text-red-500 mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 mb-4">
            রক্তদান: <span className="text-red-600">জীবন বাঁচান</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            জরুরী রক্তের প্রয়োজনে সহজেই রক্তদাতা খুঁজুন অথবা নিজেই রক্তদাতা হিসেবে আমাদের সাথে যুক্ত হোন।
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Search Form */}
          <div className="w-full lg:w-4/12 bg-white rounded-3xl p-6 shadow-xl border border-red-100 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-red-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                রক্তদাতা খুঁজুন
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">রক্তের গ্রুপ</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 focus:outline-none focus:border-red-400 focus:bg-white text-slate-700 font-medium"
                    value={selectedBloodGroup}
                    onChange={(e) => setSelectedBloodGroup(e.target.value)}
                  >
                    <option value="">সব গ্রুপ</option>
                    <option value="A+">A+</option> <option value="A-">A-</option>
                    <option value="B+">B+</option> <option value="B-">B-</option>
                    <option value="O+">O+</option> <option value="O-">O-</option>
                    <option value="AB+">AB+</option> <option value="AB-">AB-</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">বিভাগ</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 focus:outline-none focus:border-red-400 focus:bg-white text-slate-700 font-medium"
                    value={selectedDiv}
                    onChange={handleDivisionChange}
                  >
                    <option value="">বিভাগ নির্বাচন করুন</option>
                    {divisions.map(div => <option key={div} value={div}>{div}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">জেলা</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 focus:outline-none focus:border-red-400 focus:bg-white text-slate-700 font-medium disabled:opacity-50"
                    value={selectedDist}
                    onChange={handleDistrictChange}
                    disabled={!selectedDiv}
                  >
                    <option value="">জেলা নির্বাচন করুন</option>
                    {districts.map(dist => <option key={dist} value={dist}>{dist}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">উপজেলা/থানা</label>
                  <select 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 focus:outline-none focus:border-red-400 focus:bg-white text-slate-700 font-medium disabled:opacity-50"
                    value={selectedThana}
                    onChange={(e) => setSelectedThana(e.target.value)}
                    disabled={!selectedDist}
                  >
                    <option value="">উপজেলা/থানা নির্বাচন করুন</option>
                    {thanas.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <button 
                  onClick={handleSearch}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl text-lg shadow-lg shadow-red-500/30 transition-transform active:scale-95 mt-4"
                >
                  অনুসন্ধান করুন
                </button>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-600 mb-3">মানুষের প্রয়োজনে পাশে দাঁড়ান</p>
              <button 
                onClick={() => setShowRegModal(true)}
                className="w-full border-2 border-red-500 text-red-600 hover:bg-red-50 font-bold py-3 rounded-xl transition-colors"
              >
                রক্তদাতা হিসেবে নিবন্ধন করুন
              </button>
            </div>
          </div>

          {/* Right Column: Emergency Requests Feed */}
          <div className="w-full lg:w-8/12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
                জরুরী রক্তের প্রয়োজন
              </h3>
              <div className="flex gap-3 w-full sm:w-auto">
                <button 
                  onClick={() => setShowNewReqModal(true)}
                  className="flex-1 sm:flex-none text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 px-4 py-2.5 rounded-xl transition-colors text-center"
                >
                  রক্তের রিকোয়েস্ট দিন
                </button>
                <button 
                  onClick={() => setShowAllReqModal(true)}
                  className="flex-1 sm:flex-none text-sm font-bold text-red-600 bg-red-100 hover:bg-red-200 px-4 py-2.5 rounded-xl transition-colors text-center"
                >
                  সব রিকোয়েস্ট দেখুন
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {initialRequests.slice(0, 4).map((req) => (
                <div key={req.id} className="bg-white p-5 rounded-2xl shadow-sm border border-red-50 hover:shadow-md hover:border-red-200 transition-all flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-14 h-14 shrink-0 rounded-2xl bg-red-50 text-red-600 font-extrabold text-xl flex items-center justify-center border border-red-100">
                        {req.group}
                      </div>
                      {req.urgent && (
                        <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2.5 py-1 rounded-full animate-pulse">খুব জরুরী</span>
                      )}
                    </div>
                    
                    <h4 className="font-bold text-slate-800 mb-1 line-clamp-1" title={req.location}>{req.location}</h4>
                    <p className="text-xs text-slate-500 mb-3 line-clamp-2" title={req.problem}>{req.problem}</p>
                    
                    <div className="text-xs text-slate-600 font-medium flex items-center gap-1.5 mb-4 bg-slate-50 p-2 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-slate-400"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {req.time}
                    </div>
                  </div>

                  <button 
                    onClick={() => setSelectedReq(req)}
                    className="w-full px-4 py-2.5 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white border border-red-100 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.265-3.965-6.861-6.861l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                    বিস্তারিত ও যোগাযোগ
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MODALS */}

      {/* 1. Search Results Modal */}
      {showSearchResults && (
        <ModalOverlay onClose={() => setShowSearchResults(false)}>
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h3 className="font-bold text-xl text-slate-800">রক্তদাতার তালিকা</h3>
            <button onClick={() => setShowSearchResults(false)} className="p-1 rounded-full hover:bg-slate-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="overflow-y-auto p-0">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead className="bg-slate-100/90 sticky top-0 text-xs uppercase font-bold text-slate-500">
                <tr>
                  <th className="px-5 py-3 border-b">রক্তদাতা</th>
                  <th className="px-5 py-3 border-b">ব্লাড গ্রুপ</th>
                  <th className="px-5 py-3 border-b">যোগাযোগ</th>
                  <th className="px-5 py-3 border-b">শেষ রক্তদান</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockDonors.map(donor => (
                  <tr key={donor.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4 font-bold text-slate-800">{donor.name}</td>
                    <td className="px-5 py-4">
                      <span className="bg-red-100 text-red-600 px-2 py-1 rounded font-extrabold text-sm">{donor.group}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">
                      <div>{donor.phone}</div>
                      <div className="text-xs text-slate-400">{donor.email}</div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500 font-medium">
                      {donor.lastDonation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ModalOverlay>
      )}

      {/* 2. Donor Registration Modal */}
      {showRegModal && (
        <ModalOverlay onClose={() => setShowRegModal(false)}>
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h3 className="font-bold text-xl text-slate-800">রক্তদাতা নিবন্ধন ফর্ম</h3>
            <button onClick={() => setShowRegModal(false)} className="p-1 rounded-full hover:bg-slate-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="p-6 overflow-y-auto">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">আপনার নাম</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 focus:outline-none focus:border-red-400" placeholder="সম্পূর্ণ নাম" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">রক্তের গ্রুপ</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 focus:outline-none focus:border-red-400" required>
                    <option value="">নির্বাচন করুন</option>
                    <option value="A+">A+</option><option value="A-">A-</option>
                    <option value="B+">B+</option><option value="B-">B-</option>
                    <option value="O+">O+</option><option value="O-">O-</option>
                    <option value="AB+">AB+</option><option value="AB-">AB-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">ফোন নম্বর</label>
                  <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 focus:outline-none focus:border-red-400" placeholder="01XXXXXXXXX" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">ইমেইল (ঐচ্ছিক)</label>
                  <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 focus:outline-none focus:border-red-400" placeholder="example@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">বর্তমান ঠিকানা (জেলা)</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 focus:outline-none focus:border-red-400" placeholder="যেমন: ঢাকা" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">সর্বশেষ রক্তদানের তারিখ</label>
                  <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 focus:outline-none focus:border-red-400" />
                  <p className="text-[10px] text-slate-400 mt-1">আগে রক্ত না দিয়ে থাকলে খালি রাখুন</p>
                </div>
              </div>
              <button type="button" onClick={() => setShowRegModal(false)} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl text-lg mt-6">
                নিবন্ধন সম্পন্ন করুন
              </button>
            </form>
          </div>
        </ModalOverlay>
      )}

      {/* 3. New Blood Request Modal */}
      {showNewReqModal && (
        <ModalOverlay onClose={() => setShowNewReqModal(false)}>
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h3 className="font-bold text-xl text-slate-800">রক্তের জন্য আবেদন করুন</h3>
            <button onClick={() => setShowNewReqModal(false)} className="p-1 rounded-full hover:bg-slate-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="p-6 overflow-y-auto">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-1">রোগীর সমস্যা / কেন রক্ত প্রয়োজন?</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 focus:outline-none focus:border-red-400" placeholder="যেমন: ডেঙ্গু জ্বর, সিজারিয়ান অপারেশন" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">রক্তের গ্রুপ</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 focus:outline-none focus:border-red-400" required>
                    <option value="">নির্বাচন করুন</option>
                    <option value="A+">A+</option><option value="A-">A-</option>
                    <option value="B+">B+</option><option value="B-">B-</option>
                    <option value="O+">O+</option><option value="O-">O-</option>
                    <option value="AB+">AB+</option><option value="AB-">AB-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">রক্তের পরিমাণ (ব্যাগ)</label>
                  <input type="number" min="1" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 focus:outline-none focus:border-red-400" placeholder="১" required />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-1">হাসপাতালের নাম ও সম্পূর্ণ ঠিকানা</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 focus:outline-none focus:border-red-400" placeholder="যেমন: ঢাকা মেডিকেল কলেজ হাসপাতাল, ঢাকা" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">কখন রক্ত লাগবে? (তারিখ ও সময়)</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 focus:outline-none focus:border-red-400" placeholder="যেমন: আজ বিকাল ৫টার মধ্যে" required />
                </div>
                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-2 cursor-pointer p-3 border border-red-200 rounded-lg bg-red-50 text-sm font-bold text-red-700">
                    <input type="checkbox" className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500" />
                    অবস্থা কি খুব জরুরী?
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">যোগাযোগের নম্বর ১</label>
                  <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 focus:outline-none focus:border-red-400" placeholder="01XXXXXXXXX" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">যোগাযোগের নম্বর ২ (ঐচ্ছিক)</label>
                  <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-3 focus:outline-none focus:border-red-400" placeholder="01XXXXXXXXX" />
                </div>
              </div>
              <button type="button" onClick={() => setShowNewReqModal(false)} className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3.5 rounded-xl text-lg mt-6 shadow-lg shadow-slate-900/20">
                রিকোয়েস্ট সাবমিট করুন
              </button>
            </form>
          </div>
        </ModalOverlay>
      )}

      {/* 4. All Requests Modal */}
      {showAllReqModal && (
        <ModalOverlay onClose={() => setShowAllReqModal(false)}>
          <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h3 className="font-bold text-xl text-slate-800">সব রক্তের রিকোয়েস্ট</h3>
            <button onClick={() => setShowAllReqModal(false)} className="p-1 rounded-full hover:bg-slate-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="p-4 overflow-y-auto space-y-4 bg-slate-100/50">
            {initialRequests.map((req) => (
              <div key={req.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-red-50 text-red-600 font-extrabold text-xl flex items-center justify-center border border-red-100">
                    {req.group}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-slate-800 line-clamp-1">{req.location}</span>
                      {req.urgent && <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">খুব জরুরী</span>}
                    </div>
                    <div className="text-sm text-slate-500 line-clamp-1 mb-1">{req.problem}</div>
                    <div className="text-xs font-medium text-slate-400 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {req.time}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setShowAllReqModal(false);
                    setSelectedReq(req);
                  }}
                  className="w-full md:w-auto px-5 py-2.5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-100 rounded-xl font-bold transition-colors shrink-0 text-sm"
                >
                  বিস্তারিত
                </button>
              </div>
            ))}
          </div>
        </ModalOverlay>
      )}

      {/* 5. Contact / Request Details Modal */}
      {selectedReq && (
        <ModalOverlay onClose={() => setSelectedReq(null)}>
          <div className="relative">
            {/* Header Area */}
            <div className="bg-red-600 p-8 text-center text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <button onClick={() => setSelectedReq(null)} className="absolute top-4 right-4 p-1 rounded-full bg-black/10 hover:bg-black/20 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              
              <div className="w-20 h-20 bg-white text-red-600 rounded-2xl mx-auto flex items-center justify-center text-4xl font-extrabold shadow-lg mb-4">
                {selectedReq.group}
              </div>
              <h3 className="font-bold text-2xl mb-1">রক্ত প্রয়োজন</h3>
              {selectedReq.urgent && <span className="inline-block bg-white text-red-600 text-xs font-bold px-3 py-1 rounded-full mt-2 animate-pulse shadow-md">অত্যন্ত জরুরী</span>}
            </div>

            {/* Content Area */}
            <div className="p-6 md:p-8 space-y-6">
              
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">রোগীর সমস্যা</h4>
                <p className="text-lg font-bold text-slate-800">{selectedReq.problem}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-4 items-start">
                  <div className="mt-1 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">স্থান / হাসপাতাল</h4>
                    <p className="font-bold text-slate-700 leading-tight">{selectedReq.location}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="mt-1 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">কখন লাগবে?</h4>
                    <p className="font-bold text-slate-700 leading-tight">{selectedReq.time}</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-3">যোগাযোগের নম্বর</h4>
                <div className="flex flex-col gap-3">
                  <a href={`tel:${selectedReq.phone1}`} className="flex items-center justify-between bg-white p-3 rounded-xl border border-red-100 hover:border-red-300 transition-colors group">
                    <span className="font-extrabold text-lg text-slate-800 tracking-wide">{selectedReq.phone1}</span>
                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.265-3.965-6.861-6.861l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                    </div>
                  </a>
                  {selectedReq.phone2 && (
                    <a href={`tel:${selectedReq.phone2}`} className="flex items-center justify-between bg-white p-3 rounded-xl border border-red-100 hover:border-red-300 transition-colors group">
                      <span className="font-extrabold text-lg text-slate-800 tracking-wide">{selectedReq.phone2}</span>
                      <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.265-3.965-6.861-6.861l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ModalOverlay>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}} />
    </section>
  );
};

export default BloodDonation;
