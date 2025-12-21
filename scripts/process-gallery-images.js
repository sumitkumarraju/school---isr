const fs = require('fs');
const path = require('path');
const heicConvert = require('heic-convert');

const directories = [
    { dir: 'gallery', category: 'Campus' },
    { dir: 'kids play section', category: 'Kids Zone' },
    { dir: 'library', category: 'Library' },
    { dir: 'new', category: 'Recent Events' }
];

const publicDir = path.join(process.cwd(), 'public');
const manifestPath = path.join(publicDir, 'gallery-manifest.json');
const allImages = [];

(async () => {
    for (const { dir, category } of directories) {
        const fullDir = path.join(publicDir, dir);
        if (!fs.existsSync(fullDir)) {
            console.warn(`Directory not found: ${fullDir}`);
            continue;
        }

        const files = fs.readdirSync(fullDir);
        for (const file of files) {
            const ext = path.extname(file).toLowerCase();
            const filePath = path.join(fullDir, file);

            // Convert HEIC
            if (ext === '.heic') {
                const outputFilename = file.replace(/\.heic$/i, '.jpg');
                const outputPath = path.join(fullDir, outputFilename);

                if (!fs.existsSync(outputPath)) {
                    try {
                        console.log(`Converting ${path.join(dir, file)}...`);
                        const inputBuffer = fs.readFileSync(filePath);
                        const outputBuffer = await heicConvert({
                            buffer: inputBuffer,
                            format: 'JPEG',
                            quality: 0.7 // slightly lower for smaller size
                        });
                        fs.writeFileSync(outputPath, outputBuffer);
                        console.log(`Converted to ${outputFilename}`);

                        // Add to list
                        allImages.push({
                            src: `/${dir}/${outputFilename}`,
                            category,
                            originalName: outputFilename
                        });
                    } catch (e) {
                        console.error(`Failed to convert ${file}:`, e.message);
                    }
                } else {
                    // Already converted, add the jpg to list
                    allImages.push({
                        src: `/${dir}/${outputFilename}`,
                        category,
                        originalName: outputFilename
                    });
                }
            }
            // Add existing images
            else if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
                allImages.push({
                    src: `/${dir}/${file}`,
                    category,
                    originalName: file
                });
            }
        }
    }

    // Shuffle images for "mixed" look
    for (let i = allImages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allImages[i], allImages[j]] = [allImages[j], allImages[i]];
    }

    fs.writeFileSync(manifestPath, JSON.stringify(allImages, null, 2));
    console.log(`Generated manifest with ${allImages.length} images at ${manifestPath}`);

})();
