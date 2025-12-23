'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Trophy, Plus } from 'lucide-react';

// Placeholder data for now, as we don't have a table for this yet.
// In a real scenario, we would create a 'toppers' table in Supabase.
// Real data synced from website components
const MOCK_ACHIEVERS = [
    { id: 1, name: "Aarushi", class: "Class XII", score: "91.8%", image_url: "/toppers/Screenshot 2025-12-21 182603.png" },
    { id: 2, name: "Lokesh", class: "Class XII", score: "90.4%", image_url: "/toppers/Screenshot 2025-12-21 182617.png" },
    { id: 3, name: "Sourabh", class: "Class X", score: "96.8%", image_url: "/10TH TOPPER/Screenshot 2025-12-21 191321.png" },
    { id: 4, name: "Hitakshi", class: "Class X", score: "95.2%", image_url: "/10TH TOPPER/Screenshot 2025-12-21 191336.png" },
    { id: 5, name: "Ishu", class: "Class X", score: "93.2%", image_url: "/10TH TOPPER/Screenshot 2025-12-21 191340.png" },
];

export default function AchieversManager() {
    const [achievers, setAchievers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newStudent, setNewStudent] = useState({ name: '', student_class: 'XII', score: '', category: 'OTHER', image_url: '' });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchAchievers();
    }, []);

    const fetchAchievers = async () => {
        const { data, error } = await supabase
            .from('achievers')
            .select('*')
            .order('created_at', { ascending: false });
        if (!error) setAchievers(data || []);
        setLoading(false);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const fileName = `achievers/${Date.now()}-${file.name.replace(/\s/g, '-')}`;

        try {
            const { error: uploadError } = await supabase.storage
                .from('gallery')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('gallery')
                .getPublicUrl(fileName);

            setNewStudent(prev => ({ ...prev, image_url: publicUrl }));
        } catch (error) {
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase
                .from('achievers')
                .insert([newStudent])
                .select();

            if (error) throw error;

            setAchievers([data[0], ...achievers]);
            setIsModalOpen(false);
            setNewStudent({ name: '', student_class: 'XII', score: '', category: 'OTHER', image_url: '' });
        } catch (error) {
            alert('Failed to add student');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this record?')) return;
        const { error } = await supabase.from('achievers').delete().eq('id', id);
        if (!error) setAchievers(achievers.filter(a => a.id !== id));
    };

    const toppers = achievers.filter(a => a.category === 'TOPPER').sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
    const otherAchievers = achievers.filter(a => a.category !== 'TOPPER').sort((a, b) => parseFloat(b.score) - parseFloat(a.score));

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-iis-navy">Academic Achievers</h2>
                    <p className="text-sm text-slate-500">Highlight Class X & XII Toppers</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-iis-maroon text-white px-5 py-2 rounded shadow hover:bg-red-900 transition">
                    <Plus size={18} /> Add Achiever
                </button>
            </div>

            {/* Top Performers Section */}
            {toppers.length > 0 && (
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <Trophy className="text-iis-gold text-2xl" size={24} />
                        <h3 className="text-xl font-serif font-bold text-iis-navy">Top Performers (Featured on Homepage)</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {toppers.map((student, idx) => (
                            <div key={student.id} className="bg-gradient-to-br from-yellow-50 to-white rounded-lg shadow-lg border-2 border-iis-gold overflow-hidden group relative">
                                <div className="absolute top-3 left-3 bg-iis-gold text-iis-navy text-xs font-black px-2 py-1 rounded-full z-20">
                                    RANK #{idx + 1}
                                </div>
                                <div className="h-48 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                                    {student.image_url ? (
                                        <img src={student.image_url} alt={student.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-6xl text-gray-300">👤</span>
                                    )}
                                    <div className="absolute top-3 right-3 bg-iis-gold text-iis-navy text-sm font-bold px-3 py-1 rounded-full shadow-sm z-10">
                                        {student.score}%
                                    </div>
                                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/70 to-transparent text-white text-center p-2">
                                        <p className="text-xs font-bold">Class {student.student_class}</p>
                                    </div>
                                </div>
                                <div className="p-5 bg-white">
                                    <h3 className="font-bold text-slate-800 text-lg mb-1">{student.name}</h3>
                                    <p className="text-xs text-iis-gold font-bold mb-4">⭐ TOP PERFORMER</p>
                                    <div className="flex gap-2">
                                        <button className="flex-1 bg-slate-50 text-slate-600 py-2 rounded text-sm hover:bg-slate-100 font-medium">Edit</button>
                                        <button onClick={() => handleDelete(student.id)} className="flex-1 bg-red-50 text-red-600 py-2 rounded text-sm hover:bg-red-100 font-medium">Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Other Achievers Section */}
            {otherAchievers.length > 0 && (
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="text-2xl">🎓</div>
                        <h3 className="text-xl font-serif font-bold text-slate-700">Other Achievers</h3>
                        <span className="text-sm text-slate-400">({otherAchievers.length})</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {otherAchievers.map((student) => (
                            <div key={student.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition">
                                <div className="h-40 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                                    {student.image_url ? (
                                        <img src={student.image_url} alt={student.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-5xl text-gray-300">👤</span>
                                    )}
                                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded shadow">
                                        {student.score}%
                                    </div>
                                    <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-xs text-center p-1">
                                        Class {student.student_class}
                                    </div>
                                </div>
                                <div className="p-3">
                                    <h3 className="font-bold text-slate-800 text-sm truncate" title={student.name}>{student.name}</h3>
                                    <div className="mt-2 flex gap-1">
                                        <button className="flex-1 bg-slate-50 text-slate-600 py-1 rounded text-xs hover:bg-slate-100">Edit</button>
                                        <button onClick={() => handleDelete(student.id)} className="flex-1 bg-red-50 text-red-600 py-1 rounded text-xs hover:bg-red-100">Del</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {achievers.length === 0 && !loading && (
                <div className="text-center py-12 text-slate-400">
                    <Trophy className="mx-auto mb-4 opacity-20" size={64} />
                    <p>No achievers added yet. Click "Add Achiever" to start!</p>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Add Achiever</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold mb-1">Student Name</label>
                                <input required type="text" value={newStudent.name} onChange={e => setNewStudent({ ...newStudent, name: e.target.value })} className="w-full border p-2 rounded" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold mb-1">Class</label>
                                    <select value={newStudent.student_class} onChange={e => setNewStudent({ ...newStudent, student_class: e.target.value })} className="w-full border p-2 rounded">
                                        <option value="XII">Class XII</option>
                                        <option value="X">Class X</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-1">Score (%)</label>
                                    <input required type="number" step="0.1" value={newStudent.score} onChange={e => setNewStudent({ ...newStudent, score: e.target.value })} className="w-full border p-2 rounded" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Category</label>
                                <select value={newStudent.category} onChange={e => setNewStudent({ ...newStudent, category: e.target.value })} className="w-full border p-2 rounded">
                                    <option value="TOPPER">Top Performer (Main Card)</option>
                                    <option value="OTHER">Other Achiever (List)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Photo</label>
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full" />
                                {uploading && <p className="text-xs text-blue-500">Uploading...</p>}
                            </div>
                            <div className="flex gap-2 justify-end mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-500">Cancel</button>
                                <button type="submit" disabled={uploading} className="px-6 py-2 bg-iis-maroon text-white rounded">Add Student</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
