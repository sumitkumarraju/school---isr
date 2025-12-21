const fs = require('fs');
const path = require('path');

const libraryDir = path.join(process.cwd(), 'public', 'library');

if (!fs.existsSync(libraryDir)) {
    console.log('Library directory not found');
    process.exit(1);
}

const files = fs.readdirSync(libraryDir);
const images = files.filter(f => f.toLowerCase().endsWith('.jpg'));

fs.writeFileSync(
    path.join(libraryDir, 'images.json'),
    JSON.stringify(images, null, 2)
);

console.log(`Manifest created with ${images.length} images.`);
