const fs = require('fs');
const path = require('path');

const targetDir = path.join(process.cwd(), 'public', 'kids play section');

if (!fs.existsSync(targetDir)) {
    console.log('Target directory not found');
    process.exit(1);
}

const files = fs.readdirSync(targetDir);
const images = files.filter(f => f.toLowerCase().endsWith('.jpg'));

fs.writeFileSync(
    path.join(targetDir, 'images.json'),
    JSON.stringify(images, null, 2)
);

console.log(`Manifest created with ${images.length} images.`);
