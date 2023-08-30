const createURL = (path: string) => {
    return window.location.origin + path
}
export const updateEntry = async (id, content) => {
    const res = await fetch(new Request(createURL(`/api/journal/${id}`), {
        method: 'PATCH',
        body: JSON.stringify({content}),
    }))

    if (res.ok) {
        const json = await res.json()
        return json.data
    }

    //.. when error
    // return {error: true, code  : 2310, message: 'Something went wrong'}
}

export const createNewEntry = async () => {
    const res = await fetch(new Request(createURL("/api/journal"), {
        method: 'POST',
    }))

    if (res.ok) {
        const json = await res.json()
        return json.data
    }
}
