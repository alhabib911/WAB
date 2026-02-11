import React, { useState } from 'react';

interface AuthProps {
  setRoute: (route: string) => void;
}

const Auth: React.FC<AuthProps> = ({ setRoute }) => {
  const [isLogin, setIsLogin] = useState(true);

  const handleDemoLogin = (role: string) => {
    localStorage.setItem('userRole', role);
    setRoute('dashboard');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const email = fd.get('email') as string;
    
    // Default fallback login for normal user if form is submitted
    if (!isLogin) {
      const name = (fd.get('name') as string) || 'Guest';
      const existingUsers = JSON.parse(localStorage.getItem('usersList') || '[]');
      const newUser = { id: Date.now().toString(), name, email, role: 'User', status: 'Active' };
      localStorage.setItem('usersList', JSON.stringify([...existingUsers, newUser]));
      window.showToast('সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে!', 'success');
    } else {
      window.showToast('লগইন সফল হয়েছে!', 'success');
    }

    localStorage.setItem('userRole', 'User');
    setRoute('dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-ngo-green to-teal-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg mb-4">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
              <path d="M2.25 4.5l4 15h2.5l3.25-11.5L15.25 19.5h2.5l4-15h-2.5l-2.5 10.5-3.5-12h-2.5l-3.5 12-2.5-10.5h-2.5z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">
            {isLogin ? 'অ্যাকাউন্টে প্রবেশ করুন' : 'নতুন অ্যাকাউন্ট তৈরি করুন'}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {isLogin ? 'আপনার ড্যাশবোর্ডে স্বাগতম' : 'আমাদের সাথে যুক্ত হোন'}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-slate-700">আপনার নাম</label>
                <input type="text" name="name" required className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-ngo-green focus:ring-1 focus:ring-ngo-green" placeholder="নাম লিখুন" />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700">ইমেইল অ্যাড্রেস</label>
              <input type="email" name="email" required className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-ngo-green focus:ring-1 focus:ring-ngo-green" placeholder="example@email.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">পাসওয়ার্ড</label>
              <input type="password" name="password" required className="mt-1 w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:border-ngo-green focus:ring-1 focus:ring-ngo-green" placeholder="••••••••" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            {isLogin && (
              <div className="text-sm">
                <a href="#" className="font-medium text-ngo-green hover:text-green-500">
                  পাসওয়ার্ড ভুলে গেছেন?
                </a>
              </div>
            )}
          </div>

          <button type="submit" className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-ngo-dark hover:bg-slate-800 transition-colors">
            {isLogin ? 'লগইন করুন' : 'সাইন আপ করুন'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            {isLogin ? 'অ্যাকাউন্ট নেই?' : 'ইতোমধ্যে অ্যাকাউন্ট আছে?'}
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="ml-1 font-bold text-ngo-green hover:underline focus:outline-none">
              {isLogin ? 'নতুন অ্যাকাউন্ট খুলুন' : 'লগইন করুন'}
            </button>
          </p>
        </div>

        {/* Demo Login Section */}
        <div className="mt-10 pt-8 border-t border-slate-200">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center mb-4">
            টেস্ট করার জন্য ডেমো লগইন
          </h3>
          <div className="grid grid-cols-1 gap-3">
            <button onClick={() => handleDemoLogin('Super Admin')} className="w-full bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 font-bold py-2.5 rounded-xl transition-colors text-sm">
              Login as Super Admin
            </button>
            <button onClick={() => handleDemoLogin('Moderator')} className="w-full bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 font-bold py-2.5 rounded-xl transition-colors text-sm">
              Login as Moderator
            </button>
            <button onClick={() => handleDemoLogin('User')} className="w-full bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 font-bold py-2.5 rounded-xl transition-colors text-sm">
              Login as User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
