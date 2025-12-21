'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FaPlus, FaBell, FaTrash } from 'react-icons/fa';
import Modal from '@/components/ui/Modal';

export default function SpecialNoticePage() {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newNotice, setNewNotice] = useState({ title: '', content: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchNotices();
    }, []);

    const fetchNotices = async () => {
        try {
            const { data, error } = await supabase.from('special_notices').select('*').order('created_at', { ascending: false });
            if (error) throw error;
            setNotices(data || []);
        } catch (error) { console.error(error); }
        finally { setLoading(false); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            // Deactivate all others first (optional rule)
            await supabase.from('special_notices').update({ active: false }).neq('id', '00000000-0000-0000-0000-000000000000');

            const { data, error } = await supabase
                .from('special_notices')
                .insert([{ title: newNotice.title, content: newNotice.content || '', active: true }])
                .select();

            if (error) throw error;
            if (data) {
                fetchNotices(); // Refresh to see updated active states
                setIsModalOpen(false);
                setNewNotice({ title: '', content: '' });
            }
        } catch (error) {
            alert("Failed to add notice: " + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this?")) return;
        const { error } = await supabase.from('special_notices').delete().eq('id', id);
        if (!error) setNotices(notices.filter(n => n.id !== id));
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-slate-800">Special Notice (Popup)</h2>
                    <p className="text-sm text-slate-500">Manage modal popups for urgent announcements</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-700 transition-colors"
                >
                    <FaPlus /> Set Active Notice
                </button>
            </div>

            <div className="space-y-4">
                {notices.map((notice) => (
                    <div key={notice.id} className={`p-6 rounded-lg border flex justify-between items-start ${notice.active ? 'bg-red-50 border-red-200' : 'bg-white border-gray-100'}`}>
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-bold text-lg text-slate-800">{notice.title}</h3>
                                {notice.active && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded font-bold uppercase">Active</span>}
                            </div>
                            <p className="text-slate-600">{notice.content}</p>
                        </div>
                        <button onClick={() => handleDelete(notice.id)} className="text-gray-400 hover:text-red-500"><FaTrash /></button>
                    </div>
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Special Notice">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Title</label>
                        <input
                            required
                            type="text"
                            value={newNotice.title}
                            onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. Urgent Update"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Message Content</label>
                        <textarea
                            required
                            rows={4}
                            value={newNotice.content}
                            onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                            placeholder="Type the full message here..."
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-slate-900 text-white font-bold py-2 rounded hover:bg-slate-700 disabled:opacity-50"
                    >
                        {submitting ? 'Setting as Active...' : 'Create & Activate'}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
