import React, {useCallback} from "react";
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {AppRootStateType} from "./state/store";
import {useSelector} from "react-redux";
import Task from "./Task";

type PropsType = {
    id: string
    title: string
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (filterValue: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodolistTitle: (todoListID: string, title: string) => void
}


export const Todolist = React.memo((props: PropsType) => {
    console.log("Todolist called")

    //const todolist = useSelector<AppRootStateType, TodoListType>(state => state.todolists.filter(todo => todo.id === props.id)[0])
    const tasks1 = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])


    const onAllClickHandler =() => {
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
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)
    }, [props.changeTodolistTitle, props.id])


    let taskForTodolist = tasks1
    if (props.filter === 'active') {
        taskForTodolist = tasks1.filter(task => !task.isDone)
    }
    if (props.filter === 'completed') {
        taskForTodolist = tasks1.filter(task => task.isDone)
    }

    const tasks = taskForTodolist.map((taskObj) => {

        return (
            <Task key={taskObj.id}
                   task={taskObj}
                   todolistId={props.id}
                   removeTask={props.removeTask}
                   changeStatus={props.changeStatus}
                   changeTaskTitle={props.changeTaskTitle}/>
        )
    })


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
})