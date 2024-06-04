import { analyse } from "@/utils/ai"
import { getUserFromClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export const POST = async () => {
    const user = await getUserFromClerkID()
    const entry = await prisma.journalEntry.create({
        data: {
            userId: user.id,
            content: "write about you day here",
        },
    })

    // console.log("Before analysis, entry:", entry);
    const analysis = await analyse(entry.content);
    console.log("Analyzing entry:", entry.content);


    await prisma.analysis.create({
        data: {
            entryId: entry.id,
            ...analysis,
        }
    })

    revalidatePath("/journal")
    return NextResponse.json({ data: entry })
}