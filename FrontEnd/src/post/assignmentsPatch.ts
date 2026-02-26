const url = 'http://localhost:3013'


export const assignmentPatch = async (id: string, assignedto: string) => {
    try{
            const response = await fetch(url + `/assignments/${id}`,
            {
                    method: "PATCH",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(assignedto)
            })
            const data = response.json()
            console.log(data)


    } catch (error) {
            console.log(error)
    }
}