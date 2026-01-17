import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export const dynamic = "force-dynamic";


export async function GET() {
    try {
        const items = await prisma.portfolioItem.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(items);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const token = request.cookies.get("admin_token")?.value;
    if (!token || !verifyToken(token)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { title, description, imageUrl, projectUrl, category } = body;

        const newItem = await prisma.portfolioItem.create({
            data: {
                title,
                description,
                imageUrl,
                projectUrl,
                category,
            },
        });

        return NextResponse.json(newItem);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error creating item" }, { status: 500 });
    }
}
