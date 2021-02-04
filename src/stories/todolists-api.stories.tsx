import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const promise = todolistAPI.getTodolist()
        promise.then((response) => {
            setState(response.data)
        })

        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = ''
        const promise = todolistAPI.createTodolist(title)
        promise.then((response) => {
            setState(response.data.data.item)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'e42f8aed-b673-4b55-9b49-277c9c4ce40a'
        const promise = todolistAPI.deleteTodolist(todolistId)
        promise.then((response) => {
            setState(response.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = ''
        const title = 'Angular >>> !!!!'
        const promise = todolistAPI.updateTodolist(todolistId,title)
        promise.then((response) => {
            setState(response.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
