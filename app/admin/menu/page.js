'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FaPlus, FaBars, FaTrash, FaSave } from 'react-icons/fa';
import Modal from '@/components/ui/Modal';

export default function MenuPage() {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newMenu, setNewMenu] = useState({ label: '', path: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchMenus();
    }, []);

    const fetchMenus = async () => {
        try {
            const { data, error } = await supabase
                .from('menus')
                .select('*')
                .order('display_order', { ascending: true });

            if (error) throw error;
            setMenus(data || []);
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
                .from('menus')
                .insert([{
                    label: newMenu.label,
                    path: newMenu.path || '#',
                    active: true,
                    display_order: menus.length + 1
                }])
                .select();

            if (error) throw error;
            if (data) {
                setMenus([...menus, data[0]]);
                setIsModalOpen(false);
                setNewMenu({ label: '', path: '' });
            }
        } catch (error) {
            alert("Failed to add menu: " + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this menu item?")) return;
        try {
            const { error } = await supabase.from('menus').delete().eq('id', id);
            if (error) throw error;
            setMenus(menus.filter(m => m.id !== id));
        } catch (error) {
            alert("Failed to delete");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-slate-800">Menu Management</h2>
                    <p className="text-sm text-slate-500">Configure website navigation links</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-700 transition-colors"
                >
                    <FaPlus /> Add Item
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                {menus.map((item) => (
                    <div key={item.id} className="p-4 border-b last:border-0 flex items-center justify-between hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                            <div className="text-gray-400 cursor-move"><FaBars /></div>
                            <div>
                                <p className="font-bold text-slate-800">{item.label}</p>
                                <p className="text-xs text-blue-500 font-mono">{item.path}</p>
                            </div>
                        </div>
                        <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-600 p-2">
                            <FaTrash />
                        </button>
                    </div>
                ))}
                {!loading && menus.length === 0 && <div className="p-4 text-center text-gray-500">No menu items found.</div>}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Menu Item">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Label</label>
                        <input
                            required
                            type="text"
                            value={newMenu.label}
                            onChange={(e) => setNewMenu({ ...newMenu, label: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. About Us"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Path/URL</label>
                        <input
                            required
                            type="text"
                            value={newMenu.path}
                            onChange={(e) => setNewMenu({ ...newMenu, path: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. /about or https://google.com"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-slate-900 text-white font-bold py-2 rounded hover:bg-slate-700 disabled:opacity-50"
                    >
                        {submitting ? 'Adding...' : 'Add Menu Item'}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
