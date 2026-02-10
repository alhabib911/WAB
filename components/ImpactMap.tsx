import React, { useState } from 'react';
import { ImpactLocation, Donor } from '../types';

// Helper to generate some dummy donors
const generateDonors = (count: number): Donor[] => {
  const names = ['রহিম শেখ', 'করিম মিয়া', 'আয়েশা বেগম', 'ফাতেমা আক্তার', 'জব্বার আলী', 'তাসনিয়া হক', 'ইমরান খান', 'শফিকুল ইসলাম'];
  const methods = ['bKash', 'Nagad', 'Rocket', 'Bank Transfer', 'Card'];
  const amounts = [500, 1000, 2000, 5000, 10000];
  
  return Array.from({ length: count }).map((_, i) => ({
    id: `donor-${i}`,
    name: names[Math.floor(Math.random() * names.length)],
    amount: amounts[Math.floor(Math.random() * amounts.length)],
    method: methods[Math.floor(Math.random() * methods.length)],
  }));
};

// Updated data with donation-specific fields, benefited counts and mock donors
const locations: ImpactLocation[] = [
  {
    id: 'loc-1',
    name: 'কুড়িগ্রাম',
    x: 35,
    y: 20,
    title: 'বন্যা পুনর্বাসন কেন্দ্র',
    description: '২০২৩ সালের বন্যায় ক্ষতিগ্রস্ত ৫০০টি পরিবারকে নতুন ঘর নির্মাণ ও কৃষিকাজে সহায়তা প্রদানের জন্য এই জরুরি তহবিল সংগ্রহ চলছে।',
    imageUrl: 'https://picsum.photos/id/111/400/300',
    donationGoal: 1500000,
    raisedAmount: 950000,
    donorCount: 450,
    benefitedCount: 2500,
    donors: generateDonors(12)
  },
  {
    id: 'loc-2',
    name: 'সাতক্ষীরা',
    x: 25,
    y: 70,
    title: 'বিশুদ্ধ পানীয় জল প্রকল্প',
    description: 'উপকূলীয় অঞ্চলে লবণাক্ততা দূর করে ১০টি গ্রামে সোলার পাম্প স্থাপনের মাধ্যমে বিশুদ্ধ খাবার পানির ব্যবস্থা করতে আমাদের অনুদান প্রয়োজন।',
    imageUrl: 'https://picsum.photos/id/119/400/300',
    donationGoal: 800000,
    raisedAmount: 200000,
    donorCount: 120,
    benefitedCount: 12000,
    donors: generateDonors(8)
  },
  {
    id: 'loc-3',
    name: 'ঢাকা (কড়াইল)',
    x: 55,
    y: 50,
    title: 'বস্তিবাসী শিশুদের স্কুল',
    description: 'পথশিশু এবং বস্তির শিশুদের জন্য অবৈতনিক প্রাথমিক শিক্ষা এবং পুষ্টিকর বিকালের নাস্তার ব্যবস্থা চালু রাখার জন্য এই ফাণ্ড ব্যবহৃত হবে।',
    imageUrl: 'https://picsum.photos/id/22/400/300',
    donationGoal: 500000,
    raisedAmount: 420000,
    donorCount: 890,
    benefitedCount: 350,
    donors: generateDonors(15)
  },
  {
    id: 'loc-4',
    name: 'বান্দরবান',
    x: 80,
    y: 80,
    title: 'মেডিকেল ক্যাম্প',
    description: 'দুর্গম পাহাড়ি এলাকায় আদিবাসীদের জন্য বিনামূল্যে স্বাস্থ্য পরীক্ষা ও ওষুধ বিতরণের জন্য একটি অ্যাম্বুলেন্স কেনার উদ্যোগ।',
    imageUrl: 'https://picsum.photos/id/33/400/300',
    donationGoal: 2500000,
    raisedAmount: 1100000,
    donorCount: 310,
    benefitedCount: 4500,
    donors: generateDonors(10)
  },
  {
    id: 'loc-5',
    name: 'সিলেট',
    x: 75,
    y: 35,
    title: 'নারী উদ্যোক্তা উন্নয়ন',
    description: 'হস্তশিল্প ও সেলাই প্রশিক্ষণের মাধ্যমে চা শ্রমিক নারীদের বিকল্প আয়ের ব্যবস্থা করতে সেলাই মেশিন ও প্রশিক্ষণ ফাণ্ড।',
    imageUrl: 'https://picsum.photos/id/44/400/300',
    donationGoal: 300000,
    raisedAmount: 280000,
    donorCount: 85,
    benefitedCount: 150,
    donors: generateDonors(6)
  }
];

const ImpactMap: React.FC = () => {
  const [activeLoc, setActiveLoc] = useState<ImpactLocation>(locations[2]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0,
    }).format(amount).replace('BDT', '৳');
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('bn-BD').format(num);
  };

  const goal = activeLoc.donationGoal;
  const raised = activeLoc.raisedAmount;
  const remaining = goal - raised;
  const percentage = Math.round((raised / goal) * 100);

  return (
    <section id="impact" className="py-24 bg-slate-50 border-t border-slate-100 relative">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-ngo-blue uppercase tracking-widest mb-2">প্রজেক্টসমূহ ও তহবিল</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-ngo-dark mb-4">
            যেখানে প্রয়োজন, <span className="text-ngo-green">সেখানেই আমরা</span>
          </h3>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            সারাদেশে আমাদের চলমান বিভিন্ন প্রজেক্টের অবস্থা ও তহবিলের পরিমাণ ম্যাপ থেকে দেখে নিন। আপনার পছন্দের প্রজেক্টে সরাসরি অনুদান দিন।
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-center">
          {/* Map Area - 1/2 width */}
          <div className="w-full lg:w-1/2 max-w-md bg-white rounded-3xl p-6 shadow-sm border border-slate-200 relative">
            <div className="aspect-[4/5] bg-blue-50/50 rounded-2xl relative overflow-hidden border border-blue-100 flex items-center justify-center">
              {/* Abstract Map Background Pattern */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(#2563eb 2px, transparent 2px)',
                backgroundSize: '20px 20px'
              }}></div>
              
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-[90%] h-[90%] fill-ngo-blue">
                   <path d="M40,10 L60,10 L70,30 L90,40 L80,70 L90,90 L60,100 L40,90 L20,100 L10,70 L20,40 L10,20 Z" />
                </svg>
              </div>

              {/* Map Pins */}
              {locations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setActiveLoc(loc)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-10"
                  style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                >
                  <div className={`relative flex items-center justify-center transition-transform duration-300 ${activeLoc.id === loc.id ? 'scale-125 z-20' : 'hover:scale-110 z-10'}`}>
                    {activeLoc.id === loc.id && (
                      <span className="absolute w-12 h-12 rounded-full bg-ngo-green/20 animate-ping"></span>
                    )}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shadow-md border-2 transition-colors ${
                      activeLoc.id === loc.id 
                        ? 'bg-ngo-green border-white text-white' 
                        : 'bg-white border-ngo-blue text-ngo-blue group-hover:bg-blue-50'
                    }`}>
                      <div className="w-2 h-2 rounded-full bg-current"></div>
                    </div>
                  </div>
                  <span className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 rounded text-xs font-bold whitespace-nowrap transition-opacity ${
                    activeLoc.id === loc.id ? 'opacity-100 bg-ngo-dark text-white' : 'opacity-0 group-hover:opacity-100 bg-white text-slate-700 shadow-sm'
                  }`}>
                    {loc.name}
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-4 text-xs md:text-sm text-slate-500 font-medium">
              <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-ngo-green"></span> নির্বাচিত অঞ্চল</span>
            </div>
          </div>

          {/* Donation Data Panel - Smaller Card */}
          <div className="w-full lg:w-1/2 max-w-md">
            <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 transition-all duration-500">
              {/* Image Section - Reduced Height */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={activeLoc.imageUrl} 
                  alt={activeLoc.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-bold text-ngo-dark shadow-md flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-ngo-orange">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  {activeLoc.name}
                </div>
              </div>
              
              {/* Content Section - Tighter Padding */}
              <div className="p-6">
                <h4 className="text-2xl font-extrabold text-ngo-dark mb-2">{activeLoc.title}</h4>
                <p className="text-slate-600 mb-5 text-sm leading-relaxed">
                  {activeLoc.description}
                </p>
                
                {/* Benefited People & Donors Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {/* Benefited People */}
                  <div className="bg-green-50/70 border border-green-100 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-ngo-green mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                      </svg>
                    </div>
                    <div className="text-xl font-extrabold text-ngo-dark leading-none mb-1">
                      {formatNumber(activeLoc.benefitedCount)} জন
                    </div>
                    <div className="text-xs font-bold text-slate-500">উপকৃত মানুষ</div>
                  </div>
                  
                  {/* Total Donors */}
                  <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                    <div className="flex -space-x-2 mb-2">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-10 h-10 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center overflow-hidden shadow-sm">
                          <img src={`https://i.pravatar.cc/100?img=${i + activeLoc.donorCount % 20}`} alt="avatar" />
                        </div>
                      ))}
                    </div>
                    <div className="text-xl font-extrabold text-ngo-dark leading-none mb-1">
                      {formatNumber(activeLoc.donorCount)} জন
                    </div>
                    <div className="text-xs font-bold text-slate-500">মোট ডোনার</div>
                  </div>
                </div>
                
                {/* Donation Metrics Box - Compact */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-5 relative overflow-hidden">
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <div className="text-xs font-bold text-slate-500 mb-0.5">লক্ষ্যমাত্রা</div>
                      <div className="text-lg font-extrabold text-ngo-dark">{formatCurrency(goal)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-500 mb-0.5">বাকি আছে</div>
                      <div className="text-lg font-bold text-ngo-orange">{formatCurrency(remaining)}</div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden mb-2">
                    <div 
                      className="bg-ngo-green h-2.5 rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-ngo-green">সংগৃহীত: {formatCurrency(raised)}</span>
                    <span className="bg-green-100 text-green-800 px-1.5 py-0.5 rounded">{percentage}% সম্পন্ন</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button className="flex-1 bg-ngo-orange hover:bg-orange-600 text-white font-bold py-3 rounded-xl text-sm shadow-md shadow-orange-500/20 transition-transform active:scale-95 text-center">
                    দান করুন
                  </button>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex-1 border-2 border-slate-200 text-slate-700 hover:border-ngo-blue hover:text-ngo-blue font-bold py-3 rounded-xl text-sm transition-colors text-center"
                  >
                    ডোনার লিস্ট দেখুন
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donors Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[85vh] overflow-hidden transform transition-all">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="font-bold text-xl text-ngo-dark">সাম্প্রতিক অনুদানকারী</h3>
                <p className="text-xs text-slate-500 mt-1">{activeLoc.title} প্রজেক্ট</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center hover:bg-red-100 hover:text-red-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Modal Body (Scrollable Table) */}
            <div className="p-0 overflow-y-auto">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-slate-100/90 backdrop-blur-sm text-xs uppercase font-bold text-slate-500">
                  <tr>
                    <th className="px-5 py-3 border-b border-slate-200">ডোনারের নাম</th>
                    <th className="px-5 py-3 border-b border-slate-200">পরিমাণ</th>
                    <th className="px-5 py-3 border-b border-slate-200">পেমেন্ট মাধ্যম</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {activeLoc.donors.map((donor, idx) => (
                    <tr key={donor.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4 font-medium text-ngo-dark flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-ngo-blue flex items-center justify-center text-xs font-bold uppercase">
                          {donor.name.charAt(0)}
                        </div>
                        {donor.name}
                      </td>
                      <td className="px-5 py-4 font-bold text-ngo-green">
                        {formatCurrency(donor.amount)}
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600 flex items-center gap-2">
                        {/* Fake icon based on method */}
                        {donor.method.toLowerCase().includes('card') ? (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-slate-400"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-slate-400"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>
                        )}
                        {donor.method}
                      </td>
                    </tr>
                  ))}
                  {/* Show summary if list is long (fake simulation) */}
                  <tr>
                     <td colSpan={3} className="px-5 py-4 text-center text-sm text-slate-500 italic bg-slate-50">
                        আরও {activeLoc.donorCount - activeLoc.donors.length} জন ডোনারের তালিকা গুপ্ত রাখা হয়েছে।
                     </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Basic Keyframe for Modal Animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}} />
    </section>
  );
};

export default ImpactMap;