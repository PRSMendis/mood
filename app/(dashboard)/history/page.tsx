import HistoryChart from "@/components/History";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getData = async () => {
    const user = await getUserByClerkID();
    const analyses = await prisma.analysis.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: 'asc',
        },
    });

    const sum = analyses.reduce((all, current) => all + current.sentimentScore, 0);
    const average = Math.round(sum / analyses.length);

    return {analyses, average}
            
}

const History = async () => {
    const {average, analyses} = await getData();
    console.log('analyses: ', analyses);
    return (
        <div className="h-full w-full">
        <div>{`Avg. Sentiment ${average}`}</div>
        <div className="h-full w-full">
            <HistoryChart data={analyses}/>
        </div>
        </div>
    );
}

export default History;