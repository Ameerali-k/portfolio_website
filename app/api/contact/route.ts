import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, message } = body;

        // Validation
        if (!name || !email || !message) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        // TODO: Integrate with Email service (Resend, SendGrid, etc.) or save to DB
        console.log("Contact Form Submission:", { name, email, message });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
