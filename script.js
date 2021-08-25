//"use strict";
let tasks = [];

const getPriorityName = function (priority) {
  switch (priority) {
    case "1":
      return "High";
    case "2":
      return "Medium";
    case "3":
      return "Low";
    default:
      return "";
  }
};

const deleteTask = function (i) {
  //get task number = i
  //and confirm before delete
  if (!confirm("Are you sure ?")) return;
  //remove task with task_id = i
  tasks.splice(i, 1);
  //render table again
  renderTable();
};
const moveUp = function (i) {
  if (i == 0) return;
  const oldTask = tasks[i];
  tasks[i] = tasks[i - 1];
  tasks[i - 1] = oldTask;
  renderTable();
};
const moveDown = function (i) {
  if (i == tasks.length - 1) return;
  const oldTask = tasks[i];
  tasks[i] = tasks[i + 1];
  tasks[i + 1] = oldTask;
  renderTable();
};

const renderTable = function () {
  const tbody = document.querySelector("#tasks_tbody");
  tbody.innerHTML = "";
  tasks.forEach((t, i) => {
    const row = `
        <tr>
        <td>${i + 1}</td>
        <td id="name_${i}">${t.name}</td>
        <td id="input_name_${i}" style="display:none;padding:0px;margin:0px;" >
        <input type="text" class="form-control input-sm" style ="margin:0px" >
        </td>
        <td>${getPriorityName(t.priority)}</td>
        <td>
        ${
          i > 0
            ? `<button class="btn btn-sm btn-secondary" onclick="moveUp(${i})">Up</button>`
            : ``
        }
        ${
          i < tasks.length - 1
            ? `<button class="btn btn-sm btn-secondary" onclick="moveDown(${i})">Down</button>`
            : ``
        }
        </td>
        <td>
        <button class="btn btn-primary btn-sm" onclick="editTask(${i})" id="edit_${i}">Edit</button>
        <button class="btn btn-success btn-sm" onclick="saveTask(${i})" style="display:none;" id = "save_${i}">Save</button>
        <button class="btn btn-danger btn-sm" onclick="cancelTask(${i})" style="display:none;" id = "cancel_${i}">Cancel</button>
        <button class="btn btn-danger btn-sm" onclick="deleteTask(${i})">Delete</button></td>
        </tr>
        `;
    tbody.insertAdjacentHTML("beforeEnd", row);
  });
};
const addTask = function () {
  //console.log(this);
  const taskName = document.querySelector("#task_name").value;
  const priority = document.querySelector("#task_priority").value;
  document.querySelector("#task_name").value="";
  if (taskName !== "" && priority > 0) {
    tasks.push({
      name: taskName,
      priority: priority,
    });
    renderTable();
  }
};
const editTask =function(i){
  //to prevent editing more than one task at same time
  renderTable()

  editDisplayButtons(i)
  //to replace task name with input element
  oldRow = document.querySelector('#name_'+i)
  oldValue = oldRow.textContent
  //hide old row
  oldRow.style.display="none"
  //replace old row with new row 
  newRow=document.querySelector("#input_name_"+i)
  //display new row and input element
  newRow.style.display="inline"
  //fill empty input by old value
  newRow.childNodes[1].value=oldValue
}
const editDisplayButtons = function(i){
  //hide edit button and display save,cancel buttons
  document.querySelector("#edit_"+i).style.display="none"
  document.querySelector("#save_"+i).style.display='inline'
  document.querySelector("#cancel_"+i).style.display='inline'
}
const saveTask =function(i){
  //put new value to tasks array
  newRow=document.querySelector("#input_name_"+i)
  tasks[i].name=newRow.childNodes[1].value
  //render to save changes
  renderTable()
}
const cancelTask =function(){
  //render old table
  renderTable()
}

document.querySelector("#add").addEventListener("click", addTask);
var name = "Test3";
var age = 22;
