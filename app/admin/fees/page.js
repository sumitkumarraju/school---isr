'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FaPlus, FaEdit, FaTrash, FaMoneyBillWave } from 'react-icons/fa';

export default function FeesManager() {
    const [fees, setFees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newFee, setNewFee] = useState({ class_name: '', tuition_fee: '', transport_fee: '', other_fees: '', total_fee: '' });
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
            const { data, error } = await supabase
                .from('fees')
                .insert([{
                    ...newFee,
                    active: true,
                    display_order: fees.length + 1
                }])
                .select();

            if (error) throw error;

            setFees([...fees, data[0]]);
            setIsModalOpen(false);
            setNewFee({ class_name: '', tuition_fee: '', transport_fee: '', other_fees: '', total_fee: '' });
        } catch (error) {
            alert('Failed to add fee structure');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this fee structure?')) return;
        const { error } = await supabase.from('fees').delete().eq('id', id);
        if (!error) setFees(fees.filter(f => f.id !== id));
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-iis-navy">Fee Structure Management</h2>
                    <p className="text-sm text-slate-500">Manage annual fees for different classes</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-iis-maroon text-white px-5 py-2 rounded shadow hover:bg-red-900 transition">
                    <FaPlus /> Add Fee Structure
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-xs border-b">
                        <tr>
                            <th className="px-6 py-4">Class</th>
                            <th className="px-6 py-4">Tuition Fee</th>
                            <th className="px-6 py-4">Transport</th>
                            <th className="px-6 py-4">Other Fees</th>
                            <th className="px-6 py-4 font-black">Total</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fees.map((fee) => (
                            <tr key={fee.id} className="border-b hover:bg-slate-50">
                                <td className="px-6 py-4 font-bold text-iis-navy">{fee.class_name}</td>
                                <td className="px-6 py-4">{fee.tuition_fee}</td>
                                <td className="px-6 py-4">{fee.transport_fee}</td>
                                <td className="px-6 py-4">{fee.other_fees}</td>
                                <td className="px-6 py-4 font-bold text-green-600">{fee.total_fee}</td>
                                <td className="px-6 py-4 text-right flex justify-end gap-2">
                                    <button className="text-blue-600 hover:text-blue-800 p-2"><FaEdit /></button>
                                    <button onClick={() => handleDelete(fee.id)} className="text-red-600 hover:text-red-800 p-2"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {fees.length === 0 && !loading && (
                    <div className="p-12 text-center text-slate-400">
                        <FaMoneyBillWave className="text-6xl mx-auto mb-4 opacity-20" />
                        <p>No fee structures added yet. Click "Add Fee Structure" to start!</p>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Add Fee Structure</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold mb-1">Class Name</label>
                                <input required type="text" value={newFee.class_name} onChange={e => setNewFee({ ...newFee, class_name: e.target.value })} className="w-full border p-2 rounded" placeholder="e.g. Class VI-VIII" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-1">Tuition Fee</label>
                                    <input type="text" value={newFee.tuition_fee} onChange={e => setNewFee({ ...newFee, tuition_fee: e.target.value })} className="w-full border p-2 rounded" placeholder="₹20,000" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Transport Fee</label>
                                    <input type="text" value={newFee.transport_fee} onChange={e => setNewFee({ ...newFee, transport_fee: e.target.value })} className="w-full border p-2 rounded" placeholder="₹3,000" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-1">Other Fees</label>
                                    <input type="text" value={newFee.other_fees} onChange={e => setNewFee({ ...newFee, other_fees: e.target.value })} className="w-full border p-2 rounded" placeholder="₹2,000" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1 text-green-700">Total Fee</label>
                                    <input type="text" value={newFee.total_fee} onChange={e => setNewFee({ ...newFee, total_fee: e.target.value })} className="w-full border p-2 rounded font-bold" placeholder="₹25,000" />
                                </div>
                            </div>
                            <div className="flex gap-2 justify-end mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-500">Cancel</button>
                                <button type="submit" disabled={submitting} className="px-6 py-2 bg-iis-maroon text-white rounded">Add Fee</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
