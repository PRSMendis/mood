'use client'

import { useState } from "react"

const Question = () => {

    const [value, setValue] = useState('')

    const handleSubmit = (e)=> {
        e.prevent.default()
    }

    const onChange = (e)=> {
        e.prevent.default()
        setValue(e.target.value)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={onChange} value={value} type="text" placeholder="Ask a question"
                className="border-black/20 px-4 py-2 text-lg" />
                <button type="submit" className="bg-blue-400 px-4 py-2 rounded-lg">Ask</button>
            </form>
        </div>
    )
}

export default Question