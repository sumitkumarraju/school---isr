'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FaPlus, FaUserTie, FaTrash, FaPen } from 'react-icons/fa';
import Image from 'next/image';
import Modal from '@/components/ui/Modal';

export default function StaffPage() {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newStaff, setNewStaff] = useState({ name: '', designation: '', image_url: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            const { data, error } = await supabase
                .from('staff')
                .select('*')
                .order('display_order', { ascending: true });

            if (error) throw error;
            setStaff(data || []);
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
                .from('staff')
                .insert([{
                    name: newStaff.name,
                    designation: newStaff.designation,
                    image_url: newStaff.image_url || '',
                    active: true
                }])
                .select();

            if (error) throw error;
            if (data) {
                setStaff([...staff, data[0]]);
                setIsModalOpen(false);
                setNewStaff({ name: '', designation: '', image_url: '' });
            }
        } catch (error) {
            alert("Failed to add staff: " + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this staff member?")) return;
        try {
            const { error } = await supabase.from('staff').delete().eq('id', id);
            if (error) throw error;
            setStaff(staff.filter(s => s.id !== id));
        } catch (error) {
            alert("Failed to delete");
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-slate-800">Staff Management</h2>
                    <p className="text-sm text-slate-500">Manage faculty and staff profiles</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-700 transition-colors"
                >
                    <FaPlus /> Add Staff
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {staff.map((person) => (
                    <div key={person.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4 relative group">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                            {person.image_url ? (
                                <img src={person.image_url} alt={person.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    <FaUserTie size={24} />
                                </div>
                            )}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">{person.name}</h3>
                            <p className="text-sm text-slate-500">{person.designation}</p>
                        </div>
                        <button
                            onClick={() => handleDelete(person.id)}
                            className="absolute top-2 right-2 text-red-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <FaTrash />
                        </button>
                    </div>
                ))}
            </div>

            {!loading && staff.length === 0 && (
                <div className="text-center py-12 bg-white rounded border border-gray-100 text-gray-400">
                    No staff members found.
                </div>
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Staff Member">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                        <input
                            required
                            type="text"
                            value={newStaff.name}
                            onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. Dr. John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Designation</label>
                        <input
                            required
                            type="text"
                            value={newStaff.designation}
                            onChange={(e) => setNewStaff({ ...newStaff, designation: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. Principal"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Profile Image URL</label>
                        <input
                            type="url"
                            value={newStaff.image_url}
                            onChange={(e) => setNewStaff({ ...newStaff, image_url: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="https://..."
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-slate-900 text-white font-bold py-2 rounded hover:bg-slate-700 disabled:opacity-50"
                    >
                        {submitting ? 'Adding...' : 'Add Staff'}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
