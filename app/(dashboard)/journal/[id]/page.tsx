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

        },
        include: {
            analysis: true,
        }
    })
    return entry
}
const EntryPage = async ({params}) => {
    // grab the id from the url, and request the appropriate entry from the db
    const entry = await getEntry(params.id)
    return (
    <div className="w-full h-full">    
        {/* can pass this data from server to client, as entry is serialisable 
        this is because entry was on the database, it woudln't be on the db if it wasn't serialisable */}
            <Editor entry={entry}/>

    </div>)
}

export default EntryPage