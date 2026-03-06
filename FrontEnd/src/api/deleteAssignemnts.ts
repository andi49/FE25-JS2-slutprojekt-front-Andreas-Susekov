const url  = 'http://localhost:3013'

export async function deleteAssignment(id:string) {
    try{
          const response = await fetch(url + `/assignments/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error('Failed to delete assignment');
    }

     const updated = await response.json();

    return updated
  } catch (error) {
    console.log(error)
    console.error(error);
    throw error;
  }
}
