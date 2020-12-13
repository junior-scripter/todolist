import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (filterValue: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
}


export function Todolist(props: PropsType) {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const tasks = props.tasks.map(taskObj => {
        const removeTask = () => {
            props.removeTask(taskObj.id, props.id)
        }

        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(taskObj.id, e.currentTarget.checked, props.id)
        }
        return (
            <li key={taskObj.id} className={taskObj.isDone ? "is-done" : ""}>
                <input
                    onChange={changeStatus}
                    type="checkbox"
                    checked={taskObj.isDone}
                />
                <span>{taskObj.title}</span>
                <button onClick={removeTask}>X</button>
            </li>
        )
    })

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.id)

        } else {
            setError("Title is required!")
        }
        setTitle("")
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const onKeyPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addTask()
    }
    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }
    const removeTodolist = ()=>{props.removeTodoList(props.id)}

    return <div>
        <h3>{props.title}<button onClick={removeTodolist}>x</button></h3>
        <div>
            <input
                value={title}
                onChange={onChangeHandler}// читаем из инпута, что написано пользователем
                onKeyPress={onKeyPressEnter} // при клике на кнопку "Enter", происходит событие, добавление из инпута новая таска.
                className={error ? "error" : ""} // если error, то выполняется "error" иначе ""
            />
            <button onClick={addTask}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
        <ul>
            {tasks}
        </ul>
        <div>
            <button
                className={props.filter === "all" ? "active-filter" : ""}
                onClick={onAllClickHandler}>All</button>
            <button
                className={props.filter === "active" ? "active-filter" : ""}
                onClick={onActiveClickHandler}>Active</button>
            <button
                className={props.filter === "completed" ? "active-filter" : ""}
                onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}