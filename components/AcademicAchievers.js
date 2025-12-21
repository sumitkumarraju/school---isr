import React from 'react';

const topPerformers = [
    { name: 'Aarushi', percentage: '91.8', img: '/toppers/Screenshot 2025-12-21 182603.png' },
    { name: 'Lokesh', percentage: '90.4', img: '/toppers/Screenshot 2025-12-21 182617.png' },
    { name: 'Lakshay Shuklan', percentage: '88.2', img: '/toppers/Screenshot 2025-12-21 182632.png' },
];

const otherAchievers = [
    { name: 'Sheetal', percentage: '87.8', img: '/toppers/Screenshot 2025-12-21 182637.png' },
    { name: 'Anchal', percentage: '87.2', img: '/toppers/Screenshot 2025-12-21 182641.png' },
    { name: 'Anushika', percentage: '87.2', img: '/toppers/Screenshot 2025-12-21 182647.png' },
    { name: 'Yashika', percentage: '87.2', img: '/toppers/Screenshot 2025-12-21 182653.png' },
    { name: 'Tamanna', percentage: '83.4', img: '/toppers/Screenshot 2025-12-21 182700.png' },
    { name: 'Nishu', percentage: '82', img: '/toppers/Screenshot 2025-12-21 182705.png' },
    { name: 'Ronal', percentage: '81.2', img: '/toppers/Screenshot 2025-12-21 182711.png' },
    { name: 'Vansh', percentage: '80.2', img: '/toppers/Screenshot 2025-12-21 182719.png' },
    { name: 'Tamanna', percentage: '80.2', img: '/toppers/Screenshot 2025-12-21 182728.png' },
    { name: 'Prince', percentage: '80', img: '/toppers/Screenshot 2025-12-21 182735.png' },
];

const subjectToppers = [
    { subject: 'English', score: 100, student: 'Aarushi' },
    { subject: 'Hindi', score: 97, student: 'Aanchal' },
    { subject: 'Chemistry', score: 95, student: 'Tamanna' },
    { subject: 'PHE', score: 94, student: 'Lokesh' },
    { subject: 'Geography', score: 95, student: 'Nishu' },
    { subject: 'Economics', score: 97, student: 'Lokesh' },
    { subject: 'Business Studies', score: 95, student: 'Yashika' },
];

export default function AcademicAchievers() {
    return (
        <section className="py-16 bg-gradient-to-br from-indigo-50 via-white to-pink-50">
            <div className="max-w-7xl mx-auto px-4">

                {/* Header */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <span className="inline-block bg-iis-gold text-iis-navy text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-widest border border-iis-navy/20">
                        Energy • Excellence • Evolution
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-iis-maroon mb-4">
                        <span className="text-yellow-500 mr-2">⭐</span>
                        Heartiest Congratulations
                        <span className="text-yellow-500 ml-2">⭐</span>
                    </h2>
                    <p className="text-xl text-slate-700 font-medium">To Our Academic Achievers of Class XII (2024–25)</p>
                </div>

                {/* Top Performers */}
                <div className="mb-16">
                    <h3 className="text-center font-serif text-3xl font-bold text-iis-navy mb-10 flex items-center justify-center gap-4">
                        <span className="h-px w-10 bg-iis-navy/30"></span> Top Performers <span className="h-px w-10 bg-iis-navy/30"></span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center max-w-5xl mx-auto">
                        {topPerformers.map((student, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl shadow-xl border-t-8 border-yellow-400 transform hover:-translate-y-2 transition-all text-center relative overflow-hidden group">
                                <div className="absolute top-0 right-0 bg-yellow-400 text-iis-navy font-bold text-xs px-3 py-1 rounded-bl-lg z-10">
                                    Rank #{idx + 1}
                                </div>
                                <div className="w-40 h-40 mx-auto rounded-full border-4 border-yellow-100 overflow-hidden mb-4 shadow-inner group-hover:scale-105 transition-transform duration-500">
                                    <img src={student.img} alt={student.name} className="w-full h-full object-cover" />
                                </div>
                                <h4 className="font-serif text-2xl font-bold text-slate-800 mb-1">{student.name}</h4>
                                <div className="text-4xl font-black text-iis-maroon">{student.percentage}%</div>
                                <div className="mt-4">
                                    <span className="inline-block w-8 h-1 bg-gradient-to-r from-yellow-400 to-iis-maroon rounded-full"></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Other Achievers & Stats Grid */}
                <div className="grid lg:grid-cols-3 gap-12">

                    {/* Other Achievers List */}
                    <div className="lg:col-span-2">
                        <h3 className="font-serif text-2xl font-bold text-slate-700 mb-6 flex items-center gap-3">
                            <i className="fa-solid fa-medal text-iis-maroon"></i> Stellar Achievers
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 sm:grid-cols-4 gap-4">
                            {otherAchievers.map((student, idx) => (
                                <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="aspect-square bg-gray-100 overflow-hidden relative">
                                        <img src={student.img} alt={student.name} className="w-full h-full object-cover" />
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-center text-white">
                                            <span className="font-bold text-lg">{student.percentage}%</span>
                                        </div>
                                    </div>
                                    <div className="p-3 text-center bg-white">
                                        <h5 className="font-bold text-slate-700 text-sm truncate" title={student.name}>{student.name}</h5>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats & Subject Toppers */}
                    <div className="space-y-8">

                        {/* Summary Stats */}
                        <div className="bg-iis-maroon text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                            <h4 className="font-serif text-xl font-bold mb-4 border-b border-white/20 pb-2">Result Highlights</h4>
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div className="bg-white/10 rounded-lg p-3">
                                    <div className="text-3xl font-bold text-yellow-400">100%</div>
                                    <div className="text-xs uppercase tracking-wider opacity-80">Pass Result</div>
                                </div>
                                <div className="bg-white/10 rounded-lg p-3">
                                    <div className="text-3xl font-bold text-yellow-400">32</div>
                                    <div className="text-xs uppercase tracking-wider opacity-80">Distinctions</div>
                                </div>
                            </div>
                            <div className="mt-6 space-y-2">
                                <div className="flex justify-between text-sm"><span>Science Stream</span> <span className="font-bold">16 Merits</span></div>
                                <div className="flex justify-between text-sm"><span>Commerce Stream</span> <span className="font-bold">05 Merits</span></div>
                                <div className="flex justify-between text-sm"><span>Humanities</span> <span className="font-bold">11 Merits</span></div>
                            </div>
                        </div>

                        {/* Subject Toppers */}
                        <div className="bg-white border-l-4 border-iis-gold shadow-md rounded-r-xl p-6">
                            <h4 className="font-serif text-xl font-bold text-slate-800 mb-4">Subject Toppers</h4>
                            <div className="space-y-3">
                                {subjectToppers.map((sub, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-sm border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                                        <div>
                                            <span className="font-bold text-slate-700">{sub.subject}</span>
                                            <span className="block text-xs text-slate-500">{sub.student}</span>
                                        </div>
                                        <div className="bg-green-50 text-green-700 font-bold px-2 py-1 rounded text-xs">
                                            {sub.score}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
