const taskinp = document.getElementById("taskinput")
const addBtn = document.getElementById("addbtn")
const list = document.getElementById("tasklist")

let tasks =JSON.parse(localStorage.getItem("tasks")) || []
tasks.forEach(taskObj => {
    addTaskToDOM(taskObj);
});

addBtn.addEventListener("click",()=>{
    const task = taskinp.value.trim();
    if(task === ""){
        return;
    }
    const taskObj = {
        text:task, completed:false
    }
    tasks.push(taskObj)
    saveTasks();
    addTaskToDOM(taskObj)
    taskinp.value = ""
})
function addTaskToDOM(taskObj){

const li = document.createElement("li");
    li.textContent = `📝 ${taskObj.text}`;
    const editBtn = document.createElement("button");
editBtn.textContent = "✏️";
editBtn.classList.add("editButton");
editBtn.addEventListener("click", () => {
  const updatedText = prompt("Edit your task:", taskObj.text);
  if (updatedText && updatedText.trim() !== "") {
    taskObj.text = updatedText.trim();
    li.childNodes[0].nodeValue = updatedText;
    saveTasks();
  }
});

li.append(editBtn);


    if(taskObj.completed){
        li.classList.add("completed")
    }

    taskinp.value = ""
    li.addEventListener("click",()=>{
        taskObj.completed = !taskObj.completed
        li.classList.toggle("completed")
        saveTasks();
        
    })

    const delBtn = document.createElement("button")
delBtn.textContent = "❌";
delBtn.classList.add("delButton")
delBtn.addEventListener("click",(e)=>{
    e.stopPropagation();
    tasks = tasks.filter(t => t != taskObj)
    li.remove();
    saveTasks();

})
li.append(delBtn)
list.append(li)
}
    function saveTasks(){
        localStorage.setItem("tasks",JSON.stringify(tasks))
    }

