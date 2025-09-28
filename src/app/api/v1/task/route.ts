import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function POST(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
        return NextResponse.json({ error: 'Authorization header missing' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const user = verifyToken(token);
    if (!user) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await request.json();
    const { name, description, projectId } = body;
    // If projectId is provided, connect to the project; otherwise, create without a project
    const data: any = {
        name,
        description,
        userId: user.userId
    };

    if (projectId) {
        data.project = {
            connect: { id: projectId }
        };
    }

    const task = await prisma.task.create({
        data: {
            ...data,
        },
    });
    return NextResponse.json(task);
}

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
        return NextResponse.json({ error: 'Authorization header missing' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const user = verifyToken(token);
    if (!user) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const tasks = await prisma.task.findMany({
        where: {
            userId: user.userId
        },
        include: {
            project: true
        }
    });
    return NextResponse.json(tasks);
}