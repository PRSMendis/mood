import { analyse } from "@/utils/ai";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async() => {
    const user = await getUserByClerkID();
    const entry = await prisma.journalEntry.create({
        data: {
            userId: user.id,
            content: 'Write about your day here'
        }
    });

    const analysis = await analyse(entry.content);
    await prisma.analysis.create({
        data: {
            entryId: entry.id,
            mood:analysis.mood,
            summary: analysis.summary,
            color: analysis.color,
            negative: analysis.negative,
            subject: analysis.subject,

            // ...analysis
        }
    });

    // clear the cache, and go get it again
    revalidatePath('/journal');


    return NextResponse.json({data: entry});
}