const url = 'http://localhost:3013'
export async function getMembers() {
    const response = await fetch(url + '/members')

      if(!response.ok) {throw new Error(response.statusText)}

    const users = await response.json()
    const select = document.querySelector('#getAllMembers') as HTMLSelectElement
    select.innerHTML = ''

    const defualtOption = document.createElement('option')
    defualtOption.value = ''
    defualtOption.textContent = 'Choose a member'
    select.appendChild(defualtOption)

    users.forEach((user: {name:string, category:string}) => {
        const option = document.createElement('option')
        option.value = user.name
        option.textContent = user.name + ' (' + user.category + ')'
        select.appendChild(option)
    })
}
getMembers()