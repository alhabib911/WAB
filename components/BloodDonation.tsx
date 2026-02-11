import React, { useState, useEffect } from 'react';

// Enhanced Locations Data with 64 Districts
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
    "পাবনা": ["পাবনা সদর", " ঈশ্বরদী", "সাঁথিয়া", "সুজানগর"],
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

const defaultInitialRequests = [
  { id: 1, group: 'O+', location: 'ঢাকা মেডিকেল কলেজ, ঢাকা', time: 'আজ বিকাল ৫টার মধ্যে', phone1: '01711-123456', phone2: '01811-654321', problem: 'ডেঙ্গু জ্বর, জরুরি ভিত্তিতে প্লাটিলেট প্রয়োজন', urgent: true, patient: 'সালামত উল্লাহ', responses: 2, bookedAt: '12-Oct-2023' },
  { id: 2, group: 'AB-', location: 'চমেক হাসপাতাল, চট্টগ্রাম', time: 'আগামীকাল সকাল ৯টা', phone1: '01811-987654', phone2: '01511-123789', problem: 'সিজারিয়ান অপারেশন', urgent: false, patient: 'রোজিনা আক্তার', responses: 0, bookedAt: '15-Oct-2023' },
];

const mockDonors = [
  { id: '101', name: "রহিম শেখ", phone: "01711111111", email: "rahim@email.com", group: "A+", lastDonation: "১২ মে, ২০২৩", address: "ঢাকা, ধানমন্ডি", division: "ঢাকা", district: "ঢাকা", thana: "ধানমন্ডি" },
  { id: '102', name: "আয়েশা বেগম", phone: "01822222222", email: "ayesha@email.com", group: "O+", lastDonation: "১ জানু, ২০২৪", address: "চট্টগ্রাম, হালিশহর", division: "চট্টগ্রাম", district: "চট্টগ্রাম", thana: "হালিশহর" },
];

// Extracted ModalOverlay to prevent remounting and losing focus on inputs
const ModalOverlay: React.FC<{ children: React.ReactNode; onClose: () => void }> = ({ children, onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
    <div className="absolute inset-0 cursor-pointer" onClick={onClose}></div>
    <div className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
      {children}
    </div>
  </div>
);

const BloodDonation: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  
  const [captionText, setCaptionText] = useState('জরুরী রক্তের প্রয়োজনে সহজেই রক্তদাতা খুঁজুন অথবা নিজেই রক্তদাতা হিসেবে আমাদের সাথে যুক্ত হোন।');
  
  const [requests, setRequests] = useState<any[]>([]);
  const [myBookings, setMyBookings] = useState<any[]>([]);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role) {
      setIsLoggedIn(true);
      setUserName(role === 'User' ? 'ইউজার' : role); // Default mock name
    }

    const settings = JSON.parse(localStorage.getItem('siteSettings') || '{}');
    if (settings.blood && settings.blood.caption) setCaptionText(settings.blood.caption);

    const savedReqs = JSON.parse(localStorage.getItem('bloodRequests') || '[]');
    if (savedReqs.length > 0) setRequests(savedReqs);
    else {
      setRequests(defaultInitialRequests);
      localStorage.setItem('bloodRequests', JSON.stringify(defaultInitialRequests));
    }

    setMyBookings(JSON.parse(localStorage.getItem('myBloodBookings') || '[]'));
  }, []);

  // Search State
  const [selectedDiv, setSelectedDiv] = useState('');
  const [selectedDist, setSelectedDist] = useState('');
  const [selectedThana, setSelectedThana] = useState('');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  
  const searchDivisions = Object.keys(bdLocations);
  const searchDistricts = selectedDiv ? Object.keys(bdLocations[selectedDiv] || {}) : [];
  const searchThanas = selectedDist && selectedDiv ? bdLocations[selectedDiv][selectedDist] || [] : [];

  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = () => {
    const localDonors = JSON.parse(localStorage.getItem('registeredDonors') || '[]');
    const allDonors = [...localDonors, ...mockDonors];
    
    const filtered = allDonors.filter(d => {
      const matchDiv = selectedDiv ? d.division === selectedDiv : true;
      const matchDist = selectedDist ? d.district === selectedDist : true;
      const matchThana = selectedThana ? d.thana === selectedThana : true;
      const matchBG = selectedBloodGroup ? d.group === selectedBloodGroup : true;
      return matchDiv && matchDist && matchThana && matchBG;
    });

    if(filtered.length === 0) {
       window.showToast('দুঃখিত, আপনার কাঙ্ক্ষিত এলাকায় কোনো রক্তদাতা পাওয়া যায়নি।', 'error');
    } else {
       setSearchResults(filtered);
       setShowSearchResults(true);
    }
  };

  // Reg Form State
  const [regDiv, setRegDiv] = useState('');
  const [regDist, setRegDist] = useState('');
  const [regThana, setRegThana] = useState('');
  
  const regDistricts = regDiv ? Object.keys(bdLocations[regDiv] || {}) : [];
  const regThanas = regDist && regDiv ? bdLocations[regDiv][regDist] || [] : [];

  const handleRegSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!isLoggedIn) return;

    const fd = new FormData(e.target as HTMLFormElement);
    const newDonor = {
      id: Date.now().toString(),
      name: fd.get('name'),
      group: fd.get('group'),
      phone: fd.get('phone'),
      email: fd.get('email') || '',
      division: regDiv,
      district: regDist,
      thana: regThana,
      lastDonation: fd.get('lastDonation') || 'এখনো রক্ত দেননি',
      address: `${regThana}, ${regDist}, ${regDiv}`
    };

    const existing = JSON.parse(localStorage.getItem('registeredDonors') || '[]');
    localStorage.setItem('registeredDonors', JSON.stringify([newDonor, ...existing]));

    window.showToast('ধন্যবাদ! আপনি সফলভাবে রক্তদাতা হিসেবে নিবন্ধিত হয়েছেন।');
    (e.target as HTMLFormElement).reset();
    setRegDiv(''); setRegDist(''); setRegThana('');
  };

  // Urgent Request Form
  const [showNewReqModal, setShowNewReqModal] = useState(false);
  const [selectedReq, setSelectedReq] = useState<any>(null);

  const handleReqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    
    const newReq = {
      id: Date.now(),
      problem: fd.get('problem'),
      group: fd.get('group'),
      location: fd.get('location'),
      time: fd.get('time'),
      urgent: fd.get('urgent') === 'on',
      phone1: fd.get('phone1'),
      phone2: fd.get('phone2'),
      patient: fd.get('patient') || 'অজ্ঞাত',
      responses: 0,
      bookedAt: new Date().toLocaleDateString('bn-BD')
    };

    const updatedReqs = [newReq, ...requests];
    setRequests(updatedReqs);
    localStorage.setItem('bloodRequests', JSON.stringify(updatedReqs));

    window.showToast('আপনার রক্তের রিকোয়েস্ট সফলভাবে সাবমিট হয়েছে।');
    setShowNewReqModal(false);
  };

  const handleContactResponse = (req: any) => {
    if(!isLoggedIn) {
       window.showToast('যোগাযোগ করতে অনুগ্রহ করে লগইন করুন।', 'error');
       return;
    }
    
    // Add to specific user's responded bookings (shows up in dashboard)
    const existing = JSON.parse(localStorage.getItem('myBloodBookings') || '[]');
    const newBooking = { 
      id: Date.now().toString(), 
      ...req, 
      respondedAt: new Date().toLocaleDateString('bn-BD') 
    };
    localStorage.setItem('myBloodBookings', JSON.stringify([newBooking, ...existing]));
    
    setMyBookings([...myBookings, newBooking]);

    // Increment response count globally
    const updatedReqs = requests.map(r => r.id === req.id ? { ...r, responses: (r.responses || 0) + 1 } : r);
    setRequests(updatedReqs);
    localStorage.setItem('bloodRequests', JSON.stringify(updatedReqs));

    window.showToast('যোগাযোগ করার জন্য ধন্যবাদ! রোগীর পক্ষ থেকে আপনাকে কৃতজ্ঞতা।');
    
    // Auto-close modal after successful contact
    setTimeout(() => setSelectedReq(null), 1000);
  };

  const handleShare = async (req: any) => {
    const text = `জরুরী রক্তের প্রয়োজন!\nগ্রুপ: ${req.group}\nহাসপাতাল: ${req.location}\nসময়: ${req.time}\nযোগাযোগ: ${req.phone1}`;
    if (navigator.share) {
      try { await navigator.share({ title: 'রক্তের আবেদন', text: text, url: window.location.href }); } catch (err) {}
    } else {
      navigator.clipboard.writeText(`${text}\nLink: ${window.location.href}`);
      window.showToast('আবেদনের তথ্য কপি করা হয়েছে!', 'info');
    }
  };

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-100/40 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg shadow-red-500/10 text-red-500 mx-auto mb-6 transform hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-6 tracking-tight">
            রক্তদান: <span className="text-red-600">জীবন বাঁচান</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            {captionText}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 mb-20">
          {/* Left Form: Search */}
          <div className="w-full lg:w-4/12 bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col h-fit">
            <h3 className="text-2xl font-extrabold text-slate-800 mb-8 flex items-center gap-3 border-b border-slate-100 pb-4">
              <span className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
              </span>
              রক্তদাতা খুঁজুন
            </h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-extrabold text-slate-700 mb-2">রক্তের গ্রুপ</label>
                <select className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-red-400 font-bold text-slate-700 cursor-pointer" value={selectedBloodGroup} onChange={(e) => setSelectedBloodGroup(e.target.value)}>
                  <option value="">সব গ্রুপ</option><option value="A+">A+</option><option value="A-">A-</option><option value="B+">B+</option><option value="B-">B-</option><option value="O+">O+</option><option value="O-">O-</option><option value="AB+">AB+</option><option value="AB-">AB-</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-extrabold text-slate-700 mb-2">বিভাগ</label>
                <select className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-red-400 font-bold text-slate-700 cursor-pointer" value={selectedDiv} onChange={(e) => { setSelectedDiv(e.target.value); setSelectedDist(''); setSelectedThana(''); }}>
                  <option value="">বিভাগ নির্বাচন করুন</option>
                  {searchDivisions.map(div => <option key={div} value={div}>{div}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-extrabold text-slate-700 mb-2">জেলা</label>
                <select className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-red-400 font-bold text-slate-700 cursor-pointer disabled:opacity-50" value={selectedDist} onChange={(e) => { setSelectedDist(e.target.value); setSelectedThana(''); }} disabled={!selectedDiv}>
                  <option value="">জেলা নির্বাচন করুন</option>
                  {searchDistricts.map(dist => <option key={dist} value={dist}>{dist}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-extrabold text-slate-700 mb-2">উপজেলা/থানা</label>
                <select className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-red-400 font-bold text-slate-700 cursor-pointer disabled:opacity-50" value={selectedThana} onChange={(e) => setSelectedThana(e.target.value)} disabled={!selectedDist}>
                  <option value="">থানা নির্বাচন করুন</option>
                  {searchThanas.map(th => <option key={th} value={th}>{th}</option>)}
                </select>
              </div>
              <button onClick={handleSearch} className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-extrabold py-4 rounded-xl text-lg shadow-lg shadow-red-500/30 transition-all hover:-translate-y-1 mt-4">
                অনুসন্ধান করুন
              </button>
            </div>
          </div>

          <div className="w-full lg:w-8/12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-slate-200 pb-4">
              <h3 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                </span>
                জরুরী রক্তের প্রয়োজন
              </h3>
              <button onClick={() => setShowNewReqModal(true)} className="w-full sm:w-auto text-sm font-bold text-white bg-slate-800 hover:bg-slate-900 px-6 py-3 rounded-xl transition-all shadow-md">
                রক্তের রিকোয়েস্ট দিন
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {requests.slice(0, 4).map((req) => (
                <div key={req.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-red-200 transition-all flex flex-col justify-between h-full group">
                  <div>
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 text-red-600 font-black text-2xl flex items-center justify-center border border-red-200 shadow-sm group-hover:scale-105 transition-transform">
                        {req.group}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {req.urgent && <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full animate-pulse shadow-md">খুব জরুরী</span>}
                        <span className="text-xs font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">সাড়া: {req.responses || 0}</span>
                      </div>
                    </div>
                    
                    <h4 className="font-extrabold text-lg text-slate-800 mb-2 line-clamp-1">{req.location}</h4>
                    <p className="text-sm font-medium text-slate-500 mb-4 line-clamp-2">{req.problem}</p>
                    
                    <div className="text-xs font-bold text-slate-600 flex items-center gap-2 mb-6 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-red-400"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {req.time}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => setSelectedReq(req)} className="flex-1 px-4 py-3 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white border border-red-100 hover:border-red-600 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-sm">
                      বিস্তারিত
                    </button>
                    <button onClick={() => handleShare(req)} className="w-12 shrink-0 flex items-center justify-center bg-slate-50 hover:bg-slate-200 text-slate-600 border border-slate-200 rounded-xl transition-colors" title="Share">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- 2 Column Blood Donor Registration Section --- */}
        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col md:flex-row border border-slate-100 mt-10 relative">
           {!isLoggedIn && (
              <div className="absolute inset-0 z-20 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                 <div className="bg-slate-900 text-white font-bold px-8 py-4 rounded-xl shadow-2xl flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
                    রক্তদাতা হিসেবে নিবন্ধন করতে লগইন করুন
                 </div>
              </div>
           )}
           
           <div className="w-full md:w-5/12 bg-gradient-to-br from-red-600 to-red-700 p-10 md:p-14 text-white flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-20 -mt-20"></div>
              <div className="relative z-10">
                 <h3 className="text-3xl font-black mb-4 leading-tight">রক্তদাতা হিসেবে নিবন্ধন করুন</h3>
                 <p className="text-red-100 font-medium mb-8 leading-relaxed">আপনার দেওয়া এক ব্যাগ রক্ত বাঁচাতে পারে একটি মুমূর্ষু রোগীর প্রাণ। আমাদের বিশাল রক্তদাতা পরিবারের অংশ হোন।</p>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 border border-white/20 p-4 rounded-2xl backdrop-blur-sm">
                       <div className="text-3xl font-black mb-1 text-white">২৫০০+</div>
                       <div className="text-xs font-bold text-red-200 uppercase tracking-widest">মোট ডোনার</div>
                    </div>
                    <div className="bg-white/10 border border-white/20 p-4 rounded-2xl backdrop-blur-sm">
                       <div className="text-3xl font-black mb-1 text-white">১২০০+</div>
                       <div className="text-xs font-bold text-red-200 uppercase tracking-widest">সফল রক্তদান</div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="w-full md:w-7/12 p-8 md:p-12 relative z-10 bg-slate-50">
             <form onSubmit={handleRegSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-extrabold text-slate-700 mb-2">আপনার নাম</label>
                  <input type="text" name="name" defaultValue={userName} required className="w-full border-2 border-slate-200 rounded-xl p-3.5 focus:border-red-400 focus:ring-0 outline-none transition-colors font-bold bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-extrabold text-slate-700 mb-2">রক্তের গ্রুপ</label>
                  <select name="group" required className="w-full border-2 border-slate-200 rounded-xl p-3.5 focus:border-red-400 outline-none transition-colors font-extrabold text-red-600 bg-white cursor-pointer">
                    <option value="">নির্বাচন করুন</option>
                    <option value="A+">A+</option><option value="A-">A-</option><option value="B+">B+</option><option value="B-">B-</option><option value="O+">O+</option><option value="O-">O-</option><option value="AB+">AB+</option><option value="AB-">AB-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-extrabold text-slate-700 mb-2">ফোন নম্বর</label>
                  <input type="tel" name="phone" required className="w-full border-2 border-slate-200 rounded-xl p-3.5 focus:border-red-400 outline-none transition-colors font-bold bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-extrabold text-slate-700 mb-2">বিভাগ</label>
                  <select required value={regDiv} onChange={(e) => { setRegDiv(e.target.value); setRegDist(''); setRegThana(''); }} className="w-full border-2 border-slate-200 rounded-xl p-3.5 focus:border-red-400 outline-none bg-white cursor-pointer font-bold">
                    <option value="">বিভাগ</option>
                    {Object.keys(bdLocations).map(div => <option key={div} value={div}>{div}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-extrabold text-slate-700 mb-2">জেলা</label>
                  <select required value={regDist} onChange={(e) => { setRegDist(e.target.value); setRegThana(''); }} disabled={!regDiv} className="w-full border-2 border-slate-200 rounded-xl p-3.5 focus:border-red-400 outline-none bg-white disabled:opacity-50 cursor-pointer font-bold">
                    <option value="">জেলা</option>
                    {regDistricts.map(dist => <option key={dist} value={dist}>{dist}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-extrabold text-slate-700 mb-2">থানা</label>
                    <select required value={regThana} onChange={(e) => setRegThana(e.target.value)} disabled={!regDist} className="w-full border-2 border-slate-200 rounded-xl p-3.5 focus:border-red-400 outline-none bg-white disabled:opacity-50 cursor-pointer font-bold">
                      <option value="">থানা</option>
                      {regThanas.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-extrabold text-slate-700 mb-2">সর্বশেষ রক্তদানের তারিখ</label>
                    <input type="date" name="lastDonation" className="w-full border-2 border-slate-200 rounded-xl p-3.5 focus:border-red-400 outline-none bg-white font-bold text-slate-600" />
                  </div>
                </div>

                <div className="md:col-span-2 mt-4">
                  <button type="submit" disabled={!isLoggedIn} className="w-full bg-slate-800 text-white font-extrabold py-4 px-10 rounded-xl hover:bg-slate-900 transition-all shadow-lg hover:-translate-y-1">
                    তথ্য সাবমিট করুন
                  </button>
                </div>
             </form>
           </div>
        </div>
      </div>

      {/* --- MODALS --- */}
      
      {/* Search Results Modal */}
      {showSearchResults && (
        <ModalOverlay onClose={() => setShowSearchResults(false)}>
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <div>
              <h3 className="font-extrabold text-xl text-slate-800">রক্তদাতা তালিকা</h3>
              <p className="text-xs text-slate-500 mt-1">আপনার সার্চকৃত এলাকার ডোনারগণ</p>
            </div>
            <button onClick={() => setShowSearchResults(false)} className="p-2 rounded-full hover:bg-slate-200 text-slate-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="overflow-y-auto p-0">
             <table className="w-full text-left border-collapse">
                <thead className="bg-slate-100 text-xs uppercase text-slate-500 font-bold sticky top-0">
                   <tr>
                      <th className="px-6 py-3 border-b border-slate-200">নাম</th>
                      <th className="px-6 py-3 border-b border-slate-200">গ্রুপ</th>
                      <th className="px-6 py-3 border-b border-slate-200">এলাকা</th>
                      <th className="px-6 py-3 border-b border-slate-200 text-right">যোগাযোগ</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                   {searchResults.map((d:any) => (
                      <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                         <td className="px-6 py-4 font-bold text-slate-700">{d.name}</td>
                         <td className="px-6 py-4"><span className="bg-red-50 text-red-600 font-black px-2 py-1 border border-red-100 rounded-lg">{d.group}</span></td>
                         <td className="px-6 py-4 font-medium text-slate-500">{d.thana}, {d.district}</td>
                         <td className="px-6 py-4 text-right">
                           <a href={`tel:${d.phone}`} className="inline-block bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-200 font-bold px-4 py-1.5 rounded-lg transition-colors text-sm">
                             কল করুন
                           </a>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </ModalOverlay>
      )}

      {/* New Request Modal */}
      {showNewReqModal && (
        <ModalOverlay onClose={() => setShowNewReqModal(false)}>
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h3 className="font-extrabold text-xl text-slate-800">নতুন রক্তের রিকোয়েস্ট</h3>
            <button onClick={() => setShowNewReqModal(false)} className="p-2 rounded-full hover:bg-slate-200 text-slate-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="p-6 md:p-8 overflow-y-auto">
             <form onSubmit={handleReqSubmit} className="space-y-5">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">রোগীর নাম (ঐচ্ছিক)</label>
                    <input type="text" name="patient" className="w-full border-2 border-slate-200 rounded-xl p-3 outline-none focus:border-red-400 bg-slate-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">রক্তের গ্রুপ</label>
                    <select name="group" required className="w-full border-2 border-slate-200 rounded-xl p-3 outline-none focus:border-red-400 font-bold text-red-600 bg-slate-50">
                      <option value="">নির্বাচন করুন</option>
                      <option value="A+">A+</option><option value="A-">A-</option><option value="B+">B+</option><option value="B-">B-</option><option value="O+">O+</option><option value="O-">O-</option><option value="AB+">AB+</option><option value="AB-">AB-</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">রোগীর সমস্যা</label>
                    <input type="text" name="problem" required placeholder="যেমন: সিজারিয়ান অপারেশন" className="w-full border-2 border-slate-200 rounded-xl p-3 outline-none focus:border-red-400 bg-slate-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">কখন লাগবে? (সময়)</label>
                    <input type="text" name="time" required placeholder="যেমন: আজ রাত ৮টা" className="w-full border-2 border-slate-200 rounded-xl p-3 outline-none focus:border-red-400 bg-slate-50" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">হাসপাতাল ও ঠিকানা</label>
                    <input type="text" name="location" required className="w-full border-2 border-slate-200 rounded-xl p-3 outline-none focus:border-red-400 bg-slate-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">ফোন নম্বর ১</label>
                    <input type="tel" name="phone1" required className="w-full border-2 border-slate-200 rounded-xl p-3 outline-none focus:border-red-400 bg-slate-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">ফোন নম্বর ২ (ঐচ্ছিক)</label>
                    <input type="tel" name="phone2" className="w-full border-2 border-slate-200 rounded-xl p-3 outline-none focus:border-red-400 bg-slate-50" />
                  </div>
                  <div className="md:col-span-2 flex items-center gap-3 bg-red-50 p-4 rounded-xl border border-red-100 mt-2">
                    <input type="checkbox" name="urgent" id="urgent" className="w-5 h-5 accent-red-600 cursor-pointer" />
                    <label htmlFor="urgent" className="text-red-700 font-bold cursor-pointer">এটি অত্যন্ত জরুরী একটি রিকোয়েস্ট</label>
                  </div>
               </div>
               <button type="submit" className="w-full bg-slate-800 text-white font-extrabold py-4 rounded-xl shadow-lg mt-4 hover:bg-slate-900 transition-colors">
                  রিকোয়েস্ট পোস্ট করুন
               </button>
             </form>
          </div>
        </ModalOverlay>
      )}

      {/* Request Details Modal */}
      {selectedReq && (
        <ModalOverlay onClose={() => setSelectedReq(null)}>
          <div className="bg-red-600 p-8 text-white relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <button onClick={() => setSelectedReq(null)} className="absolute top-6 right-6 w-10 h-10 bg-black/20 hover:bg-black/30 rounded-full flex items-center justify-center text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h3 className="text-3xl font-extrabold mb-2">রোগীর বিস্তারিত তথ্য</h3>
            <p className="text-red-100 font-medium">রক্ত দিয়ে একটি জীবন বাঁচাতে সাহায্য করুন</p>
          </div>
          
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50">
            <div className="space-y-6">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">রোগীর নাম</div>
                <div className="text-xl font-extrabold text-slate-800">{selectedReq.patient}</div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">সমস্যা</div>
                <div className="text-lg font-bold text-slate-700">{selectedReq.problem}</div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">হাসপাতাল</div>
                <div className="text-lg font-bold text-slate-700 flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mt-0.5 text-slate-400"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                  {selectedReq.location}
                </div>
              </div>
            </div>
            
            <div className="space-y-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              {myBookings.some((b:any) => b.id === selectedReq.id) && (
                <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-md border-2 border-white">
                  আপনি সাড়া দিয়েছেন
                </div>
              )}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">রক্তের গ্রুপ</div>
                <div className="text-3xl font-black text-red-600">{selectedReq.group}</div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">সময়</div>
                <div className="text-lg font-bold text-slate-700 bg-red-50 text-red-700 px-3 py-1.5 rounded-lg inline-block">{selectedReq.time}</div>
              </div>
              
              <div className="pt-4 border-t border-slate-100">
                <button 
                   onClick={() => handleContactResponse(selectedReq)}
                   className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md transition-all text-center flex items-center justify-center gap-2"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.909-6.846-6.846l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                   সাড়া দিন ও যোগাযোগ করুন
                </button>
                <div className="mt-3 text-center">
                  <a href={`tel:${selectedReq.phone1}`} className="text-lg font-black text-slate-700 hover:text-blue-600">{selectedReq.phone1}</a>
                  {selectedReq.phone2 && (
                    <div className="text-sm font-bold text-slate-500 mt-1">বা <a href={`tel:${selectedReq.phone2}`} className="hover:text-blue-600">{selectedReq.phone2}</a></div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 bg-slate-100 text-center text-xs font-bold text-slate-400 border-t border-slate-200">
            পোস্ট করার তারিখ: {selectedReq.bookedAt || 'N/A'}
          </div>
        </ModalOverlay>
      )}
    </section>
  );
};

export default BloodDonation;
