import {apiUrl} from "./Context.ts";

export type Subject = {
    document_url: string,
    characters: string,
    character_images?: Array<{ url: string }>
    meanings: [
        meaning: string
    ],
    readings?: [
        reading: string
    ],


}

async function getSubject(id: number): Promise<Subject | void> {
    return fetch(`${apiUrl}/subjects/${id}`, {
        headers: {Authorization: `Bearer ${localStorage.getItem("apiToken")}`}
    })
        .then((response) => response.json())
        .then((data) => {
            return data.data as Subject
        })
}

export default getSubject