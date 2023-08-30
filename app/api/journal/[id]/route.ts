import { analyse } from "@/utils/ai";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const PATCH = async (request: Request, {params}) => {
    // destrucutre the content from the request body
    const {content} = await request.json();
    const user = await getUserByClerkID();
    const updatedEntry = await prisma.journalEntry.update({
        where: {
            userId_id: {
                userId: user.id,
                id: params.id,
            },
        },
        data: {
            content,
        },
    });

    const analysis = await analyse(updatedEntry.content)
    const updated = await prisma.analysis.upsert({
        where: {
            entryId: updatedEntry.id,
        },
        create: {
            entryId: updatedEntry.id,
            ...analysis,
        },
        update: analysis,
        
    });
    console.log('updated: ', updated);

    return NextResponse.json({data: updatedEntry});

}