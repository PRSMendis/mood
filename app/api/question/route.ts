import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { qa } from "@/utils/ai";
import { NextResponse } from "next/server";

export const POST = async (req)=> {
    const {question} = await req.json();
    const user = await getUserByClerkID();

    const entries = await prisma.journalEntry.findMany({
        where: {
            userId: user.id,
        },
        // Providing the select option causes less data to be returned which serves data costs
        select: {
            id: true,
            content: true,
            createdAt: true,
        },
    });

    console.log('answer:');
    const answer = await qa(question, entries);

    return NextResponse.json({data: answer});


}