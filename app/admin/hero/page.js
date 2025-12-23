'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Upload, Trash2, Edit, Layers } from 'lucide-react';

// Mock data until Supabase table 'hero_slides' is created
const MOCK_SLIDES = [
    {
        id: 1,
        title: "Ishwar International School",
        subtitle: "Energy • Excellence • Evolution",
        image_url: "/building.png",
        active: true
    },
    {
        id: 2,
        title: "Admissions Open",
        subtitle: "Nurturing Future Leaders",
        image_url: "/hero-2.jpg",
        active: true
    }
];

export default function HeroManager() {
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newSlide, setNewSlide] = useState({ title: '', subtitle: '' });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = async () => {
        try {
            const { data, error } = await supabase
                .from('hero_slides')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            setSlides(data || []);
        } catch (error) {
            console.error('Error fetching slides:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const fileName = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
        const filePath = `hero/${fileName}`;

        try {
            const { error: uploadError } = await supabase.storage
                .from('gallery') // Reuse gallery bucket or create 'hero' bucket
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('gallery')
                .getPublicUrl(filePath);

            setNewSlide(prev => ({ ...prev, image_url: publicUrl }));
        } catch (error) {
            alert('Upload failed: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newSlide.image_url) return alert('Please upload an image');

        try {
            const { data, error } = await supabase
                .from('hero_slides')
                .insert([{
                    title: newSlide.title,
                    subtitle: newSlide.subtitle,
                    image_url: newSlide.image_url,
                    active: true
                }])
                .select();

            if (error) throw error;

            setSlides([data[0], ...slides]);
            setIsModalOpen(false);
            setNewSlide({ title: '', subtitle: '' });
        } catch (error) {
            alert('Failed to add slide');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this slide?')) return;
        try {
            const { error } = await supabase
                .from('hero_slides')
                .delete()
                .eq('id', id);
            if (error) throw error;
            setSlides(slides.filter(s => s.id !== id));
        } catch (error) {
            alert('Delete failed');
        }
    };

    const toggleActive = async (id, currentStatus) => {
        try {
            const { error } = await supabase
                .from('hero_slides')
                .update({ active: !currentStatus })
                .eq('id', id);
            if (error) throw error;
            setSlides(slides.map(s => s.id === id ? { ...s, active: !currentStatus } : s));
        } catch (error) {
            alert('Update failed');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-iis-navy">Hero & Slider Management</h2>
                    <p className="text-sm text-slate-500">Manage home page banner images and text.</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-iis-navy text-white px-5 py-2 rounded shadow hover:bg-slate-800 transition">
                    <Upload size={18} /> Add New Slide
                </button>
            </div>

            <div className="grid gap-6">
                {loading ? <div>Loading...</div> : slides.map((slide) => (
                    <div key={slide.id} className={`bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row h-auto md:h-48 group ${!slide.active ? 'opacity-60' : ''}`}>
                        <div className="w-full md:w-1/3 bg-gray-200 relative">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image_url})` }}>
                                {!slide.image_url && <Layers className="text-4xl" size={40} />}
                            </div>
                            <div className={`absolute top-2 left-2 text-white text-xs px-2 py-1 rounded ${slide.active ? 'bg-green-600' : 'bg-red-500'}`}>
                                {slide.active ? 'Active' : 'Inactive'}
                            </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-xl text-slate-800 mb-2">{slide.title}</h3>
                                <p className="text-slate-500">{slide.subtitle}</p>
                            </div>
                            <div className="flex gap-3 mt-4 justify-end">
                                <button onClick={() => toggleActive(slide.id, slide.active)} className="px-4 py-2 bg-slate-100 text-slate-600 rounded hover:bg-slate-200 font-medium text-sm flex items-center gap-2">
                                    {slide.active ? 'Deactivate' : 'Activate'}
                                </button>
                                <button onClick={() => handleDelete(slide.id)} className="px-4 py-2 bg-red-50 text-red-500 rounded hover:bg-red-100 font-medium text-sm flex items-center gap-2">
                                    <Trash2 size={18} /> Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Add New Slide</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold mb-1">Image</label>
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full" />
                                {uploading && <p className="text-xs text-blue-500">Uploading...</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Title</label>
                                <input type="text" value={newSlide.title} onChange={e => setNewSlide({ ...newSlide, title: e.target.value })} className="w-full border p-2 rounded" placeholder="Main Heading" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">Subtitle</label>
                                <input type="text" value={newSlide.subtitle} onChange={e => setNewSlide({ ...newSlide, subtitle: e.target.value })} className="w-full border p-2 rounded" placeholder="Sub-heading or Tagline" />
                            </div>
                            <div className="flex gap-2 justify-end mt-6">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-500">Cancel</button>
                                <button type="submit" disabled={uploading} className="px-6 py-2 bg-iis-navy text-white rounded">Save Slide</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
