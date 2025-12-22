const fs = require('fs');
const path = require('path');

const publicDir = path.join(process.cwd(), 'public');
const galleryManifestPath = path.join(publicDir, 'gallery-manifest.json');
const kidsZoneManifestPath = path.join(publicDir, 'kids play section', 'images.json'); // Note the space in folder name, checking previous file listing

// Helper to get images from a directory
function getImagesFromDir(dirName) {
    const dirPath = path.join(publicDir, dirName);
    if (!fs.existsSync(dirPath)) return [];

    return fs.readdirSync(dirPath)
        .filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
        });
}

// 1. Update Kids Zone Manifest
const kidsImages = getImagesFromDir('kids play section');
fs.writeFileSync(kidsZoneManifestPath, JSON.stringify(kidsImages, null, 2));
console.log(`Updated Kids Zone manifest with ${kidsImages.length} images.`);

// 2. Update Library Manifest
const libraryManifestPath = path.join(publicDir, 'library', 'images.json');
const libraryImages = getImagesFromDir('library');
fs.writeFileSync(libraryManifestPath, JSON.stringify(libraryImages, null, 2));
console.log(`Updated Library manifest with ${libraryImages.length} images.`);

// 2. Update Main Gallery Manifest
const categories = [
    { dir: 'gallery', category: 'Campus' },
    { dir: 'new', category: 'Recent Events' },
    { dir: 'library', category: 'Library' },
    { dir: 'kids play section', category: 'Kids Zone' }
];

let allGalleryImages = [];

categories.forEach(({ dir, category }) => {
    const images = getImagesFromDir(dir);
    images.forEach(img => {
        allGalleryImages.push({
            src: `/${dir}/${img}`,
            category: category,
            originalName: img
        });
    });
});

fs.writeFileSync(galleryManifestPath, JSON.stringify(allGalleryImages, null, 2));
console.log(`Updated Main Gallery manifest with ${allGalleryImages.length} images.`);
