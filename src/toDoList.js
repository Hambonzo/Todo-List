import { isToday, isTomorrow, addDays, parseISO, isSameDay } from "date-fns";


export function toDoList() {
    const arr = [];

    function addItem(item) {
        arr.push(item)

        saveChanges();
    }

    function removeItem(item) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === item) {
                arr.splice(i, 1);
                saveChanges();
            }
        }
    }

    function getItem(item) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === item) {
                return arr[i];
            }
        }
    }

    function getItemById(id) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === id) {
                return arr[i];
            }
        }
    }

    function getAllItems() {
        return arr;
    }

    function todayList() {
        return arr.filter(item => {
            if (!item.dueDate) return true;
            const dueDate = parseISO(item.dueDate);
            return isToday(dueDate);
        });
    }

    function tomorrowList() {
        return arr.filter(item => {
            if (!item.dueDate) return false;
            const dueDate = parseISO(item.dueDate);
            return isTomorrow(dueDate);
        });

    }

    function listOfTaskType(taskType) {
        return arr.filter(item => {
            return item.type === taskType;
        });

    }

    function daysFromToday(number) {
        return arr.filter(item => {
            if (!item.dueDate) return false;

            const dueDate = parseISO(item.dueDate)

            const targetDay = addDays(new Date(), number);

            return isSameDay(dueDate, targetDay);
        });
    }

    function upcomingList() {
        return arr.filter(item => {
            if (!item.dueDate) return false;

            const dueDate = parseISO(item.dueDate);

            if (!isToday(dueDate) && !isTomorrow(dueDate)) {
                return dueDate;
            }
        });

    }

    function saveChanges() {
        let arr_serialized = JSON.stringify(arr);
        localStorage.setItem("masterList", arr_serialized);
    }

    function loadSave() {
        let stringArr = localStorage.getItem("masterList");
        if (!stringArr) return;

        let parsedArr = JSON.parse(stringArr);
        for (const item of parsedArr) {
            arr.push(item);
        }
    }


    return {
        addItem,
        removeItem,
        getItem,
        getAllItems,
        getItemById,
        todayList,
        tomorrowList,
        upcomingList,
        listOfTaskType,
        saveChanges,
        loadSave,
        daysFromToday
    };



}

export const myList = toDoList();

