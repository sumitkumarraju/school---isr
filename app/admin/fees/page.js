'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Plus, Edit, Trash2, DollarSign } from 'lucide-react';

export default function FeesManager() {
    const [fees, setFees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFee, setEditingFee] = useState(null);
    const [newFee, setNewFee] = useState({
        class_name: '',
        first_child_fee: '',
        second_child_fee: '',
        category: 'Pre-Primary'
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchFees();
    }, []);

    const fetchFees = async () => {
        const { data, error } = await supabase
            .from('fees')
            .select('*')
            .order('display_order', { ascending: true });
        if (!error) setFees(data || []);
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            if (editingFee) {
                const { data, error } = await supabase
                    .from('fees')
                    .update({
                        class_name: newFee.class_name,
                        first_child_fee: newFee.first_child_fee,
                        second_child_fee: newFee.second_child_fee,
                        category: newFee.category
                    })
                    .eq('id', editingFee.id)
                    .select();

                if (error) throw error;
                setFees(fees.map(f => f.id === editingFee.id ? data[0] : f));
                setIsModalOpen(false);
                setEditingFee(null);
                setNewFee({ class_name: '', first_child_fee: '', second_child_fee: '', category: 'Pre-Primary' });
            } else {
                const { data, error } = await supabase
                    .from('fees')
                    .insert([{
                        class_name: newFee.class_name,
                        first_child_fee: newFee.first_child_fee,
                        second_child_fee: newFee.second_child_fee,
                        category: newFee.category,
                        active: true,
                        display_order: fees.length + 1
                    }])
                    .select();

                if (error) throw error;
                setFees([...fees, data[0]]);
                setIsModalOpen(false);
                setNewFee({ class_name: '', first_child_fee: '', second_child_fee: '', category: 'Pre-Primary' });
            }
        } catch (error) {
            alert('Failed to save fee structure: ' + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (fee) => {
        setEditingFee(fee);
        setNewFee({
            class_name: fee.class_name,
            first_child_fee: fee.first_child_fee || '',
            second_child_fee: fee.second_child_fee || '',
            category: fee.category || 'Pre-Primary'
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this fee structure?')) return;
        const { error } = await supabase.from('fees').delete().eq('id', id);
        if (!error) setFees(fees.filter(f => f.id !== id));
    };

    const groupedFees = {
        'Pre-Primary': fees.filter(f => f.category === 'Pre-Primary'),
        'Primary Wing': fees.filter(f => f.category === 'Primary Wing'),
        'Middle & Senior': fees.filter(f => f.category === 'Middle & Senior'),
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-iis-navy">Fee Structure Management</h2>
                    <p className="text-sm text-slate-500">Manage fees by category (Pre-Primary, Primary, Middle & Senior)</p>
                </div>
                <button
                    onClick={() => { setEditingFee(null); setNewFee({ class_name: '', first_child_fee: '', second_child_fee: '', category: 'Pre-Primary' }); setIsModalOpen(true); }}
                    className="flex items-center gap-2 bg-iis-maroon text-white px-5 py-2 rounded shadow hover:bg-red-900 transition"
                >
                    <Plus size={18} /> Add Fee Entry
                </button>
            </div>

            {Object.entries(groupedFees).map(([category, categoryFees]) => (
                <div key={category} className="mb-8 bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                    <div className="bg-slate-800 text-white p-4 flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-lg">{category}</h3>
                            <p className="text-xs text-slate-300">{categoryFees.length} entries</p>
                        </div>
                    </div>
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-xs border-b">
                            <tr>
                                <th className="px-6 py-4">Class</th>
                                <th className="px-6 py-4 text-right">1st Child Fee</th>
                                <th className="px-6 py-4 text-right">2nd Child Fee</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categoryFees.map((fee) => (
                                <tr key={fee.id} className="border-b hover:bg-slate-50">
                                    <td className="px-6 py-4 font-bold text-iis-navy">{fee.class_name}</td>
                                    <td className="px-6 py-4 text-right text-slate-700">{fee.first_child_fee}</td>
                                    <td className="px-6 py-4 text-right text-slate-700">{fee.second_child_fee}</td>
                                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                                        <button onClick={() => handleEdit(fee)} className="text-blue-600 hover:text-blue-800 p-2"><Edit size={18} /></button>
                                        <button onClick={() => handleDelete(fee.id)} className="text-red-600 hover:text-red-800 p-2"><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                            {categoryFees.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-slate-400">No entries for {category}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            ))}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">{editingFee ? 'Edit Fee Entry' : 'Add Fee Entry'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold mb-1">Category</label>
                                <select
                                    value={newFee.category}
                                    onChange={e => setNewFee({ ...newFee, category: e.target.value })}
                                    className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                                    required
                                >
                                    <option value="Pre-Primary">Pre-Primary</option>
                                    <option value="Primary Wing">Primary Wing</option>
                                    <option value="Middle & Senior">Middle & Senior</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Class Name</label>
                                <input
                                    required
                                    type="text"
                                    value={newFee.class_name}
                                    onChange={e => setNewFee({ ...newFee, class_name: e.target.value })}
                                    className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                                    placeholder="e.g. Nursery, 1st, 6th"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-1">1st Child Fee</label>
                                    <input
                                        type="text"
                                        value={newFee.first_child_fee}
                                        onChange={e => setNewFee({ ...newFee, first_child_fee: e.target.value })}
                                        className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="₹ 3,000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">2nd Child Fee</label>
                                    <input
                                        type="text"
                                        value={newFee.second_child_fee}
                                        onChange={e => setNewFee({ ...newFee, second_child_fee: e.target.value })}
                                        className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="₹ 2,800"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-2 justify-end mt-6">
                                <button
                                    type="button"
                                    onClick={() => { setIsModalOpen(false); setEditingFee(null); }}
                                    className="px-4 py-2 text-slate-500 hover:text-slate-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-6 py-2 bg-iis-maroon text-white rounded hover:bg-red-900 disabled:opacity-50"
                                >
                                    {submitting ? 'Saving...' : (editingFee ? 'Update' : 'Add')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
