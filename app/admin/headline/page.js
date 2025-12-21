'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FaPlus, FaNewspaper, FaTrash, FaExternalLinkAlt } from 'react-icons/fa';
import Modal from '@/components/ui/Modal';

export default function HeadlinePage() {
    const [headlines, setHeadlines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newHeadline, setNewHeadline] = useState({ title: '', link: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchHeadlines();
    }, []);

    const fetchHeadlines = async () => {
        try {
            const { data, error } = await supabase
                .from('headlines')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setHeadlines(data || []);
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
                .from('headlines')
                .insert([{ title: newHeadline.title, link: newHeadline.link || '', active: true }])
                .select();

            if (error) throw error;

            if (data) {
                setHeadlines([data[0], ...headlines]);
                setIsModalOpen(false);
                setNewHeadline({ title: '', link: '' });
            }
        } catch (error) {
            alert("Failed to add headline: " + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleToggle = async (id, currentStatus) => {
        try {
            const { error } = await supabase
                .from('headlines')
                .update({ active: !currentStatus })
                .eq('id', id);

            if (error) throw error;
            setHeadlines(headlines.map(h => h.id === id ? { ...h, active: !currentStatus } : h));
        } catch (error) {
            alert("Failed to update status");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this headline?")) return;
        try {
            const { error } = await supabase
                .from('headlines')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setHeadlines(headlines.filter(h => h.id !== id));
        } catch (error) {
            alert("Failed to delete");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-slate-800">Headline Management</h2>
                    <p className="text-sm text-slate-500">Manage scrolling ticker updates</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-700 transition-colors"
                >
                    <FaPlus /> Add Headline
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                {loading ? <div className="p-4 text-center">Loading...</div> : headlines.map((item) => (
                    <div key={item.id} className="p-4 border-b last:border-0 flex items-center justify-between hover:bg-gray-50">
                        <div className="flex items-center gap-4 flex-1">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.active ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                                <FaNewspaper />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-slate-800 truncate">{item.title}</p>
                                {item.link && (
                                    <a href={item.link} target="_blank" className="text-xs text-blue-500 flex items-center gap-1 hover:underline">
                                        <FaExternalLinkAlt size={10} /> {item.link}
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 ml-4">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={item.active}
                                    onChange={() => handleToggle(item.id, item.active)}
                                    className="sr-only peer"
                                />
                                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="text-red-400 hover:text-red-600 p-2"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
                {!loading && headlines.length === 0 && <div className="p-4 text-center text-gray-500">No headlines found</div>}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Headline">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Headline Text</label>
                        <textarea
                            required
                            rows={2}
                            value={newHeadline.title}
                            onChange={(e) => setNewHeadline({ ...newHeadline, title: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                            placeholder="Enter the ticker text..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Link URL (Optional)</label>
                        <input
                            type="url"
                            value={newHeadline.link}
                            onChange={(e) => setNewHeadline({ ...newHeadline, link: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="https://example.com/details"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-slate-900 text-white font-bold py-2 rounded hover:bg-slate-700 disabled:opacity-50"
                    >
                        {submitting ? 'Adding...' : 'Add Headline'}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
