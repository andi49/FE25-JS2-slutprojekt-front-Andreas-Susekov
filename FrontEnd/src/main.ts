const url = 'http://localhost:3013'
import { addMember } from "./api";

async function getMembers(){
    const response = await fetch(url + '/members');
    const users = await response.json();
    const select = document.querySelector('#getAllMembers') as HTMLSelectElement
    select.innerHTML = '<option value="">Choose member</option>';

    users.forEach((user: { name: string }) => {
    const option = document.createElement('option');
    option.textContent = user.name;  
    select.appendChild(option);
  });
  
    console.log(users);
}

async function getAssignments() {
      const response = await fetch(url + '/assignments');
      const assignments = await response.json()
     const display = document.querySelector('#test') as HTMLParagraphElement
     
     assignments.forEach((item: { title: string }) => {
    display.textContent += item.title + " ";
  })
}




const form = document.querySelector('#memberForm') as HTMLFormElement;

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const member = {
    name: formData.get('name') as string,
    category: formData.get('category') as string
  };

  const result = await addMember(member);
  console.log(result);
});




getMembers();

getAssignments()