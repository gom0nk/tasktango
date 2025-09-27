import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get("authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ error: "No token provided" }, { status: 401 });
        }

        const token = authHeader.substring(7);

        try {
            const decoded = verifyToken(token);
            const userId = decoded?.userId;

            // Get user from database
            const user = await prisma.user.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            });

            if (!user) {
                return NextResponse.json({ error: "User not found" }, { status: 404 });
            }

            return NextResponse.json({ user });
        } catch (error) {
            console.error("Error verifying token:", error);
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }
    } catch (error) {
        console.error("Error validating token:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
