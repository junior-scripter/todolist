import {FilterValuesType, TaskStateType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    todoListID: string
}

export type AddTodolistActionType = {
    type: "ADD-TODOLIST"
    title: string
    todoListID: string
}
export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    todoListID: string
}

export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    filter: FilterValuesType
    todoListID: string
}

const initialState: Array<TodoListType> = []

type ActionType = RemoveTodolistActionType | AddTodolistActionType |
    ChangeTodolistTitleActionType | ChangeTodolistFilterActionType


export const todolistsReducer = (state: Array<TodoListType> = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListID)
        case "ADD-TODOLIST":

            const newTodolist: TodoListType = {
                id: action.todoListID,
                title: action.title,
                filter: "all"
            }
            return [...state, newTodolist]
        case "CHANGE-TODOLIST-TITLE":
            const todoList = state.find(tl => tl.id === action.todoListID)
            if (todoList) {
                todoList.title = action.title
                return [...state]
            }
            return state
        case "CHANGE-TODOLIST-FILTER": {
            const todoList = state.find(tl => tl.id === action.todoListID)
            if (todoList) {
                todoList.filter = action.filter
                return [...state]
            }
            return state
        }
        default:
            return state
            //throw new Error("I don't understand this type")
    }
}



export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    // запрос на сервак...
    return { type: 'REMOVE-TODOLIST', todoListID: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: title, todoListID: v1()}
}
export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', title: title, todoListID: todolistId}
}
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, todoListID: todolistId}
}

