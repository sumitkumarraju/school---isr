const fs = require('fs');
const path = require('path');
const heicConvert = require('heic-convert');

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

            // Skip if jpg already exists
            if (fs.existsSync(outputPath)) continue;

            try {
                console.log(`Converting ${file} to JPG...`);
                const inputBuffer = fs.readFileSync(inputPath);
                const outputBuffer = await heicConvert({
                    buffer: inputBuffer, // the HEIC file buffer
                    format: 'JPEG',      // output format
                    quality: 0.8         // the jpeg compression quality, between 0 and 1
                });

                fs.writeFileSync(outputPath, outputBuffer);
                console.log(`Saved ${outputPath}`);
            } catch (err) {
                console.error(`Error converting ${file}:`, err);
            }
        }
    }
    console.log('All conversions complete!');
})();
