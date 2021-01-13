import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodolistTitle: (todoListID: string, title: string) => void
}


export function Todolist(props: PropsType) {

    //const todolist = useSelector<AppRootStateType, TodoListType>(state => state.todolists.filter(todo => todo.id === props.id)[0])
    //const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])

    const tasks = props.tasks.map(taskObj => {
        const removeTask = () => {
            props.removeTask(taskObj.id, props.id)
        }

        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(taskObj.id, e.currentTarget.checked, props.id)
        }

        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(taskObj.id, title, props.id)
        }
        return (
            <li key={taskObj.id} className={taskObj.isDone ? "is-done" : ""}>
                <Checkbox
                    color={"primary"}
                    onChange={changeStatus}
                    checked={taskObj.isDone}
                />
                {/*<input
                    onChange={changeStatus}
                    type="checkbox"
                    checked={taskObj.isDone}
                />*/}
                <EditableSpan value={taskObj.title} getNewTitle={changeTaskTitle}/>
                <IconButton onClick={removeTask}><Delete/></IconButton>
                {/*<button onClick={removeTask}>x</button>*/}
            </li>
        )
    })
    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }
    const removeTodolist = () => {
        props.removeTodoList(props.id)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title)
    }

    return <div>
        <h3>
            <EditableSpan value={props.title} getNewTitle={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
            {/*<button onClick={removeTodolist}>x</button>*/}
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul style={{listStyle: "none", paddingLeft: "0"}}>
            {tasks}
        </ul>
        <div style={{textAlign: "center"}}>
            <ButtonGroup size={"small"} color={"primary"}>
                <Button
                    variant={props.filter === "all" ? "contained" : "outlined"}
                    onClick={onAllClickHandler}
                    color={"default"}
                >All
                </Button>
                <Button
                    variant={props.filter === "active" ? "contained" : "outlined"}
                    onClick={onActiveClickHandler}
                    color={"primary"}
                >Active
                </Button>
                <Button
                    variant={props.filter === "completed" ? "contained" : "outlined"}
                    onClick={onCompletedClickHandler}
                    color={"secondary"}
                >Completed
                </Button>
            </ButtonGroup>
        </div>
    </div>
}