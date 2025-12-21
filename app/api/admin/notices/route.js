import dbConnect from "@/lib/mongodb";
import Notice from "@/models/Notice";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect();
    // Add some cache control headers if strict caching is needed, but 'no-store' in fetch usually handles it client side
    const notices = await Notice.find().sort({ createdAt: -1 });
    return NextResponse.json(notices);
}

export async function POST(req) {
    await dbConnect();
    const data = await req.json();
    const notice = await Notice.create(data);
    return NextResponse.json(notice);
}

export async function DELETE(req) {
    await dbConnect();
    const { id } = await req.json();
    await Notice.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
}
