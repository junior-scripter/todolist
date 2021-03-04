import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskId: string
    todolistId: string
}

export type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    todoListId: string
}

export type ChangeTaskStatusACType = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    isDone: boolean
    todoListId: string
}

export type ChangeTaskTitleACType = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    title: string
    todoListId: string
}

type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodolistActionType
    | RemoveTodolistActionType

const initialState: TaskStateType= {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id != action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            let copyState = {...state}
            let task = {
                id: v1(),
                isDone: false,
                title: action.title}
            copyState[action.todoListId] = [task, ...copyState[action.todoListId]]
            return copyState
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => {
                    if (task.id !== action.taskId) {
                        return task
                    } else {
                        return {...task, isDone: action.isDone}
                    }
                }),
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(task => {
                    if (task.id !== action.taskId) {
                        return task
                    } else {
                        return {...task, title: action.title}
                    }
                })
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todoListID]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            delete  state[action.todoListID]
            return {...state}
        }
        default:
            return state
            //throw new Error("I don't understand this type")
    }
}


export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    // запрос на сервак...
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}

export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    // запрос на сервак...
    return {type: 'ADD-TASK', title: title, todoListId: todoListId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): ChangeTaskStatusACType => {
    // запрос на сервак...
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todoListId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): ChangeTaskTitleACType => {
    // запрос на сервак...
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todoListId}
}
