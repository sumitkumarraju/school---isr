'use client';

export default function Dashboard() {
    return (
        <div>
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-iis-navy to-slate-800 text-white p-8 rounded-xl shadow-lg mb-8">
                <h1 className="text-3xl font-serif font-bold mb-2">Welcome back, Admin! 👋</h1>
                <p className="opacity-80">Everything looks good today. <span className="font-bold text-iis-gold">Check your notices</span> and <span className="font-bold text-iis-gold">upcoming events</span>.</p>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-iis-gold">
                    <p className="text-xs font-bold text-slate-400 uppercase">Total Students</p>
                    <p className="text-3xl font-bold text-slate-800">1,250</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                    <p className="text-xs font-bold text-slate-400 uppercase">Faculty Members</p>
                    <p className="text-3xl font-bold text-slate-800">20+</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
                    <p className="text-xs font-bold text-slate-400 uppercase">Active Notices</p>
                    <p className="text-3xl font-bold text-slate-800">4</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-red-500">
                    <p className="text-xs font-bold text-slate-400 uppercase">Gallery Images</p>
                    <p className="text-3xl font-bold text-slate-800">300+</p>
                </div>
            </div>

            {/* Shortcuts */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="font-bold text-slate-800 mb-4 border-b pb-2">Quick Shortcuts</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <a href="/admin/notices" className="p-4 bg-slate-50 hover:bg-iis-cream rounded text-slate-700 text-sm font-medium transition flex flex-col items-center gap-2">
                            <span className="text-2xl text-iis-maroon">+</span> Add Notice
                        </a>
                        <a href="/admin/gallery" className="p-4 bg-slate-50 hover:bg-iis-cream rounded text-slate-700 text-sm font-medium transition flex flex-col items-center gap-2">
                            <span className="text-2xl text-iis-maroon">📷</span> Upload Photo
                        </a>
                        <a href="/admin/admissions" className="p-4 bg-slate-50 hover:bg-iis-cream rounded text-slate-700 text-sm font-medium transition flex flex-col items-center gap-2">
                            <span className="text-2xl text-iis-maroon">🎓</span> View Admissions
                        </a>
                        <a href="/admin/quotes" className="p-4 bg-slate-50 hover:bg-iis-cream rounded text-slate-700 text-sm font-medium transition flex flex-col items-center gap-2">
                            <span className="text-2xl text-iis-maroon">❝</span> Update Quote
                        </a>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="font-bold text-slate-800 mb-4 border-b pb-2">Recent Updates</h3>
                    <ul className="space-y-3 text-sm text-slate-600">
                        <li className="flex justify-between"><span>System is active and running</span> <span className="text-xs text-slate-400">Just now</span></li>
                        <li className="flex justify-between"><span>Gallery images synced</span> <span className="text-xs text-slate-400">Today</span></li>
                        <li className="flex justify-between"><span>Notices updated</span> <span className="text-xs text-slate-400">Today</span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
