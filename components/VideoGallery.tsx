import React, { useState, useEffect } from 'react';

const VideoGallery: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    const loaded = JSON.parse(localStorage.getItem('galleryData') || '[]');
    const vids = loaded.filter((item: any) => item.type === 'video');
    
    if(vids.length > 0) {
      setVideos(vids);
    } else {
      // Defaults
      setVideos([
        { id: 1, url: 'https://picsum.photos/id/119/1000/800', caption: 'বন্যা দুর্গত এলাকায় আমাদের ত্রাণ বিতরণ কার্যক্রম', isLink: false },
        { id: 2, url: 'https://picsum.photos/id/120/600/400', caption: 'শীতবস্ত্র বিতরণ ২০২৩', isLink: false },
        { id: 3, url: 'https://picsum.photos/id/167/600/400', caption: 'ফ্রি মেডিকেল ক্যাম্প', isLink: false }
      ]);
    }
  }, []);

  if(videos.length === 0) return null;

  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="text-center mb-16">
          <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-600 font-extrabold text-sm tracking-widest mb-4 border border-blue-100 uppercase">
            ভিডিও গ্যালারি
          </span>
          <h3 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">
            আমাদের কাজের <span className="text-blue-600">ভিজ্যুয়াল গল্প</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[500px]">
          {/* Main Video */}
          <div className="md:col-span-2 relative rounded-[2rem] overflow-hidden group cursor-pointer h-72 md:h-full shadow-lg border border-slate-100">
            <img src={videos[0]?.url} alt="Main Video" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/50 transition-colors flex items-center justify-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform border border-white/30">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-1"><path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" /></svg>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white">
              <span className="bg-blue-600 text-xs font-black px-3 py-1.5 rounded-lg mb-3 inline-block shadow-sm">নতুন ভিডিও</span>
              <h4 className="text-2xl md:text-3xl font-black drop-shadow-md">{videos[0]?.caption}</h4>
            </div>
          </div>

          <div className="flex flex-col gap-6 h-full">
            {videos.slice(1, 3).map((v) => (
              <div key={v.id} className="flex-1 relative rounded-[2rem] overflow-hidden group cursor-pointer shadow-md h-48 md:h-auto border border-slate-100">
                <img src={v.url} alt="Video" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/50 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform border border-white/30">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-xl">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5"><path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" /></svg>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white">
                  <h4 className="text-xl font-bold drop-shadow-md">{v.caption}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;
