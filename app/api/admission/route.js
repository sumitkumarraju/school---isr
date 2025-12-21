import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Admission from '@/models/Admission';

// Fetch Admission Status for Public Site
export async function GET() {
    await dbConnect();
    const data = await Admission.findOne().sort({ _id: -1 }); // Get latest
    return NextResponse.json(data || {});
}

// Update Settings (Admin Only)
export async function PUT(req) {
    // Add middleware auth check here or rely on route middleware
    await dbConnect();
    const body = await req.json();

    // Update or Create the single config document
    const updated = await Admission.findOneAndUpdate({}, body, { upsert: true, new: true });
    return NextResponse.json(updated);
}
