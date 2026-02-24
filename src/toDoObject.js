export function makeTodoItem(title) {
    return {
        id: crypto.randomUUID(),
        title,
        description: "",
        completed: false,
        priority: false,
        dueDate: "",
        type: "personal"
    };
} 