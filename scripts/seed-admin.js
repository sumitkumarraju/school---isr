// scripts/seed-admin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function seedAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // --- CREDENTIALS ---
    const email = 'admin@iisgohana.com';
    const password = 'Anil@admin754';
    // -------------------

    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log('⚠️ Admin user found. Updating password...');
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();
      console.log('✅ Password updated successfully.');
    } else {
      console.log('Creating new admin user...');
      await Admin.create({
        email,
        password: hashedPassword,
      });
      console.log('🎉 Admin created successfully.');
    }

    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedAdmin();
