import { isToday, isTomorrow, format, addDays, getDate } from "date-fns";

export function renderAddTask() {
    const addTask = document.createElement("div");
    addTask.className = "addDiv";

    const addTaskButton = document.createElement("textarea");
    addTaskButton.className = "addTask"
    addTaskButton.placeholder = " + Add Task";

    addTask.appendChild(addTaskButton)
    return { addTask }
}

export const taskDetailsManager = (() => {
    let panel = null;
    let currentlyOpenTaskId = null;

    function render(taskId) {
        if (!panel) {
            panel = document.createElement("div");
            panel.className = "taskDetails";
        }

        if (!panel.isConnected) {
            document.querySelector(".mainArea").appendChild(panel);
        }

        currentlyOpenTaskId = taskId;
        return panel
    };

    function getCurrentTaskId() {
        return currentlyOpenTaskId;
    }

    function clear() {
        if (panel) {
            panel.innerHTML = ""
        }
        currentlyOpenTaskId = null;
    }

    return {
        render,
        getCurrentTaskId,
        clear
    }
})();

function getDay(number) {
    const date = new Date();
    if (number === 0) {
        return format(date, "EEEE");
    }

    else {
        const futureDate = addDays(date, number);
        return format(futureDate, "EEEE");
    }
}


export function Render(options) {
    function renderHeader() {
        const headerDiv = document.querySelector(".header");
        headerDiv.innerHTML = "";

        const h1 = document.createElement("h1");
        h1.textContent = options.header;

        headerDiv.appendChild(h1);
    }

    function renderMyLists() {
        renderHeader();

        const mainArea = document.querySelector(".mainArea");
        mainArea.innerHTML = "";

        const taskContainer = document.createElement("div");
        taskContainer.className = "allTasksContainer";

        const taskList = document.createElement("ul");
        taskContainer.appendChild(taskList);

        const addTaskObject = renderAddTask();
        taskContainer.appendChild(addTaskObject.addTask);

        mainArea.appendChild(taskContainer);
    }

    function renderTaskType(taskType) {
        renderHeader();

        const mainArea = document.querySelector(".mainArea");
        mainArea.innerHTML = "";

        const taskContainer = document.createElement("div");
        taskContainer.className = "taskTypeContainer";

        const taskList = document.createElement("ul");
        taskList.className = taskType + "Ul";

        taskContainer.appendChild(taskList);

        const addTaskObject = renderAddTask();
        taskContainer.appendChild(addTaskObject.addTask);

        mainArea.appendChild(taskContainer);
    }

    function renderMyDay() {
        renderHeader();

        const mainArea = document.querySelector(".mainArea");
        mainArea.innerHTML = "";

        const todayContainer = document.createElement("div");
        todayContainer.className = "myDay";

        const myDayList = document.createElement("ul");
        myDayList.className = "myDayList";
        todayContainer.appendChild(myDayList);

        const addTaskObject = renderAddTask();
        todayContainer.appendChild(addTaskObject.addTask);

        mainArea.appendChild(todayContainer);
    }

    function renderWeek() {
        renderHeader();

        const mainArea = document.querySelector(".mainArea");
        mainArea.innerHTML = "";

        const weekContainer = document.createElement("div");
        weekContainer.className = "week";

        const todayDiv = document.createElement("div");
        const headerToday = document.createElement("h2");
        const formatToday = getDay(0);
        headerToday.textContent = formatToday + " (Today)";
        const todayList = document.createElement("ul");
        todayList.className = "weekToday";
        todayDiv.append(headerToday, todayList);

        const tmrwDiv = document.createElement("div");
        const headerTmrw = document.createElement("h2");
        const formatTmrw = getDay(1);
        headerTmrw.textContent = formatTmrw + " (Tomorrow)";
        const tmrwList = document.createElement("ul");
        tmrwList.className = "weekTmrw";
        tmrwDiv.append(headerTmrw, tmrwList);

        const tmrwPLusOne = document.createElement("div");
        const headerPlusOne = document.createElement("h2");
        const threeDays = getDay(2);
        headerPlusOne.textContent = threeDays;
        const tmrwPlusOneList = document.createElement("ul");
        tmrwPlusOneList.className = "plusOne";
        tmrwPLusOne.append(headerPlusOne, tmrwPlusOneList);

        const tmrwPLusTwo = document.createElement("div");
        const headerPlusTwo = document.createElement("h2");
        const fourDays = getDay(3);
        headerPlusTwo.textContent = fourDays;
        const tmrwPlusTwoList = document.createElement("ul");
        tmrwPlusTwoList.className = "plusTwo";
        tmrwPLusTwo.append(headerPlusTwo, tmrwPlusTwoList);

        const tmrwPLusThree = document.createElement("div");
        const headerPlusThree = document.createElement("h2");
        const fiveDays = getDay(4);
        headerPlusThree.textContent = fiveDays;
        const tmrwPlusThreeList = document.createElement("ul");
        tmrwPlusThreeList.className = "plusThree";
        tmrwPLusThree.append(headerPlusThree, tmrwPlusThreeList);

        const tmrwPLusFour = document.createElement("div");
        const headerPlusFour = document.createElement("h2");
        const sixDays = getDay(5);
        headerPlusFour.textContent = sixDays;
        const tmrwPlusFourList = document.createElement("ul");
        tmrwPlusFourList.className = "plusFour";
        tmrwPLusFour.append(headerPlusFour, tmrwPlusFourList);

        const tmrwPLusFive = document.createElement("div");
        const headerPlusFive = document.createElement("h2");
        const sevenDays = getDay(6);
        headerPlusFive.textContent = sevenDays;
        const tmrwPlusFiveList = document.createElement("ul");
        tmrwPlusFiveList.className = "plusFive";
        tmrwPLusFive.append(headerPlusFive, tmrwPlusFiveList);

        const addTaskField = renderAddTask();

        weekContainer.append(todayDiv, tmrwDiv, tmrwPLusOne, tmrwPLusTwo, tmrwPLusThree, tmrwPLusFour, tmrwPLusFive, addTaskField.addTask);

        mainArea.appendChild(weekContainer);
    }

    function renderAllTasks() {
        renderHeader();

        const mainArea = document.querySelector(".mainArea");
        mainArea.innerHTML = "";

        const taskDays = document.createElement("div");
        taskDays.className = "allTasksContainer";


        const today = document.createElement("div");
        const todayHeader = document.createElement("h2");
        todayHeader.textContent = "Today"
        const todayList = document.createElement("ul");
        todayList.className = "today";
        today.append(todayHeader, todayList);

        const tomorrow = document.createElement("div");
        const tomorrowHeader = document.createElement("h2");
        tomorrowHeader.textContent = "Tomorrow";
        const tomorrowList = document.createElement("ul");
        tomorrowList.className = "tomorrow";
        tomorrow.append(tomorrowHeader, tomorrowList);

        const upcoming = document.createElement("div");
        const upcomingHeader = document.createElement("h2");
        upcomingHeader.textContent = "Upcoming";
        const upcomingList = document.createElement("ul");
        upcomingList.className = "upcoming";
        upcoming.append(upcomingHeader, upcomingList);

        const addTaskObject = renderAddTask();

        taskDays.append(today, tomorrow, upcoming, addTaskObject.addTask);
        mainArea.appendChild(taskDays);

    }




    if (options.layout === "allTasks") {
        renderAllTasks();
    }

    if (options.layout === "myLists") {
        renderMyLists();
    }

    if (options.layout === "myDay") {
        renderMyDay();
    }

    if (options.layout === "week") {
        renderWeek();
    }

    if (options.layout === "personal") {
        renderTaskType("personal");
    }

    if (options.layout === "study") {
        renderTaskType("study");
    }

    if (options.layout === "grocery") {
        renderTaskType("grocery");
    }
}
