'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FaSearch, FaEye, FaTrash, FaFileCsv } from 'react-icons/fa';

export default function StudentApplicationsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedApp, setSelectedApp] = useState(null); // For detail view modal

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const { data, error } = await supabase
                .from('admissions')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setApplications(data || []);
        } catch (error) {
            console.error('Failed to fetch applications:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this application?')) return;
        try {
            const { error } = await supabase
                .from('admissions')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setApplications(applications.filter(app => app.id !== id));
        } catch (error) {
            alert('Delete failed');
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            const { error } = await supabase
                .from('admissions')
                .update({ status: newStatus })
                .eq('id', id);

            if (error) throw error;

            setApplications(applications.map(app => app.id === id ? { ...app, status: newStatus } : app));
            if (selectedApp) setSelectedApp({ ...selectedApp, status: newStatus });
        } catch (error) {
            alert('Status update failed');
        }
    };

    const filteredData = applications.filter(item =>
        item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.mobile.includes(searchTerm)
    );

    return (
        <div className="bg-white rounded-lg shadow-sm min-h-[80vh]">
            {/* Header Toolbar */}
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-slate-800">Student Applications</h2>
                    <p className="text-sm text-slate-500">Review detailed admission forms</p>
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
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-800 font-bold uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4">Applied Date</th>
                            <th className="px-6 py-4">Student Name</th>
                            <th className="px-6 py-4">Class</th>
                            <th className="px-6 py-4">Parent Info</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? <tr><td colSpan="6" className="p-6 text-center">Loading...</td></tr> : filteredData.map((row) => (
                            <tr key={row.id} className="hover:bg-slate-50 transition">
                                <td className="px-6 py-4">{new Date(row.created_at).toLocaleDateString()}</td>
                                <td className="px-6 py-4 font-medium text-slate-900">
                                    {row.first_name} {row.last_name}
                                    <div className="text-xs text-slate-400">{row.gender}, {row.dob}</div>
                                </td>
                                <td className="px-6 py-4">{row.class_applying_for}</td>
                                <td className="px-6 py-4">
                                    <div className="font-medium">{row.father_name}</div>
                                    <div className="text-xs text-slate-400">{row.mobile}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <select
                                        value={row.status || 'New'}
                                        onChange={(e) => updateStatus(row.id, e.target.value)}
                                        className={`px-2 py-1 rounded-full text-xs font-bold border-none outline-none cursor-pointer ${row.status === 'New' ? 'bg-blue-100 text-blue-700' :
                                            row.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                                                row.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}
                                    >
                                        <option value="New">New</option>
                                        <option value="Under Review">Under Review</option>
                                        <option value="Accepted">Accepted</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </td>
                                <td className="px-6 py-4 text-right flex justify-end gap-2">
                                    <button
                                        onClick={() => setSelectedApp(row)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                        title="View Details"
                                    >
                                        <FaEye />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(row.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                                        title="Delete"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {!loading && filteredData.length === 0 && (
                <div className="p-12 text-center text-slate-400">
                    No applications found.
                </div>
            )}

            {/* Detail Modal */}
            {selectedApp && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b flex justify-between items-center bg-slate-50">
                            <h3 className="text-xl font-bold text-slate-800">Application Details</h3>
                            <button onClick={() => setSelectedApp(null)} className="text-slate-500 hover:text-slate-700">✕</button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-xs font-bold uppercase text-slate-400 mb-1">Student Name</h4>
                                    <p className="font-semibold">{selectedApp.first_name} {selectedApp.last_name}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase text-slate-400 mb-1">Applying For</h4>
                                    <p className="font-semibold">{selectedApp.class_applying_for}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase text-slate-400 mb-1">Gender / DOB</h4>
                                    <p>{selectedApp.gender} / {selectedApp.dob}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase text-slate-400 mb-1">Previous School</h4>
                                    <p>{selectedApp.previous_school || 'N/A'} ({selectedApp.last_grade_percentage || 'N/A'})</p>
                                </div>
                            </div>

                            <hr />

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-xs font-bold uppercase text-slate-400 mb-1">Father's Name</h4>
                                    <p className="font-semibold">{selectedApp.father_name}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase text-slate-400 mb-1">Contact</h4>
                                    <p>{selectedApp.mobile}</p>
                                    <p className="text-sm text-slate-500">{selectedApp.email}</p>
                                </div>
                                <div className="col-span-2">
                                    <h4 className="text-xs font-bold uppercase text-slate-400 mb-1">Address</h4>
                                    <p>{selectedApp.address || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t bg-slate-50 flex justify-end">
                            <button
                                onClick={() => setSelectedApp(null)}
                                className="bg-slate-800 text-white px-6 py-2 rounded hover:bg-slate-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
