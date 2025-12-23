'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { FaLayerGroup, FaBullhorn, FaQuoteRight, FaTrophy, FaUserGraduate, FaUserTie, FaBook, FaFileAlt, FaImages, FaSignOutAlt, FaChartPie, FaChalkboardTeacher, FaFilePdf, FaMoneyBillWave } from 'react-icons/fa';



export default function AdminLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            // Allow access to login page without auth
            if (pathname === '/admin/login') {
                setLoading(false);
                return;
            }

            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push('/admin/login');
            }
            setLoading(false);
        };
        checkAuth();
    }, [pathname, router]);

    const isActive = (path) => pathname === path ? 'bg-iis-gold text-iis-navy shadow-md' : 'text-slate-300 hover:bg-white/10 hover:text-white';

    if (loading) return <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600 font-serif">Loading Admin Panel...</div>;

    // If on login page, render only children (no sidebar/layout)
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans">
            {/* SIDEBAR */}
            <aside className="w-64 bg-iis-navy text-white flex flex-col fixed h-full shadow-2xl z-20">
                <div className="p-6 border-b border-slate-700 flex items-center gap-3">
                    <div className="w-10 h-10 bg-iis-gold rounded-full flex items-center justify-center text-iis-navy font-bold text-xl">ॐ</div>
                    <div>
                        <h1 className="font-serif text-xl font-bold tracking-wide">Ishwar Admin</h1>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider">Control Panel</p>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">

                    <div className="text-xs font-bold text-slate-500 uppercase px-3 mt-2 mb-1">Main</div>
                    <Link href="/admin/dashboard" className={`flex items-center gap-3 px-3 py-3 rounded-md transition-all ${isActive('/admin/dashboard')}`}>
                        <FaChartPie /> <span>Dashboard</span>
                    </Link>

                    <div className="text-xs font-bold text-slate-500 uppercase px-3 mt-6 mb-1">Content Management</div>
                    <Link href="/admin/hero" className={`flex items-center gap-3 px-3 py-3 rounded-md transition-all ${isActive('/admin/hero')}`}>
                        <FaLayerGroup /> <span>Hero & Slider</span>
                    </Link>
                    <Link href="/admin/notices" className={`flex items-center gap-3 px-3 py-3 rounded-md transition-all ${isActive('/admin/notices')}`}>
                        <FaBullhorn /> <span>Notice Board</span>
                    </Link>
                    <Link href="/admin/quotes" className={`flex items-center gap-3 px-3 py-3 rounded-md transition-all ${isActive('/admin/quotes')}`}>
                        <FaQuoteRight /> <span>Words of Wisdom</span>
                    </Link>
                    <Link href="/admin/achievers" className={`flex items-center gap-3 px-3 py-3 rounded-md transition-all ${isActive('/admin/achievers')}`}>
                        <FaTrophy /> <span>Academic Achievers</span>
                    </Link>
                    {/* <Link href="/admin/leadership" className={`flex items-center gap-3 px-3 py-3 rounded-md transition-all ${isActive('/admin/leadership')}`}>
                        <FaUserGraduate /> <span>Leadership Messages</span>
                    </Link> */}

                    <div className="text-xs font-bold text-slate-500 uppercase px-3 mt-6 mb-1">School Management</div>
                    <Link href="/admin/inquiries" className={`flex items-center gap-3 px-3 py-3 rounded-md transition-all ${isActive('/admin/inquiries')}`}>
                        <FaUserGraduate /> <span>Inquiries</span>
                    </Link>
                    <Link href="/admin/staff" className={`flex items-center gap-3 px-3 py-3 rounded-md transition-all ${isActive('/admin/staff')}`}>
                        <FaChalkboardTeacher /> <span>Faculty / Staff</span>
                    </Link>
                    <Link href="/admin/admissions" className={`flex items-center gap-3 px-3 py-3 rounded-md transition-all ${isActive('/admin/admissions')}`}>
                        <FaUserGraduate /> <span>Admissions</span>
                    </Link>
                    <Link href="/admin/fees" className={`flex items-center gap-3 px-3 py-3 rounded-md transition-all ${isActive('/admin/fees')}`}>
                        <FaMoneyBillWave /> <span>Fee Structure</span>
                    </Link>
                    <Link href="/admin/gallery" className={`flex items-center gap-3 px-3 py-3 rounded-md transition-all ${isActive('/admin/gallery')}`}>
                        <FaImages /> <span>Gallery & Kids Zone</span>
                    </Link>
                    <Link href="/admin/public-disclosure" className={`flex items-center gap-3 px-3 py-3 rounded-md transition-all ${isActive('/admin/public-disclosure')}`}>
                        <FaFilePdf /> <span>Public Disclosure</span>
                    </Link>

                </nav>

                <div className="p-4 border-t border-slate-700">
                    <button onClick={async () => { await supabase.auth.signOut(); router.push('/admin/login'); }} className="flex items-center gap-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-white/5 rounded transition w-full text-left">
                        <FaSignOutAlt /> <span>Log Out</span>
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 ml-64 p-8 bg-slate-50 min-h-screen">
                {children}
            </main>
        </div>
    );
}
