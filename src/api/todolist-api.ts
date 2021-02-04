import axios from "axios";

type TodolistType= {
    "id": string,
    "title": string,
    "addedDate": string,
    "order": number
}

type BaseResponseData<D = {}> = {
    resultCode: number,
    messages: Array<string>,
    fieldsErrors: Array<string>
    data: D
}

const settings = {
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        'API-KEY': '5a2b3fb2-7c49-4949-a6dd-56e44da3717f'
    }
}

const instance = axios.create({
    ...settings
})
export const todolistAPI = {

    updateTodolist(todolistId: string, title: string) {
        return instance.put<BaseResponseData>(`todo-lists/${todolistId}`, {title} )
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<BaseResponseData>(`todo-lists/${todolistId}`)
    },

    createTodolist(title: string) {
        return instance.post<BaseResponseData<{item:  TodolistType}>>('todo-lists', {title} )
    },
    getTodolist() {
        return instance.get<Array<TodolistType>>('todo-lists')
    }
}
