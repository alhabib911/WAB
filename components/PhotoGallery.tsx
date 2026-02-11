import React, { useState, useEffect } from 'react';

const PhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<any[]>([]);

  useEffect(() => {
    const loaded = JSON.parse(localStorage.getItem('galleryData') || '[]');
    const imgs = loaded.filter((item: any) => item.type === 'photo');
    
    if(imgs.length > 0) {
      setPhotos(imgs);
    } else {
      // Defaults
      setPhotos([
        { id: 1, url: 'https://picsum.photos/id/20/400/300' },
        { id: 2, url: 'https://picsum.photos/id/111/400/500' },
        { id: 3, url: 'https://picsum.photos/id/22/400/300' },
        { id: 4, url: 'https://picsum.photos/id/33/400/600' },
      ]);
    }
  }, []);

  if(photos.length === 0) return null;

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-100">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-16">
          <span className="inline-block py-1.5 px-4 rounded-full bg-orange-100 text-orange-600 font-extrabold text-sm tracking-widest mb-4 border border-orange-200 uppercase">
            ফটো গ্যালারি
          </span>
          <h3 className="text-4xl md:text-5xl font-black text-slate-800">
            স্মৃতির পাতায় <span className="text-orange-500">আমাদের কাজ</span>
          </h3>
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          {photos.map((p) => (
            <div key={p.id} className="relative group overflow-hidden rounded-[2rem] break-inside-avoid shadow-sm border border-slate-200 bg-white">
              <img src={p.url} alt="Gallery" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/50 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-slate-800 p-4 rounded-full transition-all shadow-lg transform translate-y-4 group-hover:translate-y-0">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>
                </button>
              </div>
              {p.caption && (
                 <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    {p.caption}
                 </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
