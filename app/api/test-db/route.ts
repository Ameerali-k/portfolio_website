import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        // Attempt to query the database
        const start = Date.now();
        await prisma.$queryRaw`SELECT 1`;
        const end = Date.now();

        return NextResponse.json({
            status: "Connected",
            message: "Database connection successful!",
            responseTime: `${end - start}ms`,
            env: process.env.NODE_ENV
        });
    } catch (error: any) {
        console.error("Database Connection Test Failed:", error);

        return NextResponse.json({
            status: "Error",
            message: "Could not connect to the database.",
            error: error.message,
            code: error.code,
            meta: error.meta,
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined
        }, { status: 500 });
    }
}
