const fs = require('fs');
const path = require('path');
const heicConvert = require('heic-convert');

const targetDir = path.join(process.cwd(), 'public', 'kids play section');

if (!fs.existsSync(targetDir)) {
    console.log('Target directory not found');
    process.exit(1);
}

const files = fs.readdirSync(targetDir);

(async () => {
    for (const file of files) {
        if (file.toLowerCase().endsWith('.heic')) {
            const inputPath = path.join(targetDir, file);
            const outputPath = path.join(targetDir, file.replace(/\.heic$/i, '.jpg'));

            // Skip if jpg already exists
            if (fs.existsSync(outputPath)) continue;

            try {
                console.log(`Converting ${file} to JPG...`);
                const inputBuffer = fs.readFileSync(inputPath);
                const outputBuffer = await heicConvert({
                    buffer: inputBuffer,
                    format: 'JPEG',
                    quality: 0.8
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
