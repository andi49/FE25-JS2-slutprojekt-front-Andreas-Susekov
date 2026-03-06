const url = 'http://localhost:3013'
import { getAssignments } from "../components/renderAssignments";
export const addMember = async (member: { name: string; category: string }) => {
    try {
        const response = await fetch(url + '/members', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(member)
        }) 

        if(!response.ok) { throw new Error(`HTTP ERROR! status: ${response.status} `)}
        

        const data = await response.json()
          await getAssignments();
        return data
    } catch(error) {
            console.error('ERROR', error)
        }
}