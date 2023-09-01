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

export const askQuestion = async (question) => {
    const res = await fetch(
      new Request(createURL(`/api/question`), {
        method: 'POST',
        body: JSON.stringify({ question }),
      })
    )
  
    if (res.ok) {
      return res.json()
    } else {
      throw new Error('Something went wrong on API server!')
    }
  }
