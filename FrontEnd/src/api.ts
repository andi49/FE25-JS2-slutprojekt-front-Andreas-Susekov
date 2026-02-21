const url = 'http://localhost:3013/members'

export const addMember = async (member: { name: string; category: string }) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(member)
        }) 
        const data = await response.json()
        return data
    } catch(error) {
            console.error('ERROR', error)
        }
}