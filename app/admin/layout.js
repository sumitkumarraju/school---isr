'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { FaChartPie, FaImages, FaUserGraduate, FaCog } from 'react-icons/fa';

export const dynamic = 'force-dynamic';

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

    if (loading) return <div className="flex min-h-screen items-center justify-center">Loading Admin Panel...</div>;

    // If on login page, render only children (no sidebar/layout)
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white hidden md:block">
                <div className="p-6 font-bold text-xl border-b border-slate-800">Admin Panel</div>
                <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-100px)]">
                    <div className="text-xs font-bold text-slate-500 uppercase px-3 mt-4 mb-2">Overview</div>
                    <Link href="/admin" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded transition-colors">
                        <FaChartPie /> Dashboard
                    </Link>

                    <div className="text-xs font-bold text-slate-500 uppercase px-3 mt-4 mb-2">Student & Staff</div>
                    <Link href="/admin/student-applications" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded transition-colors">
                        <FaUserGraduate /> Applications
                    </Link>
                    <Link href="/admin/inquiries" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded transition-colors">
                        <FaUserGraduate /> Inquiries
                    </Link>
                    <Link href="/admin/student-corner" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded transition-colors">
                        <FaUserGraduate /> Student Corner
                    </Link>
                    <Link href="/admin/staff" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded transition-colors">
                        <FaUserGraduate /> Staff Mgmt
                    </Link>

                    <div className="text-xs font-bold text-slate-500 uppercase px-3 mt-4 mb-2">Content Management</div>
                    <Link href="/admin/notices" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded transition-colors">
                        <FaCog /> Notices
                    </Link>
                    <Link href="/admin/special-notice" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded transition-colors">
                        <FaCog /> Special Notice
                    </Link>
                    <Link href="/admin/headline" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded transition-colors">
                        <FaCog /> Headline Mgmt
                    </Link>
                    <Link href="/admin/quotes" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded transition-colors">
                        <FaCog /> Quotes
                    </Link>
                    <Link href="/admin/gallery" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded transition-colors">
                        <FaImages /> Gallery
                    </Link>
                    <Link href="/admin/facilities" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded transition-colors">
                        <FaImages /> Facilities
                    </Link>
                    <Link href="/admin/public-disclosure" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded transition-colors">
                        <FaImages /> Public Disclosure
                    </Link>

                    <div className="text-xs font-bold text-slate-500 uppercase px-3 mt-4 mb-2">Site Settings</div>
                    <Link href="/admin/menu" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded transition-colors">
                        <FaCog /> Menu Mgmt
                    </Link>
                    <Link href="/admin/pages" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded transition-colors">
                        <FaCog /> Pages Mgmt
                    </Link>
                    <Link href="/admin/users" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded transition-colors">
                        <FaCog /> Users Mgmt
                    </Link>
                    <Link href="/admin/visitors" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded transition-colors">
                        <FaCog /> Visitors
                    </Link>
                    <Link href="/admin/change-password" className="flex items-center gap-3 p-3 hover:bg-slate-800 rounded transition-colors">
                        <FaCog /> Change Password
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
