import React from 'react';

const photos = [
  'https://picsum.photos/id/20/400/300',
  'https://picsum.photos/id/111/400/500',
  'https://picsum.photos/id/22/400/300',
  'https://picsum.photos/id/33/400/600',
  'https://picsum.photos/id/44/400/400',
  'https://picsum.photos/id/55/400/300',
  'https://picsum.photos/id/66/400/500',
  'https://picsum.photos/id/119/400/300',
];

const PhotoGallery: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50 border-t border-slate-100">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-10">
          <h2 className="text-sm font-bold text-ngo-orange uppercase tracking-widest mb-2">ফটো গ্যালারি</h2>
          <h3 className="text-3xl font-extrabold text-ngo-dark">
            স্মৃতির পাতায় <span className="text-ngo-orange">আমাদের কাজ</span>
          </h3>
        </div>

        {/* Masonry CSS columns */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {photos.map((src, index) => (
            <div key={index} className="relative group overflow-hidden rounded-2xl break-inside-avoid bg-slate-200">
              <img 
                src={src} 
                alt={`Gallery photo ${index + 1}`} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button className="bg-white/20 backdrop-blur-sm hover:bg-white text-white hover:text-ngo-dark p-3 rounded-full transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
