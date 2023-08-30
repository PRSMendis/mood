import Editor from "@/components/Editor"
import { getUserByClerkID } from "@/utils/auth"
import { prisma } from "@/utils/db"

const getEntry = async (id)=>  {
    const user = await getUserByClerkID()
    const entry = await prisma.journalEntry.findUnique({
        where: {
            id
        }
    })
    return entry
}
const EntryPage = ({params}) => {
    return <div>
        <Editor entry={params}/>
        </div>
}

export default EntryPage