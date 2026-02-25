
import { addMember } from "./post/memberPost";
import { addAssignment } from "./post/assignmentsPost";
import { getMembers } from "./components/getMembers";
import { getAssignments } from "./components/getAssignments";



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
  await getMembers()
});


const formAssignment = document.querySelector('#assignmentForm') as HTMLFormElement

formAssignment.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(formAssignment)

    const assignment = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        category: formData.get('category') as string
    }
    const result = await addAssignment(assignment)
    console.log(result);
    await getAssignments()
})


