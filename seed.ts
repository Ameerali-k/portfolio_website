import { PrismaClient } from "@prisma/client";
import { hashPassword } from "./lib/auth";

const prisma = new PrismaClient();

async function main() {
    const password = await hashPassword("Admin123");

    // Seed Admin
    const user = await prisma.user.upsert({
        where: { username: "admin" },
        update: {},
        create: {
            username: "admin",
            password,
        },
    });
    console.log("Admin user created/updated:", user.username);

    // Seed Portfolio Items
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
        console.log("Sample portfolio items added.");
    } else {
        console.log("Portfolio already has data, skipping item seed.");
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
