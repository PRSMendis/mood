import Editor from "@/components/Editor"
import { getUserByClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getEntry = async (id)=>  {
    const user = await getUserByClerkID()
    const entry = await prisma.journalEntry.findUnique({
        where: {
            userId_id: {
                userId: user.id,
                id,
            }

        }
    })
    return entry
}
const EntryPage = async ({params}) => {
    // grab the id from the url, and request the appropriate entry from the db
    const entry = await getEntry(params.id)
    const analysisData = [
        {name: 'Subject', value: ''},
        {name: 'Summary', value: ''},
        {name: 'Sentiment', value: ''},
        {name: 'Negative', value: 'False'},
    ]
    return (
    <div className="w-full h-full grid grid-cols-3">    
        {/* can pass this data from server to client, as entry is serialisable 
        this is because entry was on the database, it woudln't be on the db if it wasn't serialisable */}
        <div className="col-span-2">
            <Editor entry={entry}/>
        </div>
        <div className="border-l border-black/10">
            <div className="bg-blue-300 px-6 py-10">
                <h2 className="text-2xl font-semibold">Entry Details</h2>
            </div>
        <div>
            <ul>
                {analysisData.map((data) => (
                    <li key={data.name}
                        className="px-2 py-4 flex  justify-between items-center border-b border-t border-black/10">
                        <span className="font-semibold">{data.name}</span>
                        <span>{data.value}</span>
                    </li>
                ))}
            </ul>
        </div>

        </div>
    </div>)
}

export default EntryPage