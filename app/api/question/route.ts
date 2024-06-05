import { qa } from "@/utils/ai";
import { getUserFromClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { request } from "http";
import { NextResponse } from "next/server";
import { date } from "zod";

export const POST = async (request) => {
    const { question } = await request.json()
    const user = await getUserFromClerkID()

    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user.id,
        },
        select: {
            id: true,
            content: true,
            createdAt: true,

        },
    })

    const answer = await qa(question, entries)

    return NextResponse.json({ date: answer })
}