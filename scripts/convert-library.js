const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const libraryDir = path.join(process.cwd(), 'public', 'library');

if (!fs.existsSync(libraryDir)) {
    console.log('Library directory not found');
    process.exit(1);
}

const files = fs.readdirSync(libraryDir);

(async () => {
    for (const file of files) {
        if (file.toLowerCase().endsWith('.heic')) {
            const inputPath = path.join(libraryDir, file);
            const outputPath = path.join(libraryDir, file.replace(/\.heic$/i, '.jpg'));

            try {
                console.log(`Converting ${file} to JPG...`);
                await sharp(inputPath)
                    .jpeg({ quality: 80 })
                    .toFile(outputPath);
                console.log(`Saved ${outputPath}`);

                // Optional: Delete original if you want to save space, but keeping them is safer for now.
                // fs.unlinkSync(inputPath); 
            } catch (err) {
                console.error(`Error converting ${file}:`, err);
            }
        }
    }
    console.log('Conversion complete!');
})();
