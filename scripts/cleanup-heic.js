const fs = require('fs');
const path = require('path');

const publicDir = path.join(process.cwd(), 'public');

function walkDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            walkDir(filePath);
        } else if (file.toLowerCase().endsWith('.heic')) {
            // Check for both .jpg and .JPG
            const jpgPath = filePath.replace(/\.heic$/i, '.jpg');
            const jpegPath = filePath.replace(/\.heic$/i, '.jpeg');

            if (fs.existsSync(jpgPath) || fs.existsSync(jpegPath)) {
                try {
                    fs.unlinkSync(filePath);
                    console.log(`Deleted converted HEIC: ${filePath}`);
                } catch (err) {
                    console.error(`Failed to delete ${filePath}:`, err);
                }
            } else {
                console.log(`Skipping ${file}: No corresponding JPG found.`);
            }
        }
    }
}

console.log('Starting HEIC cleanup...');
walkDir(publicDir);
console.log('Cleanup complete.');
