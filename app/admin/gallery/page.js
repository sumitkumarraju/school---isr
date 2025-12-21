'use client';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FaCloudUploadAlt, FaTrash } from 'react-icons/fa';

export const dynamic = 'force-dynamic';

export default function GalleryManager() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const { data, error } = await supabase
                .from('gallery')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setImages(data || []);
        } catch (error) {
            console.error('Failed to fetch images:', error);
        } finally {
            setLoading(false);
        }
    };

    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Upload to Supabase Storage
        const fileName = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
        const filePath = `uploads/${fileName}`;

        try {
            // 1. Upload File
            const { error: uploadError } = await supabase.storage
                .from('gallery')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('gallery')
                .getPublicUrl(filePath);

            // 3. Insert into DB
            const { data, error: dbError } = await supabase
                .from('gallery')
                .insert([{
                    title: file.name,
                    image_url: publicUrl
                }])
                .select();

            if (dbError) throw dbError;

            if (data) {
                setImages([data[0], ...images]);
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert("Upload failed: " + error.message);
        }
    };

    const handleDelete = async (id, imageUrl) => {
        if (!confirm('Are you sure you want to delete this image?')) return;

        try {
            // Optional: Delete from storage if path can be extracted
            if (imageUrl) {
                const pathParts = imageUrl.split('/gallery/');
                // Adjust split based on actual URL structure, usually ends with /gallery/uploads/filename
                // If publicUrl is .../storage/v1/object/public/gallery/uploads/...
                // Easy way: just try to match the filePath we created.
                // For now, let's just delete the record to be safe and simple.
            }

            const { error } = await supabase
                .from('gallery')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setImages(images.filter(img => img.id !== id));
        } catch (error) {
            console.error("Delete error:", error);
            alert("Delete failed");
        }
    };

    return (
        <div className="p-6">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-slate-800">Gallery Manager</h2>
                    <p className="text-sm text-slate-500">Add or remove campus photos</p>
                </div>
                <button onClick={handleUploadClick} className="flex items-center gap-2 bg-yellow-600 text-white px-6 py-2 rounded shadow hover:bg-yellow-700 transition font-medium">
                    <FaCloudUploadAlt /> Upload New Photo
                </button>
            </div>

            {loading ? <div>Loading...</div> : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Images */}
                    {images.map((img) => (
                        <div key={img.id} className="relative group rounded-lg overflow-hidden h-56 shadow-md border border-gray-100">
                            <img src={img.image_url} className="w-full h-full object-cover" alt="Gallery" />

                            {/* Overlay Action */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                                <span className="text-white text-xs font-medium">{img.title}</span>
                                <button
                                    onClick={() => handleDelete(img.id, img.image_url)}
                                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Upload Placeholder Card */}
                    <div onClick={handleUploadClick} className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 h-56 bg-gray-50 cursor-pointer hover:bg-gray-100 hover:border-yellow-600 transition group">
                        <FaCloudUploadAlt className="text-4xl mb-2 group-hover:text-yellow-600" />
                        <span className="text-sm font-medium">Click to Upload</span>
                    </div>
                </div>
            )}
        </div>
    );
}
