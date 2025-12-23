# Data Migration Guide for Ishwar International School

This guide will help you import your existing website content into Supabase.

## What Needs to Be Migrated?

1. **Gallery Photos** - Images from `/public` directory
2. **Faculty/Staff Data** - Photos and information
3. **Academic Achievers** - Student photos and scores
4. **Hero Slides** - Homepage slider images

---

## Method 1: Manual Upload via Admin Portal (Recommended)

The easiest way is to use the admin portal you already have:

### Gallery & Kids Zone
1. Go to `/admin/gallery`
2. Click "Upload Photo"
3. Select images from your computer
4. Repeat for all gallery images

### Faculty & Staff
1. Go to `/admin/staff`
2. Click "Add New Staff Member"
3. Enter name, designation
4. Upload their photo
5. Repeat for each staff member

### Academic Achievers
1. Go to `/admin/achievers`
2. Click "Add Achiever"
3. Enter student details, class, score
4. Select category: TOPPER or OTHER
5. Upload their photo

### Hero Slides
1. Go to `/admin/hero`
2. Click "Add New Slide"
3. Enter title, subtitle
4. Upload slide image

---

## Method 2: Bulk Import via SQL (Advanced)

If you have many items, you can insert them directly via SQL.

### Step 1: Upload Images to Supabase Storage

1. Go to **Supabase Dashboard** → **Storage** → **gallery** bucket
2. Click **Upload File**
3. Upload all your images
4. Note down the public URLs

### Step 2: Run SQL Inserts

Example for Staff:

\`\`\`sql
INSERT INTO staff (name, designation, image_url, active) VALUES
('Principal Name', 'Principal', 'https://your-supabase.co/storage/v1/object/public/gallery/staff/principal.jpg', true),
('Teacher Name', 'Senior Teacher', 'https://your-supabase.co/storage/v1/object/public/gallery/staff/teacher1.jpg', true);
\`\`\`

Example for Gallery:

\`\`\`sql
INSERT INTO gallery (title, image_url, category) VALUES
('Annual Day 2024', 'https://your-supabase.co/storage/v1/object/public/gallery/uploads/event1.jpg', 'Events'),
('Sports Day', 'https://your-supabase.co/storage/v1/object/public/gallery/uploads/sports1.jpg', 'Sports');
\`\`\`

---

## Method 3: Programmatic Migration (Most Efficient)

Create a Node.js script to automate the upload:

### migrate.js

\`\`\`javascript
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabase = createClient(
    'YOUR_SUPABASE_URL',
    'YOUR_SUPABASE_ANON_KEY'
);

// Upload images from a directory
async function uploadGalleryImages(dirPath) {
    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const fileBuffer = fs.readFileSync(filePath);
        
        // Upload to storage
        const { data, error } = await supabase.storage
            .from('gallery')
            .upload(`uploads/${file}`, fileBuffer);
        
        if (error) {
            console.error(`Failed to upload ${file}:`, error);
            continue;
        }
        
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('gallery')
            .getPublicUrl(`uploads/${file}`);
        
        // Insert into database
        await supabase.from('gallery').insert({
            title: file.replace(/\\.[^/.]+$/, ""), // filename without extension
            image_url: publicUrl,
            category: 'General'
        });
        
        console.log(`✓ Uploaded ${file}`);
    }
}

// Run migration
uploadGalleryImages('./public/gallery');
\`\`\`

Run with: `node migrate.js`

---

## Recommendation

**For most users**: Use **Method 1** (Admin Portal) - it's the safest and easiest!

Only use Method 2 or 3 if you have 50+ items to migrate.
