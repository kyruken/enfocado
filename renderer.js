const createButton = document.getElementById("newProjectButton");
const title = document.getElementById("title");
const form = document.getElementById("form");
const projectTextbox = document.getElementById("projectTextbox");


function createNewProject(inputLabel) {
    let newProject = {
        label: inputLabel,
        timeOutput: 0
    }
    
    return newProject;
}

let projectsArray = [];

createButton.addEventListener("click", () => {
  title.textContent = "yeaight nvim beast";

  form.style = "display: block";


})
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevents page reload
  projectsArray.push(createNewProject(projectTextbox.value));
  console.log("Project added to array: ", projectsArray);
});

const description = document.getElementById("oldDescription")
const newButton = document.getElementById("thisButton")


newButton.addEventListener("click",() => {
  description.textContent = "new description";
})

