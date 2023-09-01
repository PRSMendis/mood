'use client'

import { askQuestion } from "@/utils/api"
import { useState } from "react"

const Question = () => {

    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState()

    const handleSubmit = async (e)=> {
        e.prevent.default()
        setLoading(true)
        console.log('setLoading(true): ', setLoading(true));
        const answer = await askQuestion(value)
        console.log('answer', await answer)
        setResponse(answer)
        setTimeout(() => {
            
        }, 2000);
        setValue('')
        setLoading(false)
    }

    const onChange = (e)=> {
        e.preventDefault()
        setValue(e.target.value)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input disabled={loading} onChange={onChange} value={value} type="text" placeholder="Ask a question"
                className="border-black/20 px-4 py-2 text-lg" />
                <button disabled={loading} type="submit" className="bg-blue-400 px-4 py-2 rounded-lg">Ask</button>
            </form>
            {loading && <div>...loading</div>}
            <div>{response}</div>
            {response && <div>{response}</div>}
        </div>
    )
}

export default Question