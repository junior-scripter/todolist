import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: "REMOVE_TODOLIST"
    todoListID: string
}

export type AddTodolistActionType = {
    type: "ADD_TODOLIST"
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: "CHANGE_TODOLIST_TITLE"
    title: string
    todoListID: string
}

export type ChangeTodolistFilterActionType = {
    type: "CHANGE_TODOLIST_FILTER"
    filter: FilterValuesType
    todoListID: string
}

type ActionType = RemoveTodolistActionType | AddTodolistActionType |
    ChangeTodolistTitleActionType | ChangeTodolistFilterActionType


export const todolistsReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE_TODOLIST":
            return state.filter(tl => tl.id !== action.todoListID)
        case "ADD_TODOLIST":
            const newTodolistID = v1()
            const newTodolist: TodoListType = {
                id: newTodolistID,
                title: action.title,
                filter: "all"
            }
            return [...state, newTodolist]
        case "CHANGE_TODOLIST_TITLE":
            const todoList = state.find(tl => tl.id === action.todoListID)
            if (todoList) {
                todoList.title = action.title
                return [...state]
            }
            return state
        case "CHANGE_TODOLIST_FILTER": {
            const todoList = state.find(tl => tl.id === action.todoListID)
            if (todoList) {
                todoList.filter = action.filter
                return [...state]
            }
            return state
        }
        default:
            //return state
            throw new Error("I don't understand this type")
    }
}



export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    // запрос на сервак...
    return { type: 'REMOVE_TODOLIST', todoListID: todolistId}
}
