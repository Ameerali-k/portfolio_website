import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const password = await hashPassword("Admin123");
        const user = await prisma.user.upsert({
            where: { username: "admin" },
            update: {},
            create: {
                username: "admin",
                password,
            },
        });

        const count = await prisma.portfolioItem.count();
        if (count === 0) {
            await prisma.portfolioItem.createMany({
                data: [
                    {
                        title: "Annual Investment Meeting",
                        description: "On-site exhibition designs in coordination with Ministry of Foreign Trade.",
                        imageUrl: "https://placehold.co/600x400/008000/ffffff?text=AIM+Branding",
                        category: "Branding",
                    },
                    {
                        title: "Medical Product Packaging",
                        description: "Packaging design for Safecare Technology products.",
                        imageUrl: "https://placehold.co/600x400/181f1c/ffffff?text=Packaging",
                        category: "Packaging",
                    },
                ]
            });
        }

        return NextResponse.json({ success: true, user });
    } catch (error: any) {
        return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 });
    }
}
