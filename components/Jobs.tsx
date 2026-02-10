import React from 'react';
import { JobPost } from '../types';

const jobs: JobPost[] = [
  {
    id: 'job-1',
    title: 'প্রজেক্ট ম্যানেজার (রুরাল ডেভেলপমেন্ট)',
    location: 'কুড়িগ্রাম (ফিল্ড অফিস)',
    type: 'ফুল-টাইম',
    deadline: '২৫ অক্টোবর, ২০২৩',
    salary: 'আলোচনা সাপেক্ষে'
  },
  {
    id: 'job-2',
    title: 'মেডিকেল অফিসার',
    location: 'বান্দরবান',
    type: 'চুক্তিভিত্তিক',
    deadline: '৩০ অক্টোবর, ২০২৩',
    salary: '৪৫,০০০ - ৫৫,০০০ টাকা'
  },
  {
    id: 'job-3',
    title: 'কমিউনিকেশন ও পিআর এক্সিকিউটিভ',
    location: 'ঢাকা (হেড অফিস)',
    type: 'ফুল-টাইম',
    deadline: '১২ নভেম্বর, ২০২৩',
    salary: 'আলোচনা সাপেক্ষে'
  },
  {
    id: 'job-4',
    title: 'ডাটা এন্ট্রি এবং মনিটরিং অ্যাসিস্ট্যান্ট',
    location: 'সাতক্ষীরা',
    type: 'পার্ট-টাইম',
    deadline: '১৫ নভেম্বর, ২০২৩',
    salary: '১৫,০০০ টাকা'
  }
];

const Jobs: React.FC = () => {
  return (
    <section id="jobs" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-ngo-green uppercase tracking-widest mb-2">ক্যারিয়ার</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-ngo-dark mb-4">
            আমাদের টিমে যোগ দিন
          </h3>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            মানুষের সেবায় কাজ করার আগ্রহ থাকলে আজই আবেদন করুন। আমরা খুঁজছি এমন কিছু কর্মঠ মানুষ যারা সমাজে পজেটিভ পরিবর্তন আনতে চায়।
          </p>
        </div>

        <div className="space-y-4">
          {jobs.map((job) => (
            <div 
              key={job.id} 
              className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-ngo-blue transition-all duration-300 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="bg-blue-50 text-ngo-blue text-xs font-bold px-3 py-1 rounded-full">
                    {job.type}
                  </span>
                  <span className="text-slate-500 text-sm flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {job.location}
                  </span>
                </div>
                
                <h4 className="text-xl md:text-2xl font-bold text-ngo-dark mb-2 group-hover:text-ngo-blue transition-colors">
                  {job.title}
                </h4>
                
                <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-slate-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                    শেষ তারিখ: {job.deadline}
                  </span>
                  <span className="hidden sm:inline text-slate-300">•</span>
                  <span className="flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-slate-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                    </svg>
                    বেতন: {job.salary}
                  </span>
                </div>
              </div>
              
              <button className="w-full md:w-auto shrink-0 bg-white border-2 border-ngo-blue text-ngo-blue hover:bg-ngo-blue hover:text-white font-bold px-6 py-3 rounded-xl transition-colors text-center">
                আবেদন করুন
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <button className="text-ngo-green font-bold text-lg hover:text-green-700 transition-colors flex items-center justify-center gap-2 mx-auto">
            সব বিজ্ঞপ্তি দেখুন
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Jobs;
