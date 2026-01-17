import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const id = (await params).id;
        const item = await prisma.portfolioItem.findUnique({
            where: { id },
        });

        if (!item) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 });
        }

        return NextResponse.json(item);
    } catch (error) {
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const token = request.cookies.get("admin_token")?.value;
    if (!token || !verifyToken(token)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const id = (await params).id;
        const body = await request.json();
        const { title, description, imageUrl, projectUrl, category } = body;

        const updatedItem = await prisma.portfolioItem.update({
            where: { id },
            data: {
                title,
                description,
                imageUrl,
                projectUrl,
                category,
            },
        });

        return NextResponse.json(updatedItem);
    } catch (error) {
        return NextResponse.json({ error: "Error updating item" }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const token = request.cookies.get("admin_token")?.value;
    if (!token || !verifyToken(token)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const id = (await params).id;
        await prisma.portfolioItem.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Error deleting item" }, { status: 500 });
    }
}
