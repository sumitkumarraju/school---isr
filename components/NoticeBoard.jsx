'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function NoticeBoard() {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        const fetchNotices = async () => {
            const { data } = await supabase
                .from('notices')
                .select('*')
                .eq('active', true)
                .order('created_at', { ascending: false });

            if (data) setNotices(data);
        };
        fetchNotices();
    }, []);

    if (notices.length === 0) return null;

    return (
        <section className="py-12 bg-iis-cream border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-2 h-8 bg-iis-maroon"></div>
                    <h2 className="font-serif text-2xl font-bold text-iis-maroon uppercase tracking-wide">Latest Updates</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {notices.map((notice) => (
                        <div key={notice.id} className="bg-white p-6 rounded-sm shadow-sm hover:shadow-md transition-all border-l-4 border-iis-gold">
                            <h3 className="font-bold text-lg text-slate-800 mb-2">{notice.title}</h3>
                            <p className="text-slate-600 text-sm line-clamp-3">{notice.description}</p>
                            <span className="text-xs text-slate-400 mt-4 block font-semibold uppercase">{new Date(notice.created_at).toDateString()}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
