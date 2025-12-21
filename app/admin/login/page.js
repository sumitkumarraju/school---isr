'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (!error) {
                router.push('/admin');
            } else {
                alert('Invalid Credentials: ' + error.message);
            }
        } catch (error) {
            alert('Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border-t-4 border-red-900">
                <div className="text-center mb-8">
                    <h1 className="font-serif text-3xl font-bold text-slate-800">Admin Portal</h1>
                    <p className="text-slate-500 text-sm mt-2">Ishwar International School</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded focus:border-red-900 focus:ring-1 focus:ring-red-900 outline-none transition"
                            placeholder="admin@iisgohana.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded focus:border-red-900 focus:ring-1 focus:ring-red-900 outline-none transition"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-slate-900 text-white font-bold py-3 rounded hover:bg-slate-800 transition disabled:opacity-50"
                    >
                        {loading ? 'Authenticating...' : 'Secure Login'}
                    </button>
                </form>

                <div className="mt-6 text-center text-xs text-gray-400">
                    <p>Protected System. Unauthorized access is prohibited.</p>
                </div>
            </div>
        </div>
    );
}
