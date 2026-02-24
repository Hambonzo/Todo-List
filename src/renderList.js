import { clickLi } from "./logic.js";
import { taskDetailsManager } from "./render.js";
import { myList } from "./toDoList.js";


export function renderList(tasksArray, ulElement) {
    if(!ulElement) return;
    ulElement.innerHTML = ""

    for (const item of tasksArray) {
        const li = document.createElement("li");

        const info = document.createElement("div");
        if (item.completed === true) {
            info.className = "complete";
        }

        const interaction = document.createElement("div");
        interaction.className = "interaction";

        info.textContent = item.title;
        li.dataset.taskId = item.id;

        if(item.priority === true) {
            const prio = document.createElement("span");
            prio.className = "prio";
            prio.textContent = " (Priority Task)";
            info.appendChild(prio);
        }

        const remove = document.createElement("button");
        remove.textContent = "X";
        remove.className = "removeButtton";

        remove.addEventListener("click", (e) => {
            e.stopPropagation();
            taskDetailsManager.clear(li.dataset.taskId);
            removeLi(li.dataset.taskId, ulElement);
        })

        interaction.appendChild(remove);
        li.append(info, interaction);
        ulElement.appendChild(li);

        clickLi(li);
    }
}

export function refreshAllLists() {
    const today = document.querySelector(".today");
    const tomorrow = document.querySelector(".tomorrow");
    const upcoming = document.querySelector(".upcoming");

    const myDay = document.querySelector(".myDayList");

    const dayOne = document.querySelector(".weekToday");
    const dayTwo = document.querySelector(".weekTmrw");
    const dayThree = document.querySelector(".plusOne");
    const dayFour = document.querySelector(".plusTwo");
    const dayFive = document.querySelector(".plusThree");
    const daySix = document.querySelector(".plusFour");
    const daySeven = document.querySelector(".plusFive");

    const personal = document.querySelector(".personalUl");
    const study = document.querySelector(".studyUl");
    const grocery = document.querySelector(".groceryUl");


    
    renderList(myList.todayList(), today);
    renderList(myList.tomorrowList(), tomorrow);
    renderList(myList.upcomingList(), upcoming);
    
    renderList(myList.todayList(), myDay);

    renderList(myList.todayList(), dayOne);
    renderList(myList.tomorrowList(), dayTwo);
    renderList(myList.daysFromToday(2), dayThree);
    renderList(myList.daysFromToday(3), dayFour);
    renderList(myList.daysFromToday(4), dayFive);
    renderList(myList.daysFromToday(5), daySix);
    renderList(myList.daysFromToday(6), daySeven);

    renderList(myList.listOfTaskType("personal"), personal);
    renderList(myList.listOfTaskType("study"), study);
    renderList(myList.listOfTaskType("grocery"), grocery);

    console.log("personal", personal);
    console.log("study", study);

}

function removeLi(taskId) {
    const item = myList.getItemById(taskId);
    myList.removeItem(item);

    refreshAllLists();
}



