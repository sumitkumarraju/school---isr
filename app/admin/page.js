import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-6 font-serif">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Link href="/admin/admissions" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-l-4 border-blue-500">
                    <h3 className="font-bold text-gray-400 uppercase text-xs tracking-wider">Admissions</h3>
                    <p className="text-2xl font-bold text-slate-800 mt-2">Manage Dates</p>
                </Link>
                <Link href="/admin/gallery" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-l-4 border-green-500">
                    <h3 className="font-bold text-gray-400 uppercase text-xs tracking-wider">Gallery</h3>
                    <p className="text-2xl font-bold text-slate-800 mt-2">Update Photos</p>
                </Link>
                <Link href="/admin/notices" className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow border-l-4 border-purple-500">
                    <h3 className="font-bold text-gray-400 uppercase text-xs tracking-wider">Notices</h3>
                    <p className="text-2xl font-bold text-slate-800 mt-2">Post Updates</p>
                </Link>
            </div>

            <div className="bg-white p-6 rounded shadow">
                <h2 className="text-xl font-bold mb-4">Quick Tips</h2>
                <ul className="list-disc ml-5 space-y-2 text-slate-600">
                    <li>Use the <strong>Gallery</strong> section to add new event photos. copy/paste image addresses for now.</li>
                    <li>Set <strong>Admission</strong> start/end dates to automatically show the "Admissions Open" banner on the main site.</li>
                    <li><strong>Notices</strong> will appear in the news ticker or dedicated section on the homepage.</li>
                </ul>
            </div>
        </div>
    );
}
