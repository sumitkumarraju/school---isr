'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FaPlus, FaFileAlt, FaTrash, FaEdit } from 'react-icons/fa';
import Modal from '@/components/ui/Modal';

export default function PagesManagement() {
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPage, setNewPage] = useState({ title: '', slug: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        try {
            const { data, error } = await supabase
                .from('pages')
                .select('*')
                .order('updated_at', { ascending: false });

            if (error) throw error;
            setPages(data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const { data, error } = await supabase
                .from('pages')
                .insert([{
                    title: newPage.title,
                    slug: newPage.slug,
                    content: '<h1>New Page</h1>',
                    is_published: false
                }])
                .select();

            if (error) throw error;
            if (data) {
                setPages([data[0], ...pages]);
                setIsModalOpen(false);
                setNewPage({ title: '', slug: '' });
            }
        } catch (error) {
            alert("Failed to create page: " + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-slate-800">Pages Management</h2>
                    <p className="text-sm text-slate-500">Create and edit dynamic pages</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-700 transition-colors"
                >
                    <FaPlus /> New Page
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Title</th>
                            <th className="p-4 font-semibold text-gray-600">Slug</th>
                            <th className="p-4 font-semibold text-gray-600">Status</th>
                            <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pages.map((page) => (
                            <tr key={page.id} className="border-b last:border-0 hover:bg-gray-50">
                                <td className="p-4 font-medium text-slate-800">{page.title}</td>
                                <td className="p-4 text-blue-500 font-mono text-sm">/{page.slug}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${page.is_published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {page.is_published ? 'Published' : 'Draft'}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <button className="text-blue-500 hover:text-blue-700 mr-4"><FaEdit /></button>
                                    <button className="text-red-400 hover:text-red-600"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {!loading && pages.length === 0 && <div className="p-8 text-center text-gray-500">No pages found. Create one to get started.</div>}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Page">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Page Title</label>
                        <input
                            required
                            type="text"
                            value={newPage.title}
                            onChange={(e) => setNewPage({ ...newPage, title: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. Terms & Conditions"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">URL Slug</label>
                        <input
                            required
                            type="text"
                            value={newPage.slug}
                            onChange={(e) => setNewPage({ ...newPage, slug: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. terms-conditions"
                        />
                        <p className="text-xs text-gray-400 mt-1">This will be the page URL: school.com/terms-conditions</p>
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-slate-900 text-white font-bold py-2 rounded hover:bg-slate-700 disabled:opacity-50"
                    >
                        {submitting ? 'Creating...' : 'Create Page'}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
