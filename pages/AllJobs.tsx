import React, { useState, useEffect } from 'react';
import { JobPost } from '../types';

interface AllJobsProps {
  setRoute: (route: string) => void;
}

const AllJobs: React.FC<AllJobsProps> = ({ setRoute }) => {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);

  useEffect(() => {
    const storedJobs = localStorage.getItem('jobsList');
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    }
  }, []);

  const openDetails = (job: JobPost) => {
    setSelectedJob(job);
    setShowDetailsModal(true);
  };

  // UI Helper for Modal
  const ModalOverlay: React.FC<{ children: React.ReactNode; onClose: () => void }> = ({ children, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div className="absolute inset-0 cursor-pointer" onClick={onClose}></div>
      <div className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {children}
      </div>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Page Header */}
      <div className="bg-ngo-blue py-12 text-center text-white relative">
        <div className="container mx-auto px-4 max-w-5xl relative z-10 flex flex-col items-center">
          <button 
            onClick={() => setRoute('home')}
            className="mb-6 flex items-center gap-2 text-blue-100 hover:text-white font-medium bg-white/10 px-4 py-2 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" /></svg>
            হোমে ফিরে যান
          </button>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">সকল জব বিজ্ঞপ্তি</h1>
          <p className="text-blue-100 max-w-2xl text-lg">আমাদের সাথে কাজ করে সমাজের উন্নয়নে সরাসরি ভূমিকা রাখুন। আপনার যোগ্যতানুযায়ী পদের জন্য আবেদন করুন।</p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-5xl mt-10">
        <div className="space-y-4">
          {jobs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-500 text-lg">বর্তমানে কোন চাকরির বিজ্ঞপ্তি নেই।</p>
            </div>
          ) : (
            jobs.map((job) => (
              <div 
                key={job.id} 
                className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:border-ngo-blue transition-all duration-300 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center"
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="bg-blue-50 text-ngo-blue text-xs font-bold px-3 py-1 rounded-full">{job.type}</span>
                    <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full">{job.workMode}</span>
                    <span className="text-slate-500 text-sm flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                      {job.location}
                    </span>
                  </div>
                  
                  <h4 className="text-xl md:text-2xl font-bold text-ngo-dark mb-2 group-hover:text-ngo-blue transition-colors">
                    {job.title}
                  </h4>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-slate-400"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
                      শেষ তারিখ: {job.deadline}
                    </span>
                    <span className="hidden sm:inline text-slate-300">•</span>
                    <span className="flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-slate-400"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>
                      বেতন: {job.salary}
                    </span>
                  </div>
                </div>
                
                <button 
                  onClick={() => openDetails(job)}
                  className="w-full md:w-auto shrink-0 bg-white border-2 border-ngo-blue text-ngo-blue hover:bg-ngo-blue hover:text-white font-bold px-6 py-3 rounded-xl transition-colors text-center"
                >
                  আবেদন করুন
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Job Details Modal */}
      {showDetailsModal && selectedJob && (
        <ModalOverlay onClose={() => setShowDetailsModal(false)}>
          <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-100 flex justify-between items-start">
            <div>
              <div className="flex gap-2 mb-3">
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-md">{selectedJob.type}</span>
                <span className="bg-slate-200 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-md">{selectedJob.workMode}</span>
              </div>
              <h3 className="font-extrabold text-2xl md:text-3xl text-slate-800 mb-2">{selectedJob.title}</h3>
              <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                {selectedJob.location}
              </div>
            </div>
            <button onClick={() => setShowDetailsModal(false)} className="p-2 rounded-full hover:bg-slate-200 bg-white shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <div className="p-6 md:p-8 overflow-y-auto space-y-6">
            <div>
              <h4 className="font-bold text-lg text-slate-800 mb-2 border-b pb-2">জব ডেসক্রিপশন</h4>
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{selectedJob.description}</p>
            </div>
            <div>
              <h4 className="font-bold text-lg text-slate-800 mb-2 border-b pb-2">দায়িত্বসমূহ</h4>
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{selectedJob.responsibility}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">বেতন</p>
                <p className="font-bold text-slate-800">{selectedJob.salary}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">আবেদনের শেষ তারিখ</p>
                <p className="font-bold text-red-600">{selectedJob.deadline}</p>
              </div>
            </div>
            
            <a 
              href={`mailto:${selectedJob.applyEmail}?subject=Application for ${selectedJob.title}`}
              className="block w-full text-center bg-ngo-blue hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-lg transition-colors shadow-lg shadow-blue-500/20"
            >
              ইমেইলের মাধ্যমে আবেদন করুন
            </a>
          </div>
        </ModalOverlay>
      )}
    </div>
  );
};

export default AllJobs;
