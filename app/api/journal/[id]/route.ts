import { analyse } from "@/utils/ai"
import { updateEntry } from "@/utils/api"
import { getUserFromClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

// export const PATCH = async (request: Request, { params }) => {
//     const { content } = await request.json()
//     const user = await getUserFromClerkID()

//     const UpdatedEntry = await prisma.journalEntry.update({
//         where: {
//             userId_id: {
//                 userId: user.id,
//                 id: params.id,
//             },
//         },
//         data: {
//             content,

//         },
//     })

//     if (!UpdatedEntry || !UpdatedEntry.content) {
//         console.error("UpdateEntry or UpdateEntry.content is undefined");
//         return NextResponse.json({ error: "Invalid update entry" });
//     }

export const PATCH = async (request: Request, { params }) => {
    const requestBody = await request.json();
    console.log("Request Body:", requestBody); // Log the request body

    const user = await getUserFromClerkID();
    const UpdatedEntry = await prisma.journalEntry.update({
        where: {
            userId_id: {
                userId: user.id,
                id: params.id,
            },
        },
        data: {
            content: requestBody.content, // Use requestBody.content directly
        },
    });

    console.log("Updated Entry after Prisma update:", UpdatedEntry); // Log the updated entry

    if (!UpdatedEntry || !UpdatedEntry.content) {
        console.error("UpdateEntry or UpdateEntry.content is undefined");
        return NextResponse.json({ error: "Invalid update entry" });
    }


    const analysis = await analyse(UpdatedEntry.content)

    const updated = await prisma.analysis.upsert({
        where: {
            entryId: UpdatedEntry.id,
        },
        create: {
            entryId: UpdatedEntry.id,
            ...analysis,
        },
        update: analysis,

    })

    console.log("Updated Entry:", UpdatedEntry)
    console.log("Updated Analysis:", updated)

    return NextResponse.json({ data: { ...UpdatedEntry, analysis: updated } })
} 