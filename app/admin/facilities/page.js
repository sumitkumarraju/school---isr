'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FaPlus, FaBuilding, FaTrash, FaCheck } from 'react-icons/fa';
import Modal from '@/components/ui/Modal';

export default function FacilitiesPage() {
    const [facilities, setFacilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newFacility, setNewFacility] = useState({ title: '', description: '', icon_class: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchFacilities();
    }, []);

    const fetchFacilities = async () => {
        try {
            const { data, error } = await supabase
                .from('facilities')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setFacilities(data || []);
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
                .from('facilities')
                .insert([{
                    title: newFacility.title,
                    description: newFacility.description || '',
                    icon_class: newFacility.icon_class || 'fa-solid fa-building'
                }])
                .select();

            if (error) throw error;
            if (data) {
                setFacilities([data[0], ...facilities]);
                setIsModalOpen(false);
                setNewFacility({ title: '', description: '', icon_class: '' });
            }
        } catch (error) {
            alert("Failed to add facility: " + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this facility?")) return;
        try {
            const { error } = await supabase.from('facilities').delete().eq('id', id);
            if (error) throw error;
            setFacilities(facilities.filter(f => f.id !== id));
        } catch (error) {
            alert("Failed to delete");
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-slate-800">Facilities Management</h2>
                    <p className="text-sm text-slate-500">Manage school infrastructure showcase</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-700 transition-colors"
                >
                    <FaPlus /> Add Facility
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {facilities.map((item) => (
                    <div key={item.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 relative group hover:-translate-y-1 transition-transform">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-700 text-xl mb-4">
                            <i className={item.icon_class || 'fa-solid fa-building'}></i>
                        </div>
                        <h3 className="font-bold text-lg text-slate-800 mb-2">{item.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed max-h-24 overflow-hidden">{item.description}</p>

                        <button
                            onClick={() => handleDelete(item.id)}
                            className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <FaTrash />
                        </button>
                    </div>
                ))}
            </div>

            {!loading && facilities.length === 0 && (
                <div className="text-center py-12 bg-white rounded border border-gray-100 text-gray-400">
                    No facilities added yet.
                </div>
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Facility">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Facility Title</label>
                        <input
                            required
                            type="text"
                            value={newFacility.title}
                            onChange={(e) => setNewFacility({ ...newFacility, title: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. Science Lab"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                        <textarea
                            rows={3}
                            value={newFacility.description}
                            onChange={(e) => setNewFacility({ ...newFacility, description: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                            placeholder="Brief description..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Icon Class (FontAwesome)</label>
                        <input
                            type="text"
                            value={newFacility.icon_class}
                            onChange={(e) => setNewFacility({ ...newFacility, icon_class: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. fa-solid fa-flask"
                        />
                        <p className="text-xs text-gray-400 mt-1">Use FontAwesome classes (e.g., fa-solid fa-book)</p>
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-slate-900 text-white font-bold py-2 rounded hover:bg-slate-700 disabled:opacity-50"
                    >
                        {submitting ? 'Adding...' : 'Add Facility'}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
