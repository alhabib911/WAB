import React from 'react';

const VideoGallery: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold text-ngo-blue uppercase tracking-widest mb-2">ভিডিও গ্যালারি</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-ngo-dark mb-4">
            আমাদের কাজের <span className="text-ngo-green">ভিজ্যুয়াল গল্প</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 h-auto md:h-[500px]">
          {/* Large Video - Takes 2 columns on desktop */}
          <div className="md:col-span-2 relative rounded-3xl overflow-hidden group cursor-pointer h-64 md:h-full shadow-lg">
            <img 
              src="https://picsum.photos/id/119/1000/800" 
              alt="Main Video" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/50 transition-colors flex items-center justify-center">
              <div className="w-20 h-20 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-ngo-green shadow-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 ml-1">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
              <span className="bg-ngo-orange text-xs font-bold px-2 py-1 rounded mb-2 inline-block">ডকুমেন্টারি</span>
              <h4 className="text-2xl font-bold">বন্যা দুর্গত এলাকায় আমাদের ত্রাণ বিতরণ কার্যক্রম</h4>
            </div>
          </div>

          {/* Small Videos Container */}
          <div className="flex flex-col gap-4 md:gap-6 h-full">
            {/* Small Video 1 */}
            <div className="flex-1 relative rounded-3xl overflow-hidden group cursor-pointer shadow-md h-48 md:h-auto">
              <img 
                src="https://picsum.photos/id/120/600/400" 
                alt="Video 2" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/50 transition-colors flex items-center justify-center">
                <div className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-ngo-green shadow-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-1">
                      <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                <h4 className="text-lg font-bold">শীতবস্ত্র বিতরণ ২০২৩</h4>
              </div>
            </div>

            {/* Small Video 2 */}
            <div className="flex-1 relative rounded-3xl overflow-hidden group cursor-pointer shadow-md h-48 md:h-auto">
              <img 
                src="https://picsum.photos/id/167/600/400" 
                alt="Video 3" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/50 transition-colors flex items-center justify-center">
                <div className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-ngo-green shadow-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-1">
                      <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                <h4 className="text-lg font-bold">ফ্রি মেডিকেল ক্যাম্প</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;
