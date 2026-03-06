const url  = 'http://localhost:3013'

/// function to say what need to changes
export async function patchAssignment(id:string, assigendto:string, status:string) {
    try{
        const response = await fetch(url + `/assignments/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ assigendto: assigendto, status:status }) 
    });
   if (!response.ok) {
      throw new Error('Failed to update assignment');
    }

     const updated = await response.json();

    return updated
  } catch (error) {
    
    console.error(error);
    throw error;
  }
}

