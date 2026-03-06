const url = 'http://localhost:3013'
export async function getMembers() {
    const response = await fetch(url + '/members')

      if(!response.ok) {throw new Error(response.statusText)}

    const users = await response.json()
    return users
    
}
getMembers()

