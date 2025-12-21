const fs = require('fs');
const content = `MONGODB_URI=mongodb://localhost:27017/school
JWT_SECRET=dev_secret_key_123
NODE_ENV=development
NEXT_PUBLIC_BASE_URL=http://localhost:3000
`;

try {
    fs.writeFileSync('.env.local', content, { encoding: 'utf8' });
    console.log('.env.local created successfully without BOM');
} catch (e) {
    console.error('Error writing .env.local', e);
}
