# Creating Admin Account in Supabase

Follow these steps to create an admin user account:

## Step 1: Go to Supabase Authentication
1. Open your **Supabase Dashboard**
2. Click on **Authentication** in the left sidebar
3. Click on **Users** tab

## Step 2: Add New User
1. Click the **Add User** button
2. Choose **Create new user**
3. Fill in the details:
   - **Email**: `admin@iisgohana.com` (or your preferred email)
   - **Password**: Choose a strong password (minimum 6 characters)
   - Leave "Auto Confirm User" **CHECKED** (important!)
4. Click **Create User**

## Step 3: Test Login
1. Visit your website's admin portal: `http://localhost:3000/admin`
2. You'll be redirected to the login page
3. Enter the email and password you just created
4. Click **Sign In**

## Recommended Credentials
```
Email: admin@iisgohana.com
Password: anil@admin75
```

**IMPORTANT:** Use exactly these credentials when creating the user in Supabase!

## Security Notes
- Keep your admin credentials secure
- Don't share the password
- Use a strong password with letters, numbers, and symbols
- Consider using a different email for production

## Troubleshooting
- If login fails, check that "Auto Confirm User" was enabled
- Verify the email confirmation status in Supabase Users tab
- Make sure your `.env.local` has the correct Supabase keys
