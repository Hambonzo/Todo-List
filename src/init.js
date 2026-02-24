import { Render } from "./render.js";
import { addTask } from "./logic.js";
import { myList } from "./toDoList.js";
import { refreshAllLists } from "./renderList.js";

export function startApp() {
   

    Render({ header: "All my tasks", layout: "allTasks" });
    addTask();
    retrieveSavedList();

    const allTasks = document.querySelector(".allButton");
    allTasks.addEventListener("click", () => {
        Render({ header: "All my tasks", layout: "allTasks" });
        addTask();
        refreshAllLists();

    });

    const myDay = document.querySelector(".day");
    myDay.addEventListener("click", () => {
        Render({ header: "My Day", layout: "myDay" });
        addTask();
        refreshAllLists();
    });

    const weekButton = document.querySelector(".upcomingWeek");
    weekButton.addEventListener("click", () => {
        Render({ header: "Next Seven Days", layout: "week" });
        addTask();
        refreshAllLists();
    });


    const personal = document.querySelector(".personal");
    personal.addEventListener("click", () => {
        Render({ header: "Personal", layout: "personal" });
        addTask();
        refreshAllLists();
    });

    const study = document.querySelector(".study");
    study.addEventListener("click", () => {
        Render({ header: "Study", layout: "study" });
        addTask();
        refreshAllLists();
    });

    const work = document.querySelector(".grocery");
    work.addEventListener("click", () => {
        Render({ header: "Grocery", layout: "grocery" });
        addTask();
        refreshAllLists();
    });
}

function retrieveSavedList() {
    myList.loadSave();
    refreshAllLists();
}