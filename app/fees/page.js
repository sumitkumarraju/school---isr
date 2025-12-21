import React from 'react';

export default function FeesPage() {
    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <div className="bg-iis-maroon text-white py-16 text-center">
                <h1 className="font-serif text-4xl font-bold">Fee Structure (2025-26)</h1>
                <p className="text-red-100 mt-2">Transparent and affordable education.</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-12">

                <div className="text-center mb-12">
                    <div className="bg-white inline-block px-8 py-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">General Charges</h2>
                        <div className="grid gap-2 text-left">
                            <p className="text-slate-600">
                                <span className="font-bold text-iis-navy">Admission Charge (For New Comers):</span> <span className="float-right ml-8 font-bold text-red-600">₹ 500</span>
                            </p>
                            <p className="text-slate-600">
                                <span className="font-bold text-iis-navy">Registration / Admission Fee:</span> <span className="float-right ml-8 font-bold text-red-600">₹ 500</span>
                            </p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-lg font-bold text-slate-700 mb-2">Monthly Fee Overview</h3>
                        <div className="inline-flex gap-8 bg-blue-50 px-6 py-3 rounded-full text-sm font-semibold text-blue-800">
                            <span>P. Nur to V: ₹ 3,000</span>
                            <span className="w-px bg-blue-200"></span>
                            <span>VI to XII: ₹ 4,000</span>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-16">

                    {/* Pre-Primary */}
                    <div className="bg-white rounded-sm shadow-lg border border-gray-200 overflow-hidden group hover:border-iis-maroon transition-colors">
                        <div className="bg-iis-navy text-white p-4 text-center group-hover:bg-iis-maroon transition-colors">
                            <h3 className="font-serif text-xl font-bold">Pre-Primary</h3>
                            <p className="text-xs text-slate-300 uppercase tracking-widest">Nursery - UKG</p>
                        </div>
                        <div className="p-6 text-sm">
                            <div className="grid grid-cols-3 gap-2 mt-2 mb-4 text-xs font-bold text-iis-maroon uppercase">
                                <span>Class</span>
                                <span className="text-right">1st Child</span>
                                <span className="text-right">2nd Child</span>
                            </div>

                            <div className="grid grid-cols-3 gap-2 py-3 border-b border-gray-50">
                                <span className="font-bold text-iis-navy">Nursery</span>
                                <span className="text-right font-bold text-slate-700">₹ 2,550</span>
                                <span className="text-right font-bold text-slate-700">₹ 2,550</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 py-3 border-b border-gray-50">
                                <span className="font-bold text-iis-navy">L.K.G.</span>
                                <span className="text-right font-bold text-slate-700">₹ 3,300</span>
                                <span className="text-right font-bold text-slate-700">₹ 3,100</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 py-3 border-b border-gray-50">
                                <span className="font-bold text-iis-navy">U.K.G.</span>
                                <span className="text-right font-bold text-slate-700">₹ 3,300</span>
                                <span className="text-right font-bold text-slate-700">₹ 3,100</span>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-center text-slate-400">
                                Monthly Tuition Fee included
                            </div>
                        </div>
                    </div>

                    {/* Primary */}
                    <div className="bg-white rounded-sm shadow-lg border border-gray-200 overflow-hidden group hover:border-iis-maroon transition-colors">
                        <div className="bg-iis-navy text-white p-4 text-center group-hover:bg-iis-maroon transition-colors">
                            <h3 className="font-serif text-xl font-bold">Primary Wing</h3>
                            <p className="text-xs text-slate-300 uppercase tracking-widest">Grade 1 - 5</p>
                        </div>
                        <div className="p-6 text-sm">
                            <div className="grid grid-cols-3 gap-2 mt-2 mb-4 text-xs font-bold text-iis-maroon uppercase">
                                <span>Class</span>
                                <span className="text-right font-bold text-iis-maroon">1st Child</span>
                                <span className="text-right font-bold text-iis-maroon">2nd Child</span>
                            </div>

                            <div className="grid grid-cols-3 gap-2 py-3 border-b border-gray-50">
                                <span className="font-bold text-iis-navy">1st</span>
                                <span className="text-right font-bold text-slate-700">₹ 3,600</span>
                                <span className="text-right font-bold text-slate-700">₹ 3,400</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 py-3 border-b border-gray-50">
                                <span className="font-bold text-iis-navy">2nd</span>
                                <span className="text-right font-bold text-slate-700">₹ 3,600</span>
                                <span className="text-right font-bold text-slate-700">₹ 3,400</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 py-3 border-b border-gray-50">
                                <span className="font-bold text-iis-navy">3rd</span>
                                <span className="text-right font-bold text-slate-700">₹ 4,000</span>
                                <span className="text-right font-bold text-slate-700">₹ 3,750</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 py-3 border-b border-gray-50">
                                <span className="font-bold text-iis-navy">4th</span>
                                <span className="text-right font-bold text-slate-700">₹ 4,000</span>
                                <span className="text-right font-bold text-slate-700">₹ 3,750</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 py-3 border-b border-gray-50">
                                <span className="font-bold text-iis-navy">5th</span>
                                <span className="text-right font-bold text-slate-700">₹ 4,000</span>
                                <span className="text-right font-bold text-slate-700">₹ 3,750</span>
                            </div>
                        </div>
                    </div>

                    {/* Middle & Senior */}
                    <div className="bg-white rounded-sm shadow-lg border border-gray-200 overflow-hidden group hover:border-iis-maroon transition-colors">
                        <div className="bg-iis-navy text-white p-4 text-center group-hover:bg-iis-maroon transition-colors">
                            <h3 className="font-serif text-xl font-bold">Middle & Senior</h3>
                            <p className="text-xs text-slate-300 uppercase tracking-widest">Grade 6 - 12</p>
                        </div>
                        <div className="p-6 text-sm">
                            <div className="grid grid-cols-3 gap-2 mt-2 mb-4 text-xs font-bold text-iis-maroon uppercase">
                                <span>Class</span>
                                <span className="text-right font-bold text-iis-maroon">1st Child</span>
                                <span className="text-right font-bold text-iis-maroon">2nd Child</span>
                            </div>

                            <div className="grid grid-cols-3 gap-2 py-3 border-b border-gray-50">
                                <span className="font-bold text-iis-navy">6th</span>
                                <span className="text-right font-bold text-slate-700">₹ 4,500</span>
                                <span className="text-right font-bold text-slate-700">₹ 4,150</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 py-3 border-b border-gray-50">
                                <span className="font-bold text-iis-navy">7th</span>
                                <span className="text-right font-bold text-slate-700">₹ 4,500</span>
                                <span className="text-right font-bold text-slate-700">₹ 4,150</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 py-3 border-b border-gray-50">
                                <span className="font-bold text-iis-navy">8th</span>
                                <span className="text-right font-bold text-slate-700">₹ 4,500</span>
                                <span className="text-right font-bold text-slate-700">₹ 4,150</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 py-3 border-b border-gray-50">
                                <span className="font-bold text-iis-navy">9th</span>
                                <span className="text-right font-bold text-slate-700">₹ 5,000</span>
                                <span className="text-right font-bold text-slate-700">₹ 4,650</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 py-3 border-b border-gray-50">
                                <span className="font-bold text-iis-navy">10th</span>
                                <span className="text-right font-bold text-slate-700">₹ 5,000</span>
                                <span className="text-right font-bold text-slate-700">₹ 4,650</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 py-3 border-b border-gray-50">
                                <span className="font-bold text-iis-navy text-[10px]">11th/12th<br />(Commerce)</span>
                                <span className="text-right font-bold text-slate-700">₹ 5,550</span>
                                <span className="text-right font-bold text-slate-700">₹ 5,000</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 py-3 border-b border-gray-50">
                                <span className="font-bold text-iis-navy text-[10px]">11th/12th<br />(Science)</span>
                                <span className="text-right font-bold text-slate-700">₹ 5,800</span>
                                <span className="text-right font-bold text-slate-700">₹ 5,350</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
