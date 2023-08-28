'use client'

import { createNewEntry } from "@/utils/api"
import { useRouter } from "next/navigation"

const NewEntryCard = () => {
    const router = useRouter()
    const handleOnClick = async () => {
        console.log('clicked')
        const data = await createNewEntry()
        console.log('data: ', data);
        // router push adds new url to stack, so that back button works
        router.push(`/journal/${data.id}`)
    }
    const handleOnClick2 = () => {
        console.log('clicked')
    }
    return (
        <div
          className="cursor-pointer overflow-hidden rounded-lg bg-white shadow"
         
        >
          <div className="px-4 py-5 sm:p-6"  onClick={handleOnClick}>
            <span className="text-3xl">New Entry</span>
          </div>
        </div>
      )
}

export default NewEntryCard;