'use client'
import { updateEntry } from "@/utils/api"
import { useState } from "react"
import { useAutosave } from "react-autosave"

 

const Editor = ({entry}) => {
  const [text, setText] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)

  const {mood, summary, color, subject, negative} = entry.analysis
    const analysisData = [
        {name: 'Subject', value: subject},
        {name: 'Summary', value: summary},
        {name: 'Mood', value: mood},
        {name: 'Negative', value: negative ? 'Yes' : 'No'},
    ]
  // by default has a 2000
  useAutosave({
    data: text,
    onSave: async (_text) => {
      setIsLoading(true)
      const updated = await updateEntry(entry.id, _text)
      setIsLoading(false)
    },
  })
  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
      {isLoading && (<div>...loading</div>)}
      <textarea 
        className="w-full h-full p-8 text-xl" 
        value ={text} 
        onChange={(e)=> setText(e.target.value)}/>
      </div>
      <div className="border-l border-black/10">
            <div className="px-6 py-10" style={{backgroundColor: color}}>
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
    </div>
  )
}

export default Editor