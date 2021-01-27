import React, {ChangeEvent, FunctionComponent} from 'react';
import {Button, Checkbox} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./AppWithRedux";

export type TaskPropsType = {
    task: TaskType
    todolistId: string,
    removeTask: (taskId: string, todoListID: string) => void,
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
}

const Task = React.memo((props: TaskPropsType) => {
    console.log("Task")
    const removeTask = () => {
        props.removeTask(props.task.id, props.todolistId)
    }

    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.task.id, e.currentTarget.checked, props.todolistId)
    }

    const changeTaskTitle = (title: string) => {
        props.changeTaskTitle(props.task.id, props.task.title, props.todolistId)
    }

    return (
        <li>
            <Checkbox
                color={"primary"}
                checked={props.task.isDone}
                onChange={changeStatus}
            />

            <span className={props.task.isDone ? 'is-done' : ''}>
        <EditableSpan value={props.task.title} getNewTitle={changeTaskTitle}/>
        </span>
            <Button onClick={removeTask}>
                <Delete/>
            </Button>
        </li>);
})

export default Task;