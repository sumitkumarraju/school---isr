'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FaLock } from 'react-icons/fa';

export default function ChangePasswordPage() {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.auth.updateUser({ password: password });

        if (error) {
            alert("Error: " + error.message);
        } else {
            alert("Password updated successfully!");
            setPassword('');
        }
        setLoading(false);
    };

    return (
        <div className="max-w-md mx-auto p-6 mt-10">
            <h2 className="text-2xl font-serif font-bold text-slate-800 mb-6">Change Password</h2>

            <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow-sm border space-y-4">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
                    <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-400"><FaLock /></span>
                        <input
                            type="password"
                            required
                            minLength={6}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Min. 6 characters"
                        />
                    </div>
                </div>
                <button
                    disabled={loading}
                    className="w-full bg-slate-900 text-white font-bold py-2 rounded hover:bg-slate-700 disabled:opacity-50"
                >
                    {loading ? 'Updating...' : 'Update Password'}
                </button>
            </form>
        </div>
    );
}
