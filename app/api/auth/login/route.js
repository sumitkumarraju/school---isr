import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { getJwtSecretKey } from '@/lib/auth';

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        await dbConnect();

        const admin = await Admin.findOne({ email });
        if (!admin) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

        // Generate JWT
        const token = await new SignJWT({ email: admin.email, role: 'admin' })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('24h')
            .sign(getJwtSecretKey());

        const response = NextResponse.json({ success: true });

        // Set HTTP-Only Cookie
        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Login Error:', error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
