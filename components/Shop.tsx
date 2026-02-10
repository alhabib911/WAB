import React from 'react';
import { Product } from '../types';

const products: Product[] = [
  {
    id: 'p1',
    name: 'হাতে বোনা নকশী কাঁথা',
    price: 3500,
    imageUrl: 'https://picsum.photos/id/1059/400/400',
    artisan: 'রাবেয়া বেগম, জামালপুর'
  },
  {
    id: 'p2',
    name: 'বাঁশ ও বেতের ল্যাম্পশেড',
    price: 1200,
    imageUrl: 'https://picsum.photos/id/175/400/400',
    artisan: 'উচিং মারমা, বান্দরবান'
  },
  {
    id: 'p3',
    name: 'পাট ও চামড়ার ব্যাগ',
    price: 2200,
    imageUrl: 'https://picsum.photos/id/250/400/400',
    artisan: 'আশা নারী কল্যাণ সমিতি'
  },
  {
    id: 'p4',
    name: 'মাটির শোপিস সেট',
    price: 850,
    imageUrl: 'https://picsum.photos/id/326/400/400',
    artisan: 'পালপাড়া মৃতশিল্প, ধামরাই'
  }
];

const Shop: React.FC = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0,
    }).format(amount).replace('BDT', '৳');
  };

  return (
    <section id="shop" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-ngo-green uppercase tracking-widest mb-2">হস্তশিল্প কর্নার</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-ngo-dark mb-4">
              কিনে সহায়তা করুন
            </h3>
            <p className="text-slate-600 text-lg">
              আমাদের প্রান্তিক উদ্যোক্তাদের তৈরি এই সুন্দর পণ্যগুলো কিনে আপনি সরাসরি তাদের স্বাবলম্বী হতে সাহায্য করছেন। বিক্রির ১০০% লভ্যাংশ সরাসরি কারিগরদের কাছে পৌঁছায়।
            </p>
          </div>
          <button className="shrink-0 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-6 py-3 rounded-full transition-colors flex items-center gap-2">
            সব পণ্য দেখুন
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl hover:shadow-ngo-green/5 transition-all duration-300">
              <div className="relative aspect-square overflow-hidden bg-slate-200">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay cart button */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <button className="bg-white text-ngo-dark font-bold px-6 py-2.5 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-ngo-green hover:text-white flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    কার্টে যোগ করুন
                  </button>
                </div>
              </div>
              <div className="p-5">
                <div className="text-xs font-semibold text-slate-400 mb-1">কারিগর: {product.artisan}</div>
                <h4 className="text-lg font-bold text-ngo-dark mb-2 group-hover:text-ngo-green transition-colors">{product.name}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-extrabold text-ngo-blue">{formatCurrency(product.price)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shop;
