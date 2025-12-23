# Database Migration Instructions

## Step 1: Run SQL Migration in Supabase

1. Open your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Click on "SQL Editor" in the left sidebar
4. Click "New Query"
5. Copy the contents of `FIX_ENQUIRIES_AND_DISCLOSURES.sql`
6. Paste into the SQL Editor
7. Click "Run" button (or press Ctrl+Enter)

**Expected Results:**
```
CREATE EXTENSION
CREATE TABLE
CREATE TABLE
[Multiple] DROP POLICY
ALTER TABLE
[Multiple] CREATE POLICY
... (policies created successfully)
```

At the bottom, you should see a table showing:
```
tablename              | rls_enabled
-----------------------|------------
enquiries              | t
public_disclosures     | t
```

## Step 2: Verify Tables in Table Editor

1. Click "Table Editor" in left sidebar
2. You should see both tables:
   - `enquiries`
   - `public_disclosures`

## Step 3: Add Initial Public Disclosure Documents (Optional)

Since the public disclosure page now reads from database, you need to add documents through the admin portal. But first, let's migrate your existing PDF files:

1. Go to Admin Portal: http://localhost:3000/admin/login
2. Login with your credentials
3. Navigate to "Public Disclosure" section
4. Add your existing documents one by one:

   **Document 1:**
   - Title: `Affiliation Letter`
   - URL: `/public discloser/Affiliation.pdf`

   **Document 2:**
   - Title: `Mandatory Public Disclosure`
   - URL: `/public discloser/mandatory public disclosure.pdf`

   **Document 3:**
   - Title: `Society Registration`
   - URL: `/public discloser/Society Registration.pdf`

   **Document 4:**
   - Title: `Fee Structure`
   - URL: `/public discloser/Fees Structure.pdf`

## Troubleshooting

### If Enquiry Form Still Doesn't Work

**Check Browser Console:**
1. Open http://localhost:3000/contact
2. Open browser DevTools (F12)
3. Go to Console tab
4. Submit a test enquiry
5. Look for any error messages

**Common Issues:**
- **"new row violates row-level security policy"**: RLS policies not properly set. Re-run Step 1.
- **"relation 'enquiries' does not exist"**: Table not created. Re-run Step 1.
- **Network error**: Check if Supabase credentials in `.env.local` are correct.

### If Public Disclosure Page Shows Error

1. Check browser console for errors
2. Verify `public_disclosures` table exists in Supabase
3. Ensure RLS policy allows anonymous SELECT (re-run migration if needed)

## Next Steps

After migration:
1. Test enquiry form submission
2. Add disclosure documents via admin panel
3. Verify documents appear on public page
