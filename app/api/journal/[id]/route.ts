import { getUserFromClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"


export const PATCH = async (request: Request, { params }) => {
    const { content } = await request.json()
    const user = await getUserFromClerkID()

    const UpdatedEntry = await prisma.journalEntry.update({
        where: {
            userId_id: {
                userId: user.id,
                id: params.id,
            },
        },
        data: {
            content,

        },
    })

    return NextResponse.json({ data: UpdatedEntry })
} 