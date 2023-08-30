'use client'
import { useState } from "react"

 

const Editor = ({entry}) => {
  const [text, setText] = useState(entry.content)
  return (
    <div className="w-full h-full">
      <textarea className="w-full h-full p-8 text-xl" value = {text} onChange={(e)=> setText(e.target.value)}/>
    </div>
  )
}

export default Editor