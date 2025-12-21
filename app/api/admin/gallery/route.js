import dbConnect from "@/lib/mongodb";
import Gallery from "@/models/Gallery";
import { NextResponse } from "next/server";

export async function POST(req) {
    await dbConnect();
    const data = await req.json();
    const image = await Gallery.create(data);
    return NextResponse.json(image);
}

export async function GET() {
    await dbConnect();
    const images = await Gallery.find().sort({ createdAt: -1 });
    return NextResponse.json(images);
}

export async function DELETE(req) {
    await dbConnect();
    const { id } = await req.json();
    await Gallery.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
}
