import { error } from "console"

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

export const askQuestion = async (question) => {
    console.log('question:', question)
    const res = await fetch(
        new Request(createURL(`/api/question`), {
            method: 'POST',
            body: JSON.stringify({ question }),
        })
    )

    if (res.ok) {
        // const data = await res.json()
        // return data.data
        const jsonResponse = await res.json();
        console.log('API response:', jsonResponse);
        console.log('Found output_text:', jsonResponse.date.output_text); // Confirm output_text is present
        return jsonResponse.date.output_text; // Make sure to return the specific part of the response you need


    } else {
        console.log('error:', res)
        throw new Error('Something went wrong on API server!')

    }


}