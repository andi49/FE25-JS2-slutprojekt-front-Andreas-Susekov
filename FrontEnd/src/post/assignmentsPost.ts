const url = 'http://localhost:3013'

export const addAssignment = async (assignment: { title: string, description:string, category:string}) => {
    try {
        const response = await fetch(url + '/assignments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(assignment)
        }) 
       if(!response.ok) { throw new Error(`HTTP ERROR! status: ${response.status} `)}
       
        const data = await response.json()
         
        return data
    } catch(error) {
            console.error('ERROR', error)
        }
    }
