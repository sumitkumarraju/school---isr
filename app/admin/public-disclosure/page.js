'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FaCloudUploadAlt, FaTrash, FaEye, FaFilePdf } from 'react-icons/fa';
import Modal from '@/components/ui/Modal';

export default function PublicDisclosurePage() {
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newDoc, setNewDoc] = useState({ title: '', url: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => { fetchDocs(); }, []);

    const fetchDocs = async () => {
        const { data, error } = await supabase.from('public_disclosures').select('*').order('uploaded_at', { ascending: false });
        if (!error) setDocs(data || []);
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const { data, error } = await supabase
            .from('public_disclosures')
            .insert([{ title: newDoc.title, file_url: newDoc.url }])
            .select();

        if (!error && data) {
            setDocs([data[0], ...docs]);
            setIsModalOpen(false);
            setNewDoc({ title: '', url: '' });
        } else {
            alert("Failed to Add Document");
        }
        setSubmitting(false);
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete?")) return;
        const { error } = await supabase.from('public_disclosures').delete().eq('id', id);
        if (!error) setDocs(docs.filter(d => d.id !== id));
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-iis-navy">Public Disclosure</h2>
                    <p className="text-sm text-slate-500">Mandatory CBSE Documents (PDFs only)</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-700 transition-colors shadow"
                >
                    <FaCloudUploadAlt /> Add Document
                </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-slate-50 cursor-pointer hover:border-iis-gold hover:bg-slate-100 transition group"
                >
                    <FaCloudUploadAlt className="mx-auto text-4xl text-gray-300 mb-3 group-hover:text-iis-gold transition-colors" />
                    <p className="text-sm text-slate-600 font-medium">Click to Add New Document</p>
                    <p className="text-xs text-slate-400 mt-1">Supported formats: PDF</p>
                </div>
            </div>

            <div className="space-y-3">
                {loading ? <div className="text-center text-gray-500">Loading documents...</div> : docs.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between bg-white p-4 rounded shadow-sm border-l-4 border-red-500 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-red-50 rounded flex items-center justify-center text-red-500">
                                <FaFilePdf size={20} />
                            </div>
                            <span className="font-medium text-slate-700">{doc.title}</span>
                        </div>
                        <div className="flex gap-3 text-sm">
                            <a href={doc.file_url} target="_blank" className="px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 font-medium">View</a>
                            <button onClick={() => handleDelete(doc.id)} className="px-3 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 font-medium">Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {!loading && docs.length === 0 && <div className="text-center text-gray-400 mt-8">No public disclosure documents found.</div>}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Disclosure Document">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Document Title</label>
                        <input
                            required
                            type="text"
                            value={newDoc.title}
                            onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-iis-navy outline-none"
                            placeholder="e.g. Fees Structure 2025-26"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">File URL (PDF)</label>
                        <input
                            required
                            type="url"
                            value={newDoc.url}
                            onChange={(e) => setNewDoc({ ...newDoc, url: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-iis-navy outline-none"
                            placeholder="https://..."
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-iis-navy text-white font-bold py-2 rounded hover:bg-slate-800 disabled:opacity-50"
                    >
                        {submitting ? 'Adding...' : 'Add Document'}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
