'use client'
import { updateEntry } from "@/utils/api"
import { useState } from "react"
import { useAutosave } from "react-autosave"

 

const Editor = ({entry}) => {
  const [text, setText] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)

  useAutosave({
    data: text,
    onSave: async (_text) => {
      setIsLoading(true)
      const updated = await updateEntry(entry.id, _text)
      setIsLoading(false)
    },
  })
  return (
    <div className="w-full h-full">
      {isLoading && (<div>...loading</div>)}
      <textarea 
        className="w-full h-full p-8 text-xl" 
        value ={text} 
        onChange={(e)=> setText(e.target.value)}/>
    </div>
  )
}

export default Editor