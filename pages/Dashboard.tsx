import React, { useState, useEffect } from 'react';
import { JobPost } from '../types';

type Role = 'Super Admin' | 'Moderator' | 'User';

interface DashboardProps {
  setRoute: (route: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setRoute }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentRole, setCurrentRole] = useState<Role>('Super Admin');
  const [langVersion, setLangVersion] = useState(0);

  useEffect(() => {
    const role = localStorage.getItem('userRole') as Role;
    if (role) setCurrentRole(role);
    
    const handleLangChange = () => setLangVersion(v => v + 1);
    window.addEventListener('languageChange', handleLangChange);
    return () => window.removeEventListener('languageChange', handleLangChange);
  }, []);

  const getSidebarLinks = () => {
    const t = window.t || ((b, e) => b);
    const links = [];
    if (currentRole === 'User') {
      return [
        { id: 'overview', label: t('ড্যাশবোর্ড ওভারভিউ', 'My Dashboard'), icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { id: 'donors', label: t('রক্তদান প্রোফাইল', 'Blood Donor Profile'), icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
        { id: 'badges', label: t('আমার অর্জন (Badges)', 'My Badges'), icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-1.82.261l1.313 5.485c.119.497-.406.896-.856.62L12 17.58a.563.563 0 00-.54 0l-4.796 2.766c-.45.276-.975-.123-.856-.62l1.313-5.485a.563.563 0 00-1.82-.261L1.107 10.385c-.38-.325-.178-.948.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z' },
        { id: 'careers', label: t('আমার পোস্ট করা জব', 'My Posted Jobs'), icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }
      ];
    }

    links.push(
      { id: 'overview', label: t('ড্যাশবোর্ড ওভারভিউ', 'Overview'), icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
      { id: 'campaigns', label: t('ক্যাম্পেইন', 'Campaigns'), icon: 'M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
      { id: 'blood', label: t('রক্তদান', 'Blood Donation'), icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
      { id: 'gallery', label: t('গ্যালারি', 'Gallery'), icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
      { id: 'volunteers', label: t('স্বেচ্ছাসেবক', 'Volunteers'), icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
      { id: 'careers', label: t('ক্যারিয়ার', 'Careers'), icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
      { id: 'newsletter', label: t('নিউজলেটার', 'Newsletter'), icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }
    );

    if (currentRole === 'Super Admin') {
      links.push(
        { id: 'admin-contact', label: t('অ্যাডমিন কন্টাক্ট', 'Admin Contact'), icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
        { id: 'roles', label: t('রোল ম্যানেজমেন্ট', 'Role Management'), icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
        { id: 'settings', label: t('সাইট সেটিংস', 'Site Settings'), icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
      );
    }
    return links;
  };

  useEffect(() => {
    if (currentRole === 'User' && !['overview', 'careers', 'donors', 'badges'].includes(activeTab)) setActiveTab('overview');
    if (currentRole === 'Moderator' && (activeTab === 'roles' || activeTab === 'settings' || activeTab === 'admin-contact')) setActiveTab('overview');
  }, [currentRole, activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    setRoute('login');
  };

  const t = window.t || ((b, e) => b);

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-gray-800 overflow-hidden">
      <aside className="w-64 border-r border-slate-200 flex flex-col bg-white shadow-sm z-20 shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-100 shrink-0">
          <div className="font-brand font-bold text-xl flex items-center gap-2 cursor-pointer" onClick={() => setRoute('home')}>
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">W</span>
            <span>{t('ড্যাশবোর্ড', 'Dashboard')}</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5 custom-scroll">
          {getSidebarLinks().map(link => (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[12px] font-bold transition-all duration-200 ${
                activeTab === link.id ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d={link.icon} />
              </svg>
              {link.label}
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-slate-100 space-y-2 shrink-0 bg-slate-50/50">
          <button onClick={() => setRoute('home')} className="w-full flex items-center gap-3 px-4 py-2.5 text-[12px] text-slate-600 hover:bg-white hover:shadow-sm rounded-xl font-bold transition-all border border-transparent hover:border-slate-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            {t('ওয়েবসাইটে ফিরুন', 'Back to Website')}
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-[12px] text-red-600 hover:bg-red-50 hover:shadow-sm rounded-xl font-bold transition-all border border-transparent hover:border-red-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>
            {t('লগআউট', 'Logout')}
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 border-b border-slate-200 flex items-center justify-between px-8 shrink-0 bg-white/80 backdrop-blur-md z-10 shadow-sm">
          <h1 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
            {getSidebarLinks().find(l => l.id === activeTab)?.label}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[12px] text-slate-600 bg-slate-100 border border-slate-200 rounded-full px-4 py-1.5 shadow-inner">
              <span className="font-medium">Role:</span>
              <select 
                value={currentRole} 
                onChange={(e) => {
                  const role = e.target.value as Role;
                  setCurrentRole(role);
                  localStorage.setItem('userRole', role);
                  window.showToast(`Role changed to ${role}`, 'info');
                }}
                className="bg-transparent border-none font-bold text-slate-900 focus:outline-none cursor-pointer"
              >
                <option value="Super Admin">Super Admin</option>
                <option value="Moderator">Moderator</option>
                <option value="User">User</option>
              </select>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white flex items-center justify-center font-bold shadow-md">
              {currentRole.charAt(0)}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 custom-scroll">
          <div className="max-w-6xl mx-auto pb-20">
             {activeTab === 'overview' && (currentRole === 'User' ? <UserOverviewTab /> : <AdminOverviewTab />)}
             {activeTab === 'settings' && <SiteSettingsTab />}
             {activeTab === 'roles' && <RoleManagementTab />}
             {activeTab === 'admin-contact' && <AdminContactTab />}
             {activeTab === 'campaigns' && <CampaignsTab />}
             {activeTab === 'blood' && <BloodDonationTab />}
             {activeTab === 'gallery' && <GalleryTab />}
             {activeTab === 'volunteers' && <VolunteersTab />}
             {activeTab === 'careers' && <CareersTab currentRole={currentRole} />}
             {activeTab === 'donors' && <UserDonorTab />}
             {activeTab === 'badges' && <UserBadgesTab />}
             {activeTab === 'newsletter' && <NewsletterTab />}
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scroll::-webkit-scrollbar { width: 8px; height: 8px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; border: 2px solid #f8fafc; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        
        .data-table { width: 100%; border-collapse: separate; border-spacing: 0; }
        .data-table th { background: #f1f5f9; font-weight: 700; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: #475569; padding: 16px; text-align: left; border-bottom: 2px solid #e2e8f0; }
        .data-table th:first-child { border-top-left-radius: 0.75rem; }
        .data-table th:last-child { border-top-right-radius: 0.75rem; }
        .data-table td { padding: 16px; font-size: 0.875rem; color: #334155; border-bottom: 1px solid #f1f5f9; background: white; transition: background 0.2s; }
        .data-table tr:hover td { background-color: #f8fafc; }
        .data-table tr:last-child td { border-bottom: none; }
        
        .btn-primary { background: #2563eb; color: white; padding: 10px 20px; border-radius: 0.75rem; font-weight: 700; font-size: 0.875rem; transition: all 0.2s; box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2); cursor: pointer; border:none; outline:none; }
        .btn-primary:hover { background: #1d4ed8; transform: translateY(-1px); }
        .btn-primary:active { transform: translateY(0); }
        
        .modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 1rem; animation: fadeIn 0.2s ease-out; }
        .modal-content { background: white; border-radius: 1.5rem; max-height: 90vh; overflow-y: auto; width: 100%; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); border: 1px solid #e2e8f0; }
        
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
      `}} />
    </div>
  );
};

// ---------------------------------------------------------------------------
// SUB-COMPONENTS (TABS)
// ---------------------------------------------------------------------------

const UserBadgesTab = () => {
  const t = window.t || ((b, e) => b);
  const [donations, setDonations] = useState<any[]>([]);
  const [bloodReqs, setBloodReqs] = useState<any[]>([]);

  useEffect(() => {
    setDonations(JSON.parse(localStorage.getItem('userDonations') || '[]'));
    setBloodReqs(JSON.parse(localStorage.getItem('myBloodBookings') || '[]'));
  }, []);

  const totalDonated = donations.reduce((sum, d) => sum + Number(d.amount), 0);

  const badges = [
    { id: 1, title: 'প্রথম অনুদান', desc: 'প্রথমবার অনুদান দিয়ে সমাজের পাশে দাঁড়িয়েছেন।', icon: '🌟', color: 'from-yellow-400 to-orange-500', achieved: donations.length > 0 },
    { id: 2, title: 'রৌপ্য দাতা', desc: 'মোট ৳৫,০০০ এর বেশি অনুদান দিয়েছেন।', icon: '🥈', color: 'from-slate-300 to-slate-500', achieved: totalDonated >= 5000 },
    { id: 3, title: 'স্বর্ণ দাতা', desc: 'মোট ৳১০,০০০ এর বেশি অনুদান দিয়েছেন।', icon: '🥇', color: 'from-yellow-300 to-yellow-600', achieved: totalDonated >= 10000 },
    { id: 4, title: 'রক্তদাতা হিরো', desc: 'অন্তত ১ বার রক্তদানে অংশ নিয়েছেন।', icon: '🩸', color: 'from-red-400 to-red-600', achieved: bloodReqs.length > 0 },
    { id: 5, title: 'সুপার ভলান্টিয়ার', desc: 'একাধিক কাজে নিজেকে নিয়োজিত করেছেন।', icon: '🛡️', color: 'from-blue-400 to-indigo-600', achieved: donations.length > 0 && bloodReqs.length > 0 },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-ngo-dark to-slate-800 rounded-3xl p-8 text-white shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold mb-2">{t('আপনার ডিজিটাল সার্টিফিকেট ও ব্যাজ', 'Your Digital Certificates & Badges')}</h2>
          <p className="text-slate-300">{t('মানুষের সেবায় আপনার অবদানের স্বীকৃতি স্বরূপ ഈ ব্যাজগুলো আনলক হয়েছে।', 'These badges are unlocked in recognition of your contribution to humanity.')}</p>
        </div>
        <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20">
          <span className="text-4xl">🏆</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map(b => (
          <div key={b.id} className={`relative p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center text-center ${b.achieved ? 'border-transparent bg-white shadow-lg shadow-slate-200/50 hover:-translate-y-1' : 'border-slate-200 bg-slate-50 grayscale opacity-60'}`}>
            <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl mb-4 shadow-inner bg-gradient-to-br ${b.color}`}>
              {b.icon}
            </div>
            <h3 className="text-xl font-extrabold text-slate-800 mb-2">{b.title}</h3>
            <p className="text-sm text-slate-600 font-medium">{b.desc}</p>
            
            {b.achieved && (
              <div className="absolute top-4 right-4 bg-green-100 text-green-700 w-8 h-8 rounded-full flex items-center justify-center shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" /></svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const AdminContactTab = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [selectedContact, setSelectedContact] = useState<any>(null);

  useEffect(() => {
    setContacts(JSON.parse(localStorage.getItem('adminContacts') || '[]'));
  }, []);

  const toggleStatus = (id: string) => {
    const updated = contacts.map(c => c.id === id ? { ...c, status: c.status === 'Pending' ? 'Solved' : 'Pending' } : c);
    setContacts(updated);
    localStorage.setItem('adminContacts', JSON.stringify(updated));
    window.showToast('স্ট্যাটাস আপডেট করা হয়েছে');
    if(selectedContact && selectedContact.id === id) {
       setSelectedContact(updated.find(c => c.id === id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-2">
         <h2 className="text-2xl font-extrabold text-slate-800">Admin Contact Messages</h2>
      </div>
      <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
        <table className="data-table">
          <thead><tr><th>Date</th><th>Type</th><th>Title</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {contacts.length === 0 ? <tr><td colSpan={5} className="text-center py-8 font-medium text-slate-500">No messages found.</td></tr> : contacts.map(c => (
              <tr key={c.id}>
                <td className="whitespace-nowrap font-medium">{c.date}</td>
                <td><span className={`px-3 py-1 rounded-lg text-xs font-extrabold ${c.type==='অভিযোগ' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>{c.type}</span></td>
                <td className="font-extrabold text-slate-700">{c.title}</td>
                <td><span className={`px-3 py-1 rounded-lg text-xs font-extrabold shadow-sm ${c.status==='Solved' ? 'bg-green-500 text-white' : 'bg-orange-400 text-white'}`}>{c.status}</span></td>
                <td>
                  <button onClick={() => setSelectedContact(c)} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all bg-slate-100 text-slate-600 hover:bg-slate-200`}>
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedContact && (
        <div className="modal-overlay">
          <div className="modal-content max-w-2xl p-8 relative">
            <button onClick={() => setSelectedContact(null)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-800">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
              <span className={`px-3 py-1 rounded-lg text-xs font-extrabold ${selectedContact.type==='অভিযোগ' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>{selectedContact.type}</span>
              <span className={`px-3 py-1 rounded-lg text-xs font-extrabold ${selectedContact.status==='Solved' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{selectedContact.status}</span>
              <span className="text-slate-400 text-sm font-bold ml-auto">{selectedContact.date}</span>
            </div>
            
            <div className="mb-6">
              <h3 className="text-2xl font-black text-slate-800 mb-2">{selectedContact.title}</h3>
              <div className="text-sm font-bold text-slate-500">
                 From: <span className="text-slate-800">{selectedContact.name || 'N/A'}</span> <br/>
                 Phone: <a href={`tel:${selectedContact.phone}`} className="text-blue-600 hover:underline">{selectedContact.phone || 'N/A'}</a> <br/>
                 Email: <a href={`mailto:${selectedContact.email}`} className="text-blue-600 hover:underline">{selectedContact.email || 'N/A'}</a>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-6 text-slate-700 leading-relaxed whitespace-pre-wrap">
               {selectedContact.details}
            </div>
            <div className="flex justify-end gap-3 border-t border-slate-100 pt-6">
               <button onClick={() => toggleStatus(selectedContact.id)} className="bg-slate-800 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-slate-900 transition-colors shadow-md">
                 Mark as {selectedContact.status === 'Pending' ? 'Solved' : 'Pending'}
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CampaignsTab = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Sync with frontend defaults if empty
    const defaultCamps = [
      { id: 'c1', tag: 'জরুরী প্রয়োজন', tagColor: 'bg-red-500', title: 'বন্যা দুর্গতদের জন্য', titleHighlight: 'ত্রাণ তহবিল', highlightColor: 'text-orange-500', desc: 'উত্তরাঞ্চলের সাম্প্রতিক বন্যায় ক্ষতিগ্রস্ত হাজারো মানুষের জন্য জরুরি খাদ্য ও চিকিৎসা সামগ্রী প্রয়োজন।', goal: 5000000, raised: 3250000, image: 'https://picsum.photos/id/292/600/400' },
    ];
    const loaded = JSON.parse(localStorage.getItem('customCampaigns') || 'null');
    if(loaded) setCampaigns(loaded);
    else { setCampaigns(defaultCamps); localStorage.setItem('customCampaigns', JSON.stringify(defaultCamps)); }
  }, []);

  const handleAdd = (e: any) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const newC = {
      id: Date.now().toString(),
      title: fd.get('title') as string,
      titleHighlight: fd.get('titleHighlight') as string,
      tag: fd.get('tag') as string,
      tagColor: 'bg-blue-500',
      highlightColor: 'text-blue-500',
      desc: fd.get('desc') as string,
      goal: Number(fd.get('goal')),
      raised: 0,
      image: fd.get('image') as string || 'https://picsum.photos/id/10/600/400'
    };
    const updated = [newC, ...campaigns];
    setCampaigns(updated);
    localStorage.setItem('customCampaigns', JSON.stringify(updated));
    setShowModal(false);
    window.showToast('ক্যাম্পেইন যোগ করা হয়েছে');
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold text-slate-800">ক্যাম্পেইন ম্যানেজমেন্ট</h2>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
          নতুন ক্যাম্পেইন যোগ করুন
        </button>
      </div>
      <div className="border border-slate-200 rounded-3xl overflow-hidden bg-white shadow-sm">
        <table className="data-table">
          <thead><tr><th>Image</th><th>Title</th><th>Goal</th><th>Raised</th><th>Status</th></tr></thead>
          <tbody>
            {campaigns.map(c => {
              const isCompleted = c.raised >= c.goal;
              return (
              <tr key={c.id}>
                <td><img src={c.image} alt="camp" className="w-16 h-12 object-cover rounded-lg" /></td>
                <td className="font-medium">
                  <div className="font-extrabold text-slate-800">{c.title} <span className="text-blue-500">{c.titleHighlight}</span></div>
                  <div className="text-xs font-bold text-slate-400 bg-slate-100 inline-block px-2 py-0.5 rounded mt-1">{c.tag}</div>
                </td>
                <td className="font-bold text-slate-600">৳ {new Intl.NumberFormat('bn-BD').format(c.goal)}</td>
                <td className="font-black text-green-600">৳ {new Intl.NumberFormat('bn-BD').format(c.raised)}</td>
                <td>
                  <span className={`px-3 py-1 rounded-lg text-xs font-extrabold ${isCompleted ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                    {isCompleted ? 'Completed' : 'Active'}
                  </span>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content max-w-2xl p-8">
            <h3 className="text-2xl font-black mb-6">নতুন ক্যাম্পেইন যোগ করুন</h3>
            <form onSubmit={handleAdd} className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div><label className="block text-sm font-bold text-slate-700 mb-2">টাইটেল</label><input name="title" required className="w-full border-2 border-slate-200 rounded-xl p-3 bg-slate-50 outline-none focus:border-blue-500" /></div>
                <div><label className="block text-sm font-bold text-slate-700 mb-2">হাইলাইট টাইটেল</label><input name="titleHighlight" required className="w-full border-2 border-slate-200 rounded-xl p-3 bg-slate-50 outline-none focus:border-blue-500" /></div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                 <div><label className="block text-sm font-bold text-slate-700 mb-2">ট্যাগ (যেমন: জরুরী)</label><input name="tag" required className="w-full border-2 border-slate-200 rounded-xl p-3 bg-slate-50 outline-none focus:border-blue-500" /></div>
                 <div><label className="block text-sm font-bold text-slate-700 mb-2">লক্ষ্যমাত্রা (৳)</label><input name="goal" type="number" required className="w-full border-2 border-slate-200 rounded-xl p-3 bg-slate-50 outline-none focus:border-blue-500" /></div>
              </div>
              <div><label className="block text-sm font-bold text-slate-700 mb-2">বিস্তারিত বিবরণ</label><textarea name="desc" rows={3} required className="w-full border-2 border-slate-200 rounded-xl p-3 bg-slate-50 outline-none focus:border-blue-500" /></div>
              <div><label className="block text-sm font-bold text-slate-700 mb-2">ইমেজ URL</label><input name="image" placeholder="https://..." className="w-full border-2 border-slate-200 rounded-xl p-3 bg-slate-50 outline-none focus:border-blue-500" /></div>
              <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={()=>setShowModal(false)} className="px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
                <button type="submit" className="btn-primary px-8 py-3">Save Campaign</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

const BloodDonationTab = () => {
  const [donors, setDonors] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Update bdLocations to have full 64 districts
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
      "কুড়িগ্রাম": ["কুড়িগ্রাম সদর", "উলিপুর", "নাագրেশ্বরী", "ভুরুঙ্গামারী"]
    },
    "ময়মনসিংহ": {
      "ময়মনসিংহ": ["ময়মনসিংহ সদর", "ত্রিশাল", "ভালুকা", "মুক্তাগাছা", "ফুলবাড়ীয়া"],
      "শেরপুর": ["শেরপুর সদর", "নকলা", "নালিতাবাড়ী", "ঝিনাইগাতী"],
      "জামালপুর": ["জামালপুর সদর", "বকশীগঞ্জ", "মাদারগঞ্জ", "মেলান্দহ"],
      "নেত্রকোনা": ["নেত্রকোনা সদর", "কেন্দুয়া", "মোহনগঞ্জ", "পূর্বধলা"]
    }
  };

  const [regDiv, setRegDiv] = useState('');
  const [regDist, setRegDist] = useState('');

  useEffect(() => {
    setDonors(JSON.parse(localStorage.getItem('registeredDonors') || '[]'));
    setRequests(JSON.parse(localStorage.getItem('bloodRequests') || '[]'));
  }, []);

  const handleAddDonor = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const newDonor = {
      id: Date.now().toString(),
      name: fd.get('name'), group: fd.get('group'), phone: fd.get('phone'), email: fd.get('email'),
      division: regDiv, district: regDist, thana: fd.get('thana'),
      lastDonation: 'এখনো রক্ত দেননি', address: `${regDist}, ${regDiv}`
    };
    const updated = [newDonor, ...donors];
    setDonors(updated);
    localStorage.setItem('registeredDonors', JSON.stringify(updated));
    setShowAddModal(false);
    window.showToast('নতুন রক্তদাতা যুক্ত করা হয়েছে।');
  };

  return (
    <div className="space-y-12">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold text-slate-800">রক্তদাতা তালিকা (Donors List)</h2>
          <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            Add New Donor
          </button>
        </div>
        <div className="border border-slate-200 rounded-3xl overflow-hidden shadow-sm bg-white">
          <table className="data-table">
            <thead><tr><th>Name</th><th>Group</th><th>Phone</th><th>Address</th></tr></thead>
            <tbody>
              {donors.map(d => (
                <tr key={d.id}>
                  <td className="font-extrabold text-slate-800">{d.name}</td>
                  <td><span className="bg-red-50 text-red-600 border border-red-100 font-black px-3 py-1 rounded-lg">{d.group}</span></td>
                  <td className="font-bold text-slate-600">{d.phone}</td>
                  <td className="font-medium text-slate-500">{d.address}</td>
                </tr>
              ))}
              {donors.length === 0 && (
                <tr><td colSpan={4} className="text-center py-8 text-slate-500 font-medium">কোনো রক্তদাতার তথ্য নেই</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-extrabold text-slate-800 mb-6">রক্তের রিকোয়েস্ট (Blood Requests)</h2>
        <div className="border border-slate-200 rounded-3xl overflow-hidden shadow-sm bg-white">
          <table className="data-table">
            <thead><tr><th>Hospital/Location</th><th>Group</th><th>Problem</th><th>Time</th></tr></thead>
            <tbody>
              {requests.map(r => (
                 <tr key={r.id}>
                   <td className="font-extrabold text-slate-700">{r.location}</td>
                   <td><span className="bg-red-50 text-red-600 border border-red-100 font-black px-3 py-1 rounded-lg">{r.group}</span></td>
                   <td className="font-medium text-slate-600">{r.problem}</td>
                   <td className="font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-lg inline-block mt-2">{r.time}</td>
                 </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content max-w-2xl p-8">
            <h3 className="text-2xl font-black mb-6">নতুন রক্তদাতা যোগ করুন</h3>
            <form onSubmit={handleAddDonor} className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                 <div><label className="block text-sm font-bold text-slate-700 mb-2">নাম</label><input name="name" required className="w-full border-2 border-slate-200 rounded-xl p-3 bg-slate-50 outline-none focus:border-red-400" /></div>
                 <div><label className="block text-sm font-bold text-slate-700 mb-2">রক্তের গ্রুপ</label>
                  <select name="group" required className="w-full border-2 border-slate-200 rounded-xl p-3 bg-slate-50 outline-none focus:border-red-400 font-bold text-red-600">
                    <option value="">নির্বাচন করুন</option>
                    <option value="A+">A+</option><option value="A-">A-</option><option value="B+">B+</option><option value="B-">B-</option><option value="AB+">AB+</option><option value="AB-">AB-</option><option value="O+">O+</option><option value="O-">O-</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                 <div><label className="block text-sm font-bold text-slate-700 mb-2">ফোন</label><input name="phone" required className="w-full border-2 border-slate-200 rounded-xl p-3 bg-slate-50 outline-none focus:border-red-400" /></div>
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">বিভাগ</label>
                    <select required value={regDiv} onChange={(e) => { setRegDiv(e.target.value); setRegDist(''); }} className="w-full border-2 border-slate-200 rounded-xl p-3 bg-slate-50 outline-none focus:border-red-400">
                      <option value="">নির্বাচন করুন</option>
                      {Object.keys(bdLocations).map(div => <option key={div} value={div}>{div}</option>)}
                    </select>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">জেলা</label>
                  <select required value={regDist} onChange={(e) => setRegDist(e.target.value)} disabled={!regDiv} className="w-full border-2 border-slate-200 rounded-xl p-3 bg-slate-50 outline-none focus:border-red-400 disabled:opacity-50">
                    <option value="">নির্বাচন করুন</option>
                    {(regDiv ? Object.keys(bdLocations[regDiv] || {}) : []).map(dist => <option key={dist} value={dist}>{dist}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">উপজেলা/থানা</label>
                  <select name="thana" required disabled={!regDist} className="w-full border-2 border-slate-200 rounded-xl p-3 bg-slate-50 outline-none focus:border-red-400 disabled:opacity-50">
                    <option value="">নির্বাচন করুন</option>
                    {(regDist && regDiv ? bdLocations[regDiv][regDist] || [] : []).map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-8 border-t border-slate-100 pt-6">
                <button type="button" onClick={()=>setShowAddModal(false)} className="px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
                <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-xl shadow-md">Save Donor</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const GalleryTab = () => {
  const [uploadMode, setUploadMode] = useState<'link' | 'file'>('link');
  const [mediaType, setMediaType] = useState<'video' | 'photo'>('video');
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const loaded = JSON.parse(localStorage.getItem('galleryData') || '[]');
    setItems(loaded);
  }, []);

  const handleAdd = (e: any) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    let finalUrl = fd.get('url') as string;
    
    if (uploadMode === 'file') {
      const file = fd.get('fileInput') as File;
      if (file && file.size > 0) {
        finalUrl = URL.createObjectURL(file); 
      }
    }

    if(!finalUrl) return;

    const newItem = { id: Date.now(), type: mediaType, url: finalUrl, caption: fd.get('caption') as string };
    const updated = [newItem, ...items];
    setItems(updated);
    localStorage.setItem('galleryData', JSON.stringify(updated));
    e.target.reset();
    window.showToast('গ্যালারিতে আইটেম যোগ করা হয়েছে');
  };

  const handleDelete = (id: number) => {
    if(confirm('Are you sure?')) {
      const updated = items.filter(it => it.id !== id);
      setItems(updated);
      localStorage.setItem('galleryData', JSON.stringify(updated));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="w-full lg:w-1/3 bg-white border border-slate-200 p-8 rounded-3xl shrink-0 shadow-sm">
        <h3 className="text-xl font-extrabold mb-6 text-slate-800 border-b border-slate-100 pb-4">Add Media</h3>
        <form onSubmit={handleAdd} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">Media Type</label>
            <div className="flex gap-4">
              <label className={`flex-1 flex items-center justify-center gap-2 cursor-pointer p-3 rounded-xl border-2 font-bold transition-all ${mediaType==='video' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-500'}`}>
                <input type="radio" className="sr-only" checked={mediaType==='video'} onChange={()=>setMediaType('video')} /> 🎥 Video
              </label>
              <label className={`flex-1 flex items-center justify-center gap-2 cursor-pointer p-3 rounded-xl border-2 font-bold transition-all ${mediaType==='photo' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-500'}`}>
                <input type="radio" className="sr-only" checked={mediaType==='photo'} onChange={()=>setMediaType('photo')} /> 📷 Photo
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3">Upload Source</label>
            <div className="flex gap-4 mb-3">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-slate-600"><input type="radio" className="accent-blue-600" checked={uploadMode==='link'} onChange={()=>setUploadMode('link')} /> URL Link</label>
              <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-slate-600"><input type="radio" className="accent-blue-600" checked={uploadMode==='file'} onChange={()=>setUploadMode('file')} /> Upload File</label>
            </div>
            {uploadMode === 'link' ? (
              <input name="url" placeholder="https://..." required className="w-full border-2 border-slate-200 rounded-xl p-3 text-sm bg-slate-50 focus:border-blue-500 outline-none" />
            ) : (
              <input type="file" name="fileInput" accept={mediaType==='video'?"video/*":"image/*"} required className="w-full border-2 border-slate-200 rounded-xl p-2 bg-slate-50 text-sm focus:border-blue-500 outline-none" />
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Caption</label>
            <input name="caption" placeholder="Enter caption" required className="w-full border-2 border-slate-200 rounded-xl p-3 text-sm bg-slate-50 focus:border-blue-500 outline-none" />
          </div>

          <button type="submit" className="w-full btn-primary py-4 text-base shadow-lg shadow-blue-500/30">Add to Gallery</button>
        </form>
      </div>

      <div className="w-full lg:w-2/3 border border-slate-200 rounded-3xl overflow-hidden bg-white shadow-sm">
        <table className="data-table">
          <thead><tr><th>Type</th><th>Preview / Link</th><th>Caption</th><th className="text-right">Action</th></tr></thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id}>
                <td><span className={`uppercase text-xs font-black px-3 py-1 rounded-lg ${it.type === 'video' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>{it.type}</span></td>
                <td className="text-blue-500 font-medium truncate max-w-[200px]">
                  {it.url.startsWith('blob:') && it.type === 'photo' ? <img src={it.url} alt="preview" className="h-12 w-16 object-cover rounded-lg shadow-sm" /> : <a href={it.url} target="_blank" rel="noreferrer" className="hover:underline">{it.url}</a>}
                </td>
                <td className="font-bold text-slate-700">{it.caption}</td>
                <td className="text-right">
                  <button onClick={()=>handleDelete(it.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const VolunteersTab = () => {
  const [vols, setVols] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const localVols = JSON.parse(localStorage.getItem('volunteers') || '[]');
    setVols(localVols);
  }, []);

  const toggleStatus = (id: string) => {
    const updated = vols.map(v => v.id === id ? { ...v, status: v.status === 'Active' ? 'Inactive' : 'Active' } : v);
    setVols(updated);
    localStorage.setItem('volunteers', JSON.stringify(updated));
    window.showToast('স্ট্যাটাস আপডেট করা হয়েছে');
  };

  const filtered = vols.filter(v => v.district?.includes(searchTerm) || v.thana?.includes(searchTerm) || v.division?.includes(searchTerm));

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-extrabold text-slate-800">Registration List</h2>
        <div className="relative w-full md:w-64">
           <input 
             type="text" 
             placeholder="Search Location..." 
             value={searchTerm}
             onChange={e => setSearchTerm(e.target.value)}
             className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 shadow-sm text-sm font-bold text-slate-700"
           />
           <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </div>

      <div className="border border-slate-200 rounded-3xl overflow-hidden bg-white shadow-sm">
        <table className="data-table">
          <thead><tr><th>Name</th><th>Phone</th><th>Area</th><th>Blood</th><th>Status</th></tr></thead>
          <tbody>
            {filtered.length === 0 ? <tr><td colSpan={5} className="text-center py-10 font-medium text-slate-500">No volunteers found.</td></tr> : filtered.map(v => (
              <tr key={v.id}>
                <td className="font-extrabold text-slate-800">{v.name}</td>
                <td className="font-bold text-slate-600">{v.phone}</td>
                <td className="font-medium text-slate-500">{v.district}, {v.thana}</td>
                <td><span className="text-red-600 font-black bg-red-50 border border-red-100 px-2 py-1 rounded-lg">{v.bloodGroup}</span></td>
                <td>
                  <button onClick={() => toggleStatus(v.id)} className={`px-3 py-1.5 rounded-lg text-xs font-black transition-colors shadow-sm ${v.status === 'Active' ? 'bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-700' : 'bg-slate-200 text-slate-600 hover:bg-green-100 hover:text-green-700'}`} title="Toggle status">
                    {v.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CareersTab = ({ currentRole }: { currentRole: string }) => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('jobsList') || '[]');
    setJobs(local);
  }, []);

  const displayedJobs = currentRole === 'Super Admin' ? jobs : jobs.filter(j => j.postedByRole === currentRole);

  const handleDelete = (id: string) => {
    if(confirm('Are you sure you want to delete this job?')) {
      const updated = jobs.filter(j => j.id !== id);
      setJobs(updated);
      localStorage.setItem('jobsList', JSON.stringify(updated));
      setSelectedJob(null);
      window.showToast('জব মুছে ফেলা হয়েছে');
    }
  };

  const toggleStatus = (id: string) => {
    const updated = jobs.map(j => j.id === id ? { ...j, status: j.status === 'Active' ? 'Closed' : 'Active' } : j);
    setJobs(updated);
    localStorage.setItem('jobsList', JSON.stringify(updated));
    setSelectedJob(updated.find(j => j.id === id));
    window.showToast('স্ট্যাটাস আপডেট করা হয়েছে');
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold text-slate-800">Careers Management</h2>
      </div>
      <div className="border border-slate-200 rounded-3xl overflow-hidden bg-white shadow-sm">
        <table className="data-table">
          <thead><tr><th>Job Title</th><th>Location</th><th>Type</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {displayedJobs.length === 0 ? <tr><td colSpan={5} className="text-center py-10 font-medium text-slate-500">No jobs posted yet.</td></tr> : displayedJobs.map(j => (
              <tr key={j.id}>
                <td className="font-extrabold text-blue-600">{j.title}</td>
                <td className="font-medium text-slate-600">{j.location}</td>
                <td><span className="bg-slate-100 font-bold px-3 py-1 rounded-lg text-xs text-slate-600 border border-slate-200">{j.type}</span></td>
                <td>
                   <span className={`px-3 py-1.5 rounded-lg text-xs font-black shadow-sm ${j.status === 'Closed' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>{j.status || 'Active'}</span>
                </td>
                <td><button onClick={()=>setSelectedJob(j)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl font-bold transition-colors">Details</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedJob && (
        <div className="modal-overlay">
          <div className="modal-content max-w-3xl p-8 relative">
            <button onClick={()=>setSelectedJob(null)} className="absolute top-6 right-6 w-10 h-10 bg-slate-100 hover:bg-red-100 text-slate-500 hover:text-red-500 rounded-full flex items-center justify-center transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="pr-12">
               <h3 className="text-3xl font-black mb-3 text-slate-800">{selectedJob.title}</h3>
               <div className="flex gap-3 text-xs font-black mb-6">
                  <span className={`px-3 py-1.5 rounded-lg shadow-sm border ${selectedJob.status==='Closed'?'bg-red-50 text-red-600 border-red-100':'bg-green-50 text-green-600 border-green-100'}`}>{selectedJob.status || 'Active'}</span>
                  <span className="text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg">{selectedJob.type}</span>
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
               <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 col-span-1 md:col-span-3 flex justify-between items-center">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-blue-500 mb-1">Posted By</div>
                    <div className="text-lg font-black text-blue-800">{selectedJob.postedByRole}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold uppercase tracking-wider text-blue-500 mb-1">Deadline</div>
                    <div className="text-lg font-black text-blue-800">{selectedJob.deadline}</div>
                  </div>
               </div>
            </div>

            <div className="text-sm text-slate-700 max-h-60 overflow-y-auto mb-8 pr-4 custom-scroll space-y-6">
               <div>
                 <div className="font-extrabold text-lg text-slate-800 mb-2 border-b border-slate-100 pb-2">Job Description</div>
                 <p className="whitespace-pre-wrap leading-relaxed font-medium">{selectedJob.description}</p>
               </div>
               <div>
                 <div className="font-extrabold text-lg text-slate-800 mb-2 border-b border-slate-100 pb-2">Responsibilities</div>
                 <p className="whitespace-pre-wrap leading-relaxed font-medium">{selectedJob.responsibility}</p>
               </div>
            </div>

            <div className="flex gap-4 border-t border-slate-100 pt-6">
              <button onClick={() => toggleStatus(selectedJob.id)} className="flex-1 bg-slate-800 text-white font-bold py-3.5 rounded-xl hover:bg-slate-900 transition-colors shadow-md">
                {selectedJob.status === 'Closed' ? 'Reopen Job' : 'Mark as Closed'}
              </button>
              <button onClick={() => handleDelete(selectedJob.id)} className="flex-1 bg-red-50 text-red-600 border border-red-100 hover:bg-red-600 hover:text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm">
                Delete Job
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const AdminOverviewTab = () => {
  return (
    <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        <h3 className="text-xl font-extrabold text-slate-800 mb-6 border-b border-slate-100 pb-4">Website Visitors Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
           {[{l:'Daily Visitors', v:'1,250', c:'text-blue-600', bg:'bg-blue-50'}, {l:'Last Week', v:'8,400', c:'text-green-600', bg:'bg-green-50'}, {l:'Monthly', v:'35,000', c:'text-orange-600', bg:'bg-orange-50'}, {l:'Yearly', v:'420,000', c:'text-purple-600', bg:'bg-purple-50'}].map(s => (
             <div key={s.l} className={`p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-transform hover:-translate-y-1 ${s.bg}`}>
               <div className="text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-2">{s.l}</div>
               <div className={`text-4xl font-black ${s.c}`}>{s.v}</div>
             </div>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[{label: 'Total Campaigns', val: '12'}, {label: 'Total Donors', val: '1,420'}, {label: 'Total Volunteers', val: '840'}].map(s => (
          <div key={s.label} className="p-8 border border-slate-200 rounded-3xl bg-gradient-to-br from-white to-slate-50 shadow-sm flex flex-col hover:shadow-md transition-shadow">
            <div className="text-slate-500 text-sm font-extrabold uppercase tracking-wider mb-2">{s.label}</div>
            <div className="text-5xl font-black text-slate-800">{s.val}</div>
          </div>
        ))}
      </div>
      
      {/* Charts using CSS styling */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <h4 className="font-bold text-lg text-slate-800 mb-6 border-b pb-4">Monthly Donations</h4>
            <div className="flex items-end justify-between h-48 gap-2">
               {[40, 70, 50, 90, 60, 100].map((h, i) => (
                  <div key={i} className="w-1/6 bg-blue-500 rounded-t-md hover:bg-blue-600 transition-colors" style={{ height: `${h}%` }} title={`${h}%`}></div>
               ))}
            </div>
            <div className="flex justify-between text-xs font-bold text-slate-400 mt-3 px-2">
               <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
            </div>
         </div>
         <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <h4 className="font-bold text-lg text-slate-800 mb-6 border-b pb-4">Campaign Success Rate</h4>
            <div className="flex items-center justify-center h-48">
               <div className="relative w-40 h-40 rounded-full flex items-center justify-center" style={{ background: 'conic-gradient(#10b981 75%, #f1f5f9 0)' }}>
                  <div className="w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                     <span className="text-3xl font-black text-slate-800">75%</span>
                     <span className="text-xs font-bold text-slate-400">Completed</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
      
      {/* Tables Data Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
           <div className="p-6 border-b border-slate-100"><h4 className="font-bold text-lg text-slate-800">Recent Donors</h4></div>
           <table className="data-table w-full">
             <thead><tr><th>Name</th><th>Amount</th><th>Method</th></tr></thead>
             <tbody>
               <tr><td className="font-bold text-slate-700">আরিফ হোসেন</td><td className="font-black text-green-600">৳ 5,000</td><td className="text-xs font-bold text-slate-500">BKASH</td></tr>
               <tr><td className="font-bold text-slate-700">মাহমুদ হাসান</td><td className="font-black text-green-600">৳ 10,000</td><td className="text-xs font-bold text-slate-500">CARD</td></tr>
               <tr><td className="font-bold text-slate-700">সাদিয়া ইসলাম</td><td className="font-black text-green-600">৳ 2,000</td><td className="text-xs font-bold text-slate-500">NAGAD</td></tr>
             </tbody>
           </table>
         </div>
         <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
           <div className="p-6 border-b border-slate-100"><h4 className="font-bold text-lg text-slate-800">Recent Volunteers</h4></div>
           <table className="data-table w-full">
             <thead><tr><th>Name</th><th>Area</th><th>Status</th></tr></thead>
             <tbody>
               <tr><td className="font-bold text-slate-700">রফিকুল ইসলাম</td><td className="font-medium text-slate-500">ঢাকা, ধানমন্ডি</td><td><span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">Active</span></td></tr>
               <tr><td className="font-bold text-slate-700">তানজিনা হক</td><td className="font-medium text-slate-500">চট্টগ্রাম, হালিশহর</td><td><span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">Active</span></td></tr>
               <tr><td className="font-bold text-slate-700">ইমরান খান</td><td className="font-medium text-slate-500">সিলেট, সদর</td><td><span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">Active</span></td></tr>
             </tbody>
           </table>
         </div>
      </div>
    </div>
  );
};

const UserOverviewTab = () => {
  const [attendedCampaigns, setAttendedCampaigns] = useState<any[]>([]);

  useEffect(() => {
    const dynamicDonations = JSON.parse(localStorage.getItem('userDonations') || '[]');
    setAttendedCampaigns(dynamicDonations);
  }, []);

  const totalDonated = attendedCampaigns.reduce((sum, c) => sum + Number(c.amount), 0);

  return (
    <div className="space-y-8 animate-[fadeIn_0.3s_ease-out]">
      <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-800">স্বাগতম আপনার ড্যাশবোর্ডে!</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -mt-10 -mr-10"></div>
          <div className="relative z-10">
            <div className="text-blue-100 font-bold tracking-wider uppercase text-sm mb-2">Campaigns Attended</div>
            <div className="text-6xl font-black">{attendedCampaigns.length}</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-teal-700 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -mt-10 -mr-10"></div>
          <div className="relative z-10">
            <div className="text-emerald-100 font-bold tracking-wider uppercase text-sm mb-2">Total Donated</div>
            <div className="text-6xl font-black">৳ {new Intl.NumberFormat('bn-BD').format(totalDonated)}</div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
         <div className="p-6 border-b border-slate-100">
            <h3 className="font-extrabold text-xl text-slate-800">আমার অনুদান সমূহ</h3>
         </div>
         <table className="data-table w-full">
            <thead>
               <tr>
                  <th>তারিখ</th>
                  <th>ক্যাম্পেইন নাম</th>
                  <th>পেমেন্ট মাধ্যম</th>
                  <th className="text-right">পরিমাণ</th>
               </tr>
            </thead>
            <tbody>
               {attendedCampaigns.length === 0 ? (
                  <tr><td colSpan={4} className="text-center py-8 font-medium text-slate-500">আপনি এখনো কোনো অনুদান করেননি।</td></tr>
               ) : (
                  attendedCampaigns.map((c, i) => (
                     <tr key={i}>
                        <td className="font-bold text-slate-500">{c.date}</td>
                        <td className="font-extrabold text-slate-800">{c.name}</td>
                        <td><span className="bg-slate-100 text-slate-600 font-bold text-xs px-2 py-1 rounded border border-slate-200">{c.method || 'N/A'}</span></td>
                        <td className="font-black text-green-600 text-right">৳ {new Intl.NumberFormat('bn-BD').format(c.amount)}</td>
                     </tr>
                  ))
               )}
            </tbody>
         </table>
      </div>
    </div>
  );
};

const DonorsTab = () => {
  return <div className="p-10 font-bold text-xl text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl">Donor Analytics Dashboard</div>;
};

const UserDonorTab = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    setBookings(JSON.parse(localStorage.getItem('myBloodBookings') || '[]'));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-4 border-b border-slate-200 pb-4">
         <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
         </div>
         <h2 className="text-2xl font-extrabold text-slate-800">আমার রক্তদান প্রোফাইল</h2>
      </div>

      <div className="border border-slate-200 bg-white rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
           <h3 className="font-bold text-lg text-slate-800">সাড়া দেওয়া রিকোয়েস্ট সমূহ</h3>
        </div>
        <table className="data-table w-full">
          <thead>
            <tr>
              <th>তারিখ (সাড়া দেওয়ার)</th>
              <th>রোগীর নাম</th>
              <th>রক্তের গ্রুপ</th>
              <th>হাসপাতাল/এলাকা</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr><td colSpan={4} className="text-center py-8 font-medium text-slate-500">আপনি এখনো কোনো রিকোয়েস্টে সাড়া দেননি।</td></tr>
            ) : (
              bookings.map((b:any, i:number) => (
                <tr key={i}>
                  <td className="font-bold text-slate-600">{b.respondedAt || b.bookedAt}</td>
                  <td className="font-extrabold text-slate-800">{b.patient || 'অজ্ঞাত'}</td>
                  <td><span className="bg-red-50 border border-red-100 text-red-600 px-3 py-1.5 rounded-lg font-black">{b.group}</span></td>
                  <td className="font-medium text-slate-500">{b.location}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SiteSettingsTab = () => {
  const [settings, setSettings] = useState({
    header: { type: 'text', text: 'WAB', image: '' },
    hero: { 
      tag: 'পরিবর্তনের অংশ হোন', 
      title: 'একসাথে আমরা গড়বো', 
      highlight: 'নতুন বাংলাদেশ', 
      subtitle: 'আপনার ছোট একটি সাহায্য বদলে দিতে পারে অসংখ্য মানুষের জীবন। আসুন, কাঁধে কাঁধ মিলিয়ে কাজ করি একটি সুন্দর ভবিষ্যতের জন্য।',
      bgImage: ''
    },
    footer: { type: 'text', text: 'WAB', image: '', tagline: 'একটি অলাভজনক প্রতিষ্ঠান যা বাংলাদেশের প্রত্যন্ত অঞ্চলে শিক্ষা, স্বাস্থ্য এবং স্বাবলম্বীতা নিয়ে কাজ করছে।' }
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('siteSettings') || '{}');
    setSettings(prev => ({
      ...prev,
      header: { ...prev.header, ...(saved.header || {}) },
      hero: { ...prev.hero, ...(saved.hero || {}) },
      footer: { ...prev.footer, ...(saved.footer || {}) }
    }));
  }, []);

  const handleSave = (e: any) => {
    e.preventDefault();
    localStorage.setItem('siteSettings', JSON.stringify(settings));
    window.showToast('সাইট সেটিংস সফলভাবে সেভ হয়েছে!');
    // trigger a custom event if needed to instantly update, but simple reload is enough for now or user can navigate
  };

  const handleImg = (e: any, section: 'header' | 'hero' | 'footer') => {
    const file = e.target.files[0];
    if(file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if(section === 'hero') {
           setSettings(p => ({...p, hero: {...p.hero, bgImage: reader.result as string}}));
        } else {
           setSettings(p => ({...p, [section]: {...p[section], image: reader.result as string}}));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
      <h2 className="text-2xl font-extrabold text-slate-800 mb-8 border-b border-slate-100 pb-4">Site Settings</h2>
      <form onSubmit={handleSave} className="space-y-10">
        
        {/* Header Settings */}
        <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
           <h3 className="font-extrabold text-lg text-slate-800">Header Settings</h3>
           <div>
             <label className="block text-sm font-bold text-slate-700 mb-2">Logo Type</label>
             <select value={settings.header.type} onChange={e=>setSettings(p=>({...p, header:{...p.header, type: e.target.value}}))} className="border-2 p-2.5 rounded-xl w-full max-w-xs focus:outline-none focus:border-blue-500 font-bold bg-white">
               <option value="text">Text</option><option value="image">Image</option>
             </select>
           </div>
           {settings.header.type === 'text' ? 
             <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">Logo Text</label>
               <input value={settings.header.text} onChange={e=>setSettings(p=>({...p, header:{...p.header, text: e.target.value}}))} className="border-2 p-3 rounded-xl w-full bg-white focus:outline-none focus:border-blue-500" />
             </div>
             : 
             <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">Upload Logo Image</label>
               <input type="file" accept="image/*" onChange={e=>handleImg(e, 'header')} className="border-2 p-2 rounded-xl w-full bg-white" />
             </div>
           }
        </div>

        {/* Hero Settings */}
        <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
           <h3 className="font-extrabold text-lg text-slate-800">Hero Section Settings</h3>
           
           <div>
             <label className="block text-sm font-bold text-slate-700 mb-2">Background Image</label>
             <input type="file" accept="image/*" onChange={e=>handleImg(e, 'hero')} className="border-2 p-2 rounded-xl w-full bg-white" />
             {settings.hero.bgImage && <img src={settings.hero.bgImage} alt="preview" className="h-20 w-auto object-cover rounded-lg mt-3 shadow-sm" />}
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">Hero Tag / Badge</label>
               <input value={settings.hero.tag} onChange={e=>setSettings(p=>({...p, hero:{...p.hero, tag: e.target.value}}))} className="border-2 p-3 rounded-xl w-full bg-white focus:outline-none focus:border-blue-500" />
             </div>
             <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">Title</label>
               <input value={settings.hero.title} onChange={e=>setSettings(p=>({...p, hero:{...p.hero, title: e.target.value}}))} className="border-2 p-3 rounded-xl w-full bg-white focus:outline-none focus:border-blue-500" />
             </div>
           </div>

           <div>
             <label className="block text-sm font-bold text-slate-700 mb-2">Highlight Word (in Title)</label>
             <input value={settings.hero.highlight} onChange={e=>setSettings(p=>({...p, hero:{...p.hero, highlight: e.target.value}}))} className="border-2 p-3 rounded-xl w-full bg-white focus:outline-none focus:border-blue-500" />
           </div>

           <div>
             <label className="block text-sm font-bold text-slate-700 mb-2">Subtitle / Description</label>
             <textarea rows={3} value={settings.hero.subtitle} onChange={e=>setSettings(p=>({...p, hero:{...p.hero, subtitle: e.target.value}}))} className="border-2 p-3 rounded-xl w-full bg-white focus:outline-none focus:border-blue-500" />
           </div>
        </div>

        {/* Footer Settings */}
        <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
           <h3 className="font-extrabold text-lg text-slate-800">Footer Settings</h3>
           <div>
             <label className="block text-sm font-bold text-slate-700 mb-2">Footer Tagline / Description</label>
             <textarea rows={3} value={settings.footer.tagline} onChange={e=>setSettings(p=>({...p, footer:{...p.footer, tagline: e.target.value}}))} className="border-2 p-3 rounded-xl w-full bg-white focus:outline-none focus:border-blue-500" />
           </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-4 rounded-xl text-lg shadow-lg shadow-blue-500/30 transition-all">Save All Settings</button>
      </form>
    </div>
  );
};

const RoleManagementTab = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('usersList') || '[]');
    if (stored.length === 0) {
      const mock = [
        { id: '1', name: 'Super Admin User', email: 'admin@wab.org', role: 'Super Admin', status: 'Active' },
        { id: '2', name: 'Moderator User', email: 'mod@wab.org', role: 'Moderator', status: 'Active' },
        { id: '3', name: 'Test User 1', email: 'user1@test.com', role: 'User', status: 'Active' },
      ];
      setUsers(mock);
      localStorage.setItem('usersList', JSON.stringify(mock));
    } else {
      setUsers(stored);
    }
  }, []);

  const updateRole = (id: string, newRole: string) => {
    const updated = users.map(u => u.id === id ? { ...u, role: newRole } : u);
    setUsers(updated);
    localStorage.setItem('usersList', JSON.stringify(updated));
    window.showToast('ইউজারের রোল আপডেট করা হয়েছে');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-2">
         <h2 className="text-2xl font-extrabold text-slate-800">Role Management</h2>
      </div>
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
         <table className="data-table w-full">
            <thead>
               <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Current Role</th>
                  <th>Action (Change Role)</th>
               </tr>
            </thead>
            <tbody>
               {users.map(u => (
                  <tr key={u.id}>
                     <td className="font-extrabold text-slate-800">{u.name}</td>
                     <td className="font-medium text-slate-600">{u.email}</td>
                     <td>
                        <span className={`px-3 py-1 text-xs font-bold rounded-lg border ${
                           u.role === 'Super Admin' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                           u.role === 'Moderator' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                           'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                           {u.role}
                        </span>
                     </td>
                     <td>
                        <select 
                           value={u.role} 
                           onChange={(e) => updateRole(u.id, e.target.value)}
                           className="bg-slate-50 border border-slate-200 text-slate-700 font-bold text-sm px-3 py-1.5 rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer"
                        >
                           <option value="Super Admin">Super Admin</option>
                           <option value="Moderator">Moderator</option>
                           <option value="User">User</option>
                        </select>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );
};

const NewsletterTab = () => {
  const [subs, setSubs] = useState<any[]>([]);
  useEffect(() => setSubs(JSON.parse(localStorage.getItem('newsletters') || '[]')), []);
  return (
    <div className="border border-slate-200 bg-white rounded-3xl shadow-sm overflow-hidden max-w-3xl">
      <table className="data-table">
        <thead><tr><th>Email Address</th><th>Date Subscribed</th></tr></thead>
        <tbody>
          {subs.length===0?<tr><td colSpan={2} className="text-center py-8 text-slate-400 font-bold">No subscribers yet.</td></tr> : subs.map(s =>(
            <tr key={s.id}><td className="font-bold text-slate-700">{s.email}</td><td className="font-medium text-slate-500">{s.date}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
