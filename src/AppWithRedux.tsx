import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
// BLL

    // const todoListID1 = v1()
    // const todoListID2 = v1()
    //
    // const [todoLists, dispatchToTodolist] = useReducer(todolistsReducer,[
    //     {id: todoListID1, title: "What to learn", filter: 'all'},
    //     {id: todoListID2, title: "What to buy", filter: 'all'}
    // ])
    //
    // let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
    //     [todoListID1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "ReactJS", isDone: false}
    //     ],
    //     [todoListID2]: [
    //         {id: v1(), title: "Beer", isDone: true},
    //         {id: v1(), title: "Fish", isDone: true},
    //         {id: v1(), title: "Chips", isDone: false}
    //     ]
    // })

    //const [filter, setFilter] = useState<FilterValuesType>('all')

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    const dispatch = useDispatch()

    const changeFilter = useCallback((filterValue: FilterValuesType, todoListID: string) => {
        const action = ChangeTodolistFilterAC(todoListID, filterValue)
        dispatch(action)
    },[dispatch])

    const removeTask = useCallback((taskId: string, todoListID: string) => {
        dispatch(removeTaskAC(taskId, todoListID))
    }, [dispatch])

    const addTask = useCallback((title: string, todoListID: string) => {
        const action = addTaskAC(title, todoListID)
        dispatch(action)
    }, [dispatch])

    const changeStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todoListID))
    },[dispatch])

    const removeTodoList = useCallback((todoListID: string) => {
        const action = RemoveTodolistAC(todoListID)
        dispatch(action)
    },[dispatch])

    const addTodolist = useCallback((title: string) => {
        const action = AddTodolistAC(title)
        dispatch(action)},[dispatch] )

    const changeTodolistTitle = useCallback((todoListID: string, title: string) => {
        const action = ChangeTodolistTitleAC(todoListID, title)
        dispatch(action)
    }, [dispatch])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed={true}>
                <Grid container={true} style={{padding: "15px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container={true} spacing={5}>
                    {
                        todoLists.map(tl => {
                            return (
                                <Grid item key={tl.id}>
                                    <Paper elevation={10} style={{padding: "15px", borderRadius: "10px"}}>
                                        <Todolist
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            addTask={addTask}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            changeStatus={changeStatus}
                                            filter={tl.filter}
                                            removeTodoList={removeTodoList}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
