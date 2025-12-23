'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Plus, Megaphone, Trash2 } from 'lucide-react';
import Modal from '@/components/ui/Modal';

export default function NoticesPage() {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newNotice, setNewNotice] = useState({ title: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const { data, error } = await supabase
                .from('notices')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setNotices(data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newNotice.title.trim()) return;
        setSubmitting(true);

        try {
            const { data, error } = await supabase
                .from('notices')
                .insert([{ title: newNotice.title, description: '', active: true }])
                .select();

            if (error) throw error;

            if (data) {
                setNotices([data[0], ...notices]);
                setIsModalOpen(false);
                setNewNotice({ title: '' });
            }
        } catch (error) {
            alert("Failed to add notice: " + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleToggle = async (id, currentStatus) => {
        try {
            const { error } = await supabase
                .from('notices')
                .update({ active: !currentStatus })
                .eq('id', id);

            if (error) throw error;

            setNotices(notices.map(n => n.id === id ? { ...n, active: !currentStatus } : n));
        } catch (error) {
            alert("Failed to update status");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this notice?")) return;
        try {
            const { error } = await supabase
                .from('notices')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setNotices(notices.filter(n => n.id !== id));
        } catch (error) {
            alert("Failed to delete");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-slate-800">Notices & Circulars</h2>
                    <p className="text-sm text-slate-500">Updates scrolling on the homepage</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-700 transition-colors"
                >
                    <Plus size={18} /> Add Notice
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                {loading ? <div className="p-4 text-center">Loading...</div> : notices.map((notice) => (
                    <div key={notice.id} className="p-4 border-b last:border-0 flex items-center justify-between hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${notice.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                <Megaphone size={20} />
                            </div>
                            <div>
                                <p className="font-medium text-slate-800">{notice.title}</p>
                                <p className="text-xs text-slate-400">{notice.active ? 'Visible on Homepage' : 'Hidden'}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={notice.active}
                                    onChange={() => handleToggle(notice.id, notice.active)}
                                    className="sr-only peer"
                                />
                                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                            </label>
                            <button
                                onClick={() => handleDelete(notice.id)}
                                className="text-red-400 hover:text-red-600 p-2"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
                {!loading && notices.length === 0 && <div className="p-4 text-center text-gray-500">No notices found</div>}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Notice">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Notice Title</label>
                        <textarea
                            required
                            rows={3}
                            value={newNotice.title}
                            onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                            placeholder="Type notice content here..."
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-slate-900 text-white font-bold py-2 rounded hover:bg-slate-700 disabled:opacity-50"
                    >
                        {submitting ? 'Adding...' : 'Add Notice'}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
