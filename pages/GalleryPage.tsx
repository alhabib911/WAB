import React from 'react';
import VideoGallery from '../components/VideoGallery';
import PhotoGallery from '../components/PhotoGallery';

const GalleryPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <div className="bg-ngo-dark py-16 text-center text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">গ্যালারি</h1>
          <p className="text-slate-300 text-lg">আমাদের কাজের ভিজ্যুয়াল গল্প এবং স্মৃতির পাতায় আমাদের কাজ</p>
        </div>
      </div>
      
      {/* Media Galleries */}
      <VideoGallery />
      <PhotoGallery />
    </div>
  );
};

export default GalleryPage;
