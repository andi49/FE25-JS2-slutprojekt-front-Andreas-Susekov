const url = 'http://localhost:3013'

export async function fetchAssigment(){
     const response = await fetch(url + '/assignments')
     if(!response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}

export async function fetchMembers() {
     const response = await fetch(url + '/members')
      if(!response.ok) {
        throw new Error(response.statusText)
    }
    return await response.json()
}
