import { makeTodoItem } from "./toDoObject.js";
import { myList } from "./toDoList.js";
import { refreshAllLists } from "./renderList.js";
import { taskDetailsManager } from "./render.js";
import { parseISO, isBefore } from "date-fns";


export function addTask() {
    const addTaskInput = document.querySelector(".addTask");


    if (!addTaskInput) return;

    addTaskInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && addTaskInput.value.trim() !== "") {
            e.preventDefault();

            const newTask = makeTodoItem(addTaskInput.value);
            myList.addItem(newTask);
            addTaskInput.value = "";

            refreshAllLists();
        }
    });

}

export function clickLi(li) {
    li.addEventListener("click", (e) => {
        const clickedLi = e.currentTarget;
        const taskId = clickedLi.dataset.taskId;

        const taskData = myList.getItemById(taskId);
        const ulElement = clickedLi.parentElement;

        const allSelected = document.querySelectorAll(".selected");
        for (const el of allSelected) {
            el.classList.remove("selected");
        }

        clickedLi.classList.add("selected");

        const panel = taskDetailsManager.render(taskId);
        addTaskDetails(panel, taskData, ulElement);
    });
}

function addTaskDetails(panel, taskData, ulElement) {

    let header = panel.querySelector("h2");
    if (!header) {
        header = document.createElement("h2");
        panel.appendChild(header);
    }
    header.textContent = taskData.title;

    let description = panel.querySelector("textarea");
    if (!description) {
        description = document.createElement("textarea");
        description.placeholder = " + notes"
        panel.appendChild(description);
    }
    description.value = taskData.description || "";


    let buttonContainer = panel.querySelector(".buttonContainer");
    if (!buttonContainer) {
        buttonContainer = document.createElement("div");
        buttonContainer.className = "buttonContainer";
        panel.appendChild(buttonContainer);
    }
    buttonContainer.innerHTML = ""; // clear old buttons

    // --- Completed Button ---
    const completedHeader = document.createElement("h3");
    completedHeader.textContent = "Status";
    const completedButton = document.createElement("button");
    completedButton.className = "completed";
    completedButton.textContent = taskData.completed ? "Done" : "Not Done";

    completedButton.addEventListener("click", () => {
        taskCompleted(taskData.id);
        const panel = taskDetailsManager.render(taskData.id);
        addTaskDetails(panel, taskData, ulElement);
        myList.saveChanges();
        refreshAllLists();
    });

    buttonContainer.append(completedHeader, completedButton);

    // --- Priority Button ---
    const priorityHeader = document.createElement("h3");
    priorityHeader.textContent = "Priority";
    const priorityButton = document.createElement("button");
    priorityButton.className = "priority";
    priorityButton.textContent = taskData.priority || "None";

    priorityButton.addEventListener("click", () => {
        changePriority(taskData.id);
        const panel = taskDetailsManager.render(taskData.id);
        addTaskDetails(panel, taskData, ulElement);
        myList.saveChanges();
        refreshAllLists();
    });

    buttonContainer.append(priorityHeader, priorityButton);


    let dateContainer = panel.querySelector(".dateContainer");
    if (!dateContainer) {
        dateContainer = document.createElement("div");
        dateContainer.className = "dateContainer";
        panel.appendChild(dateContainer);
    }
    dateContainer.innerHTML = ""; // clear old date content

    const dateHeader = document.createElement("h3");
    dateHeader.textContent = "Due Date";
    const dueDate = document.createElement("input");
    dueDate.type = "date";
    dueDate.value = taskData.dueDate || "";

    dueDate.addEventListener("change", (e) => {
        const newDate = e.currentTarget.value;
        const parseDate = parseISO(newDate);
        const today = new Date();

        if (isBefore(parseDate, today)) {
            alert("This date is in the past and therefore the task can never be completed :(");

            e.currentTarget.value = taskData.value || "";
            return;
        }

        taskData.dueDate = e.currentTarget.value;

        myList.saveChanges();
        refreshAllLists();

    });

    dateContainer.append(dateHeader, dueDate);

    let taskTypeContainer = panel.querySelector(".taskType");
    if(!taskTypeContainer) {
        taskTypeContainer = document.createElement("div");
        taskTypeContainer.className = "taskType";
        panel.appendChild(taskTypeContainer);
    } 
    taskTypeContainer.innerHTML = "";

    const typeHeader = document.createElement("h3");
    typeHeader.textContent = "Type of task";
    
    const form = document.createElement("form");
    const label = document.createElement("label");
    label.textContent = "Choose type of car: ";
    
    const select = document.createElement("select");
    select.id = "selectTaskType";
    const personalOption = document.createElement("option");
    personalOption.value = "personal";
    personalOption.textContent = "Personal";
    const studyOption = document.createElement("option");
    studyOption.value = "study";
    studyOption.textContent = "Study";
    const groceryOption = document.createElement("option");
    groceryOption.value = "grocery";
    groceryOption.textContent = "Grocery";

    select.append(personalOption, studyOption, groceryOption);
    form.append(label, select);

    select.addEventListener("change", (e) => {
        const taskType = e.currentTarget.value;
        taskData.type = taskType;
        console.log(taskData.type);

        myList.saveChanges();
        refreshAllLists(); 
    });

    taskTypeContainer.append(typeHeader, form);
}



function taskCompleted(taskId) {
    const item = myList.getItemById(taskId);
    item.completed = !item.completed;
    taskDetailsManager.render(taskId);
}

function changePriority(taskId) {
    const item = myList.getItemById(taskId);
    item.priority = !item.priority;
    taskDetailsManager.render(taskId);
}
