'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function FeesPage() {
    const [fees, setFees] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFees();
    }, []);

    const fetchFees = async () => {
        try {
            const { data, error } = await supabase
                .from('fees')
                .select('*')
                .eq('active', true)
                .order('display_order', { ascending: true });

            if (error) throw error;
            setFees(data || []);
        } catch (error) {
            console.error('Error fetching fees:', error);
        } finally {
            setLoading(false);
        }
    };

    const groupedFees = {
        'Pre-Primary': fees.filter(f => f.category === 'Pre-Primary'),
        'Primary Wing': fees.filter(f => f.category === 'Primary Wing'),
        'Middle & Senior': fees.filter(f => f.category === 'Middle & Senior'),
    };

    const categorySubtitles = {
        'Pre-Primary': 'NURSERY - UKG',
        'Primary Wing': 'GRADE 1 - 5',
        'Middle & Senior': 'GRADE 6 - 12'
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <div className="bg-iis-maroon text-white py-16 text-center">
                <h1 className="font-serif text-4xl font-bold">Fee Structure (2025-26)</h1>
                <p className="text-red-100 mt-2">Transparent and affordable education.</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-12">
                {/* General Charges */}
                <div className="text-center mb-12">
                    <div className="bg-white inline-block px-8 py-6 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">General Charges</h2>
                        <div className="grid gap-2 text-left">
                            <p className="text-slate-600">
                                <span className="font-bold text-iis-navy">Admission Charge (For New Comers):</span>
                                <span className="float-right ml-8 font-bold text-red-600">₹ 500</span>
                            </p>
                            <p className="text-slate-600">
                                <span className="font-bold text-iis-navy">Registration / Admission Fee:</span>
                                <span className="float-right ml-8 font-bold text-red-600">₹ 500</span>
                            </p>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-slate-500">Loading fee structure...</p>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8 mb-16">
                        {Object.entries(groupedFees).map(([category, categoryFees]) => (
                            <div key={category} className="bg-white rounded-sm shadow-lg border border-gray-200 overflow-hidden group hover:border-iis-maroon transition-colors">
                                <div className="bg-iis-navy text-white p-4 text-center group-hover:bg-iis-maroon transition-colors">
                                    <h3 className="font-serif text-xl font-bold">{category}</h3>
                                    <p className="text-xs text-slate-300 uppercase tracking-widest">{categorySubtitles[category]}</p>
                                </div>
                                <div className="p-6 text-sm">
                                    <div className="grid grid-cols-3 gap-2 mt-2 mb-4 text-xs font-bold text-iis-maroon uppercase">
                                        <span>Class</span>
                                        <span className="text-right">1st Child</span>
                                        <span className="text-right">2nd Child</span>
                                    </div>

                                    {categoryFees.map((fee) => (
                                        <div key={fee.id} className="grid grid-cols-3 gap-2 py-3 border-b border-gray-50">
                                            <span className="font-bold text-iis-navy">{fee.class_name}</span>
                                            <span className="text-right font-bold text-slate-700">{fee.first_child_fee}</span>
                                            <span className="text-right font-bold text-slate-700">{fee.second_child_fee}</span>
                                        </div>
                                    ))}

                                    {categoryFees.length === 0 && (
                                        <div className="text-center py-8 text-slate-400">No fees set for {category}</div>
                                    )}

                                    <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-center text-slate-400">
                                        Monthly Tuition Fee included
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Important Notes */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
                    <h3 className="font-bold text-blue-900 mb-3">📌 Important Notes:</h3>
                    <ul className="list-disc list-inside text-blue-800 space-y-2 text-sm">
                        <li>All fees are subject to change without prior notice.</li>
                        <li>Second child in the same school gets a discount.</li>
                        <li>For exact details & concessions, contact the school office.</li>
                        <li>Fees must be paid before the 10th of every month.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
