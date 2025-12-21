'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FaPlus, FaQuoteLeft, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import Modal from '@/components/ui/Modal';

export default function QuotesPage() {
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newQuote, setNewQuote] = useState({ text: '', author: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchQuotes();
    }, []);

    const fetchQuotes = async () => {
        try {
            const { data, error } = await supabase
                .from('quotes')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setQuotes(data || []);
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
                .from('quotes')
                .insert([{ text: newQuote.text, author: newQuote.author || '', active: true }])
                .select();

            if (error) throw error;

            if (data) {
                setQuotes([data[0], ...quotes]);
                setIsModalOpen(false);
                setNewQuote({ text: '', author: '' });
            }
        } catch (error) {
            alert("Failed to add quote: " + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleToggle = async (id, currentStatus) => {
        try {
            const { error } = await supabase
                .from('quotes')
                .update({ active: !currentStatus })
                .eq('id', id);

            if (error) throw error;

            setQuotes(quotes.map(q => q.id === id ? { ...q, active: !currentStatus } : q));
        } catch (error) {
            alert("Failed to update status");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this quote?")) return;
        try {
            const { error } = await supabase
                .from('quotes')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setQuotes(quotes.filter(q => q.id !== id));
        } catch (error) {
            alert("Failed to delete");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-slate-800">Quotes Management</h2>
                    <p className="text-sm text-slate-500">Inspiring words displayed on the site</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-700 transition-colors"
                >
                    <FaPlus /> Add Quote
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                {loading ? <div className="p-4 text-center">Loading...</div> : quotes.map((quote) => (
                    <div key={quote.id} className="p-4 border-b last:border-0 flex items-center justify-between hover:bg-gray-50">
                        <div className="flex items-center gap-4 flex-1">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${quote.active ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400'}`}>
                                <FaQuoteLeft />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-slate-800 truncate">"{quote.text}"</p>
                                <p className="text-xs text-slate-500">- {quote.author || 'Unknown'}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 ml-4">
                            <div className={`text-xs px-2 py-1 rounded ${quote.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                {quote.active ? 'Active' : 'Inactive'}
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={quote.active}
                                    onChange={() => handleToggle(quote.id, quote.active)}
                                    className="sr-only peer"
                                />
                                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                            </label>
                            <button
                                onClick={() => handleDelete(quote.id)}
                                className="text-red-400 hover:text-red-600 p-2"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
                {!loading && quotes.length === 0 && <div className="p-4 text-center text-gray-500">No quotes found</div>}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Quote">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Quote Text</label>
                        <textarea
                            required
                            rows={3}
                            value={newQuote.text}
                            onChange={(e) => setNewQuote({ ...newQuote, text: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                            placeholder="Enter the quote..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Author (Optional)</label>
                        <input
                            type="text"
                            value={newQuote.author}
                            onChange={(e) => setNewQuote({ ...newQuote, author: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="E.g., Albert Einstein"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-slate-900 text-white font-bold py-2 rounded hover:bg-slate-700 disabled:opacity-50"
                    >
                        {submitting ? 'Adding...' : 'Add Quote'}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
