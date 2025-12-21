'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FaPlus, FaCloudUploadAlt, FaTrash, FaEye, FaFilePdf } from 'react-icons/fa';
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
        <div className="max-w-5xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-slate-800">Public Disclosure</h2>
                    <p className="text-sm text-slate-500">Mandatory CBSE Disclosures</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-700 transition-colors"
                >
                    <FaCloudUploadAlt /> Add Document
                </button>
            </div>

            <div className="grid gap-4">
                {docs.map(doc => (
                    <div key={doc.id} className="bg-white p-4 rounded border flex justify-between items-center shadow-sm">
                        <div className="flex items-center gap-3">
                            <FaFilePdf className="text-red-500" size={24} />
                            <span className="font-medium text-slate-700">{doc.title}</span>
                        </div>
                        <div className="flex gap-3">
                            <a href={doc.file_url} target="_blank" className="text-gray-500 hover:text-blue-500"><FaEye /></a>
                            <button onClick={() => handleDelete(doc.id)} className="text-gray-400 hover:text-red-500"><FaTrash /></button>
                        </div>
                    </div>
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Disclosure Document">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Document Title</label>
                        <input
                            required
                            type="text"
                            value={newDoc.title}
                            onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
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
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="https://..."
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-slate-900 text-white font-bold py-2 rounded hover:bg-slate-700 disabled:opacity-50"
                    >
                        {submitting ? 'Adding...' : 'Add Document'}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
