'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FaSearch, FaCheck, FaTrash, FaFileCsv } from 'react-icons/fa';

export const dynamic = 'force-dynamic';

export default function InquiriesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const { data, error } = await supabase
                .from('enquiries')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setInquiries(data || []);
        } catch (error) {
            console.error('Failed to fetch inquiries:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this inquiry?')) return;

        try {
            const { error } = await supabase
                .from('enquiries')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setInquiries(inquiries.filter(item => item.id !== id));
        } catch (error) {
            alert('Failed to delete inquiry');
        }
    };

    const filteredData = inquiries.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.mobile && item.mobile.includes(searchTerm)) ||
        (item.phone && item.phone.includes(searchTerm))
    );

    return (
        <div className="bg-white rounded-lg shadow-sm min-h-[80vh]">
            {/* Header Toolbar */}
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-slate-800">Admission Inquiries</h2>
                    <p className="text-sm text-slate-500">Manage online form submissions</p>
                </div>

                <div className="flex gap-3">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search name or mobile..."
                            className="pl-10 pr-4 py-2 border rounded-full text-sm focus:border-red-900 outline-none w-64"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700">
                        <FaFileCsv /> Export
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                {loading ? (
                    <div className="p-12 text-center text-slate-400">Loading...</div>
                ) : (
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-slate-800 font-bold uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Phone</th>
                                <th className="px-6 py-4">Message</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredData.map((row) => (
                                <tr key={row.id} className="hover:bg-slate-50 transition">
                                    <td className="px-6 py-4">{new Date(row.created_at).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 font-medium text-slate-900">{row.name}</td>
                                    <td className="px-6 py-4">{row.email}</td>
                                    <td className="px-6 py-4">{row.phone}</td>
                                    <td className="px-6 py-4">
                                        <div className="text-xs text-slate-400 truncate w-32" title={row.message}>{row.message}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${row.status === 'new' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                            {row.status || 'new'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                                        <button onClick={() => handleDelete(row.id)} className="p-2 text-red-600 hover:bg-red-50 rounded" title="Delete">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {!loading && filteredData.length === 0 && (
                <div className="p-12 text-center text-slate-400">
                    No inquiries found matching your search.
                </div>
            )}
        </div>
    );
}
