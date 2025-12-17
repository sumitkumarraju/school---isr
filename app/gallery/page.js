import React from 'react';

const images = [
    "gallery/DSCN0070.JPG", "gallery/DSCN0116.JPG", "gallery/DSCN0187.JPG",
    "gallery/DSCN0194.JPG", "gallery/DSCN0275.JPG", "gallery/DSCN0320.JPG",
    "gallery/DSCN1230.JPG", "gallery/DSCN1307.JPG", "gallery/DSCN1429.JPG",
    "gallery/DSCN1615.JPG", "gallery/DSCN2573.JPG", "gallery/DSCN2579.JPG",
    "gallery/DSCN2658.JPG", "gallery/DSCN2703.JPG", "gallery/DSC_1457.JPG",
    "gallery/DSC_1461.JPG", "gallery/DSC_2957.JPG",
    "gallery/WhatsApp Image 2019-06-01 at 12.11.48 PM.jpeg",
    "gallery/WhatsApp Image 2022-08-31 at 4.25.45 PM.jpeg"
];

export default function GalleryPage() {
    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <div className="bg-iis-maroon text-white py-16 text-center">
                <h1 className="font-serif text-4xl font-bold">Gallery</h1>
                <p className="text-red-100 mt-2">Glimpses of life at Ishwar International School.</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-12">

                <div className="columns-1 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {images.map((img, index) => (
                        <div key={index} className="break-inside-avoid relative group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                            <img
                                src={`/${img}`}
                                alt={`Gallery Image ${index + 1}`}
                                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
