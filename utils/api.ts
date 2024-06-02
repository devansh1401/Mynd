const createURL = (path) => window.location.origin + path


export const updateEntry = async (id, content) => {
    const res = await fetch(
        new Request(createURL(`/api/journal/${id}`), {
            method: 'PATCH',
            body: JSON.stringify({ content }),
        })
    )

    if (res.ok) {
        const data = await res.json()
        return data.data
    } else {
        throw new Error('Something went wrong on API server!')
    }
}

export const createNewEntry = async () => {
    const res = await fetch(
        new Request(createURL('/api/journal'), {
            method: 'POST',
            body: JSON.stringify({ content: 'new entry' }),
        })
    )

    if (res.ok) {
        const data = await res.json()
        return data.data
    } else {
        throw new Error('Something went wrong on API server!')
    }
}