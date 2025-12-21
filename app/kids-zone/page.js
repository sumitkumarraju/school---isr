import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import kidsImages from '@/public/kids play section/images.json';

export const metadata = {
    title: 'Kids Play Zone | Ishwar International School',
    description: 'A dedicated fun and learning zone for our kindergarten stars.',
};

export default function KidsZonePage() {
    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Header */}
            <div className="bg-iis-maroon text-white py-16 text-center">
                <h1 className="font-serif text-4xl font-bold animate-fade-in-up">Kids Play Zone</h1>
                <p className="text-red-100 mt-2 animate-fade-in-up delay-100">Where learning meets fun in a safe environment.</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-12">
                {/* Intro Section */}
                <div className="bg-white p-8 rounded-lg shadow-sm mb-12 border-l-4 border-yellow-400">
                    <h2 className="font-serif text-2xl font-bold text-slate-800 mb-4">Happy Learning!</h2>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        We believe that play is the highest form of research. Our dedicated Kids Play Zone is designed to stimulate imagination, physical coordination, and social skills in our youngest learners. From colorful structures to safety-first equipment, every corner is crafted for joy.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-6">
                        <div className="bg-slate-50 px-4 py-2 rounded border border-slate-200 text-sm font-semibold text-slate-700">
                            <i className="fa-solid fa-shapes mr-2 text-yellow-500"></i> Interactive Tys
                        </div>
                        <div className="bg-slate-50 px-4 py-2 rounded border border-slate-200 text-sm font-semibold text-slate-700">
                            <i className="fa-solid fa-shield-heart mr-2 text-green-500"></i> Safe Environment
                        </div>
                        <div className="bg-slate-50 px-4 py-2 rounded border border-slate-200 text-sm font-semibold text-slate-700">
                            <i className="fa-solid fa-child-reaching mr-2 text-blue-500"></i> Physical Activity
                        </div>
                    </div>
                </div>

                {/* Gallery Grid */}
                <h3 className="font-serif text-2xl font-bold text-slate-800 mb-6 pl-2 border-l-4 border-iis-maroon">Photo Gallery</h3>

                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                    {kidsImages.map((imageName, index) => (
                        <div key={index} className="break-inside-avoid relative group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                            <Image
                                src={`/kids play section/${imageName}`}
                                alt={`Kids Play Zone Image ${index + 1}`}
                                width={500}
                                height={350}
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link href="/" className="inline-block bg-slate-800 text-white px-8 py-3 rounded hover:bg-slate-700 transition font-semibold">
                        &larr; Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
