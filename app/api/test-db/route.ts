import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const start = Date.now();
        // Test a simple query
        await prisma.$queryRaw`SELECT 1`;
        const end = Date.now();

        // Check if tables exist by counting
        const itemCount = await prisma.portfolioItem.count();

        return NextResponse.json({
            status: "Connected",
            message: "Database connection successful!",
            time: `${end - start}ms`,
            portfolioItemsCount: itemCount,
            env: process.env.NODE_ENV
        });
    } catch (error: any) {
        console.error("DEBUG: Database Connection Test Failed:", error);

        return NextResponse.json({
            status: "Error",
            message: "Database test failed.",
            errorName: error.name,
            errorMessage: error.message,
            errorCode: error.code,
            clientVersion: error.clientVersion,
            stack: error.stack?.split("\n").slice(0, 3).join("\n"), // Only first 3 lines of stack
            suggestion: "Check if DATABASE_URL is correct in Vercel and if Supabase is allowing connections."
        }, { status: 500 });
    }
}
