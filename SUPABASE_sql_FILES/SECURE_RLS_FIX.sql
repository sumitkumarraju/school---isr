-- SECURE RLS FIX
-- This script enables Row Level Security (RLS) on all sensitive tables and sets up proper access policies.
-- It ensures that:
-- 1. Public can READ data (SELECT)
-- 2. Only Authenticated Admins can WRITE data (INSERT, UPDATE, DELETE)
-- 3. Public can INSERT into admissions and enquiries (for forms)

-- 1. Enable RLS on all tables
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievers ENABLE ROW LEVEL SECURITY;
ALTER TABLE headlines ENABLE ROW LEVEL SECURITY;
ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- 2. Create Policies

-- NOTICES
DROP POLICY IF EXISTS "Public read notices" ON notices;
DROP POLICY IF EXISTS "Admin insert notices" ON notices;
DROP POLICY IF EXISTS "Admin update notices" ON notices;
DROP POLICY IF EXISTS "Admin delete notices" ON notices;

CREATE POLICY "Public read notices" ON notices FOR SELECT USING (true);
CREATE POLICY "Admin insert notices" ON notices FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update notices" ON notices FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete notices" ON notices FOR DELETE USING (auth.role() = 'authenticated');

-- GALLERY
DROP POLICY IF EXISTS "Public read gallery" ON gallery;
DROP POLICY IF EXISTS "Admin insert gallery" ON gallery;
DROP POLICY IF EXISTS "Admin update gallery" ON gallery;
DROP POLICY IF EXISTS "Admin delete gallery" ON gallery;

CREATE POLICY "Public read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Admin insert gallery" ON gallery FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update gallery" ON gallery FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete gallery" ON gallery FOR DELETE USING (auth.role() = 'authenticated');

-- QUOTES
DROP POLICY IF EXISTS "Public read quotes" ON quotes;
DROP POLICY IF EXISTS "Admin insert quotes" ON quotes;
DROP POLICY IF EXISTS "Admin update quotes" ON quotes;
DROP POLICY IF EXISTS "Admin delete quotes" ON quotes;

CREATE POLICY "Public read quotes" ON quotes FOR SELECT USING (true);
CREATE POLICY "Admin insert quotes" ON quotes FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update quotes" ON quotes FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete quotes" ON quotes FOR DELETE USING (auth.role() = 'authenticated');

-- STAFF
DROP POLICY IF EXISTS "Public read staff" ON staff;
DROP POLICY IF EXISTS "Admin insert staff" ON staff;
DROP POLICY IF EXISTS "Admin update staff" ON staff;
DROP POLICY IF EXISTS "Admin delete staff" ON staff;

CREATE POLICY "Public read staff" ON staff FOR SELECT USING (true);
CREATE POLICY "Admin insert staff" ON staff FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update staff" ON staff FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete staff" ON staff FOR DELETE USING (auth.role() = 'authenticated');

-- HERO SLIDES
DROP POLICY IF EXISTS "Public read hero_slides" ON hero_slides;
DROP POLICY IF EXISTS "Admin insert hero_slides" ON hero_slides;
DROP POLICY IF EXISTS "Admin update hero_slides" ON hero_slides;
DROP POLICY IF EXISTS "Admin delete hero_slides" ON hero_slides;

CREATE POLICY "Public read hero_slides" ON hero_slides FOR SELECT USING (true);
CREATE POLICY "Admin insert hero_slides" ON hero_slides FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update hero_slides" ON hero_slides FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete hero_slides" ON hero_slides FOR DELETE USING (auth.role() = 'authenticated');

-- ACHIEVERS
DROP POLICY IF EXISTS "Public read achievers" ON achievers;
DROP POLICY IF EXISTS "Admin insert achievers" ON achievers;
DROP POLICY IF EXISTS "Admin update achievers" ON achievers;
DROP POLICY IF EXISTS "Admin delete achievers" ON achievers;

CREATE POLICY "Public read achievers" ON achievers FOR SELECT USING (true);
CREATE POLICY "Admin insert achievers" ON achievers FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update achievers" ON achievers FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete achievers" ON achievers FOR DELETE USING (auth.role() = 'authenticated');

-- HEADLINES
DROP POLICY IF EXISTS "Public read headlines" ON headlines;
DROP POLICY IF EXISTS "Admin insert headlines" ON headlines;
DROP POLICY IF EXISTS "Admin update headlines" ON headlines;
DROP POLICY IF EXISTS "Admin delete headlines" ON headlines;

CREATE POLICY "Public read headlines" ON headlines FOR SELECT USING (true);
CREATE POLICY "Admin insert headlines" ON headlines FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update headlines" ON headlines FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete headlines" ON headlines FOR DELETE USING (auth.role() = 'authenticated');

-- ADMISSIONS (Public can insert, Admin can do all)
DROP POLICY IF EXISTS "Public insert admissions" ON admissions;
DROP POLICY IF EXISTS "Admin read admissions" ON admissions;
DROP POLICY IF EXISTS "Admin update admissions" ON admissions;
DROP POLICY IF EXISTS "Admin delete admissions" ON admissions;

CREATE POLICY "Public insert admissions" ON admissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read admissions" ON admissions FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin update admissions" ON admissions FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete admissions" ON admissions FOR DELETE USING (auth.role() = 'authenticated');

-- ENQUIRIES (Public can insert, Admin can do all)
DROP POLICY IF EXISTS "Public insert enquiries" ON enquiries;
DROP POLICY IF EXISTS "Admin read enquiries" ON enquiries;
DROP POLICY IF EXISTS "Admin update enquiries" ON enquiries;
DROP POLICY IF EXISTS "Admin delete enquiries" ON enquiries;

CREATE POLICY "Public insert enquiries" ON enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read enquiries" ON enquiries FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin update enquiries" ON enquiries FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete enquiries" ON enquiries FOR DELETE USING (auth.role() = 'authenticated');
