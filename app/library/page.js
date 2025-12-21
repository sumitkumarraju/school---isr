import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import libraryImages from '@/public/library/images.json';

export const metadata = {
    title: 'School Library | Ishwar International School',
    description: 'Explore our vast collection of books, periodicals, and digital resources.',
};

export default function LibraryPage() {
    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Header */}
            <div className="bg-iis-maroon text-white py-16 text-center">
                <h1 className="font-serif text-4xl font-bold animate-fade-in-up">School Library</h1>
                <p className="text-red-100 mt-2 animate-fade-in-up delay-100">A center for learning, research, and imagination.</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-12">
                {/* Intro Section */}
                <div className="bg-white p-8 rounded-lg shadow-sm mb-12 border-l-4 border-iis-gold">
                    <h2 className="font-serif text-2xl font-bold text-slate-800 mb-4">About Our Library</h2>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        The fully computerized library at Ishwar International School operates on an open-access system, housing a wide collection of books, periodicals, and newspapers. It serves as a quiet sanctuary for students to read, research, and expand their knowledge.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-6">
                        <div className="bg-slate-50 px-4 py-2 rounded border border-slate-200 text-sm font-semibold text-slate-700">
                            <i className="fa-solid fa-book mr-2 text-iis-maroon"></i> 5000+ Books
                        </div>
                        <div className="bg-slate-50 px-4 py-2 rounded border border-slate-200 text-sm font-semibold text-slate-700">
                            <i className="fa-solid fa-newspaper mr-2 text-iis-maroon"></i> Daily Newspapers
                        </div>
                        <div className="bg-slate-50 px-4 py-2 rounded border border-slate-200 text-sm font-semibold text-slate-700">
                            <i className="fa-solid fa-desktop mr-2 text-iis-maroon"></i> Digital Resources
                        </div>
                    </div>
                </div>

                {/* Gallery Grid */}
                <h3 className="font-serif text-2xl font-bold text-slate-800 mb-6 pl-2 border-l-4 border-iis-maroon">Library Gallery</h3>

                <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
                    {libraryImages.map((imageName, index) => (
                        <div key={index} className="break-inside-avoid relative group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                            <Image
                                src={`/library/${imageName}`}
                                alt={`Library Image ${index + 1}`}
                                width={600}
                                height={400}
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
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
