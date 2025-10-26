const createButton = document.getElementById("newProjectButton");
const title = document.getElementById("title");
const form = document.getElementById("form");
const projectTextbox = document.getElementById("projectTextbox");

const projectDropdownList = document.getElementById("projectsDropdown");

// function addProjectToDropdown(projectName) {
//   const projectDropdownList = document.getElementById("projectsDropdown");
//
//   let li = document.createElement("li");
//   let a = document.createElement("a");
//
//   a.textContent = projectName;
//   a.href = "#";
//
//   li.appendChild(a);
//
//   a.classList.add("dropdown-item");
//   projectDropdownList.appendChild(li);
//   console.log("Added to dropdown")
// }
//
// function createNewProject(inputLabel) {
//     let newProject = {
//         label: inputLabel,
//         timeOutput: 0
//     }
//
//     return newProject;
// }
//
// let projectsArray = [];
//
// createButton.addEventListener("click", () => {
//   title.textContent = "yeaight nvim beast";
//
//   form.style = "display: block";
//
// })
// form.addEventListener('submit', function(event) {
//   event.preventDefault(); // Prevents page reload
//   projectsArray.push(createNewProject(projectTextbox.value));
//   addProjectToDropdown(projectTextbox.value);
// });
//
// const description = document.getElementById("oldDescription")
// const newButton = document.getElementById("thisButton")
//
//
// newButton.addEventListener("click",() => {
//   description.textContent = "new description";
// })
//
