import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

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

function App() {
// BLL

    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn", filter: 'all'},
        {id: todoListID2, title: "What to buy", filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [todoListID2]: [
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Fish", isDone: true},
            {id: v1(), title: "Chips", isDone: false}
        ]
    })

    //const [filter, setFilter] = useState<FilterValuesType>('all')


    function changeFilter(filterValue: FilterValuesType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = filterValue
            setTodoLists([...todoLists])
        }
    }

    function removeTask(taskId: string, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        tasks[todoListID] = todoListTasks.filter(t => t.id !== taskId)
        setTasks({...tasks})
        //const filterTasks = tasks.filter(task => task.id !== taskId)
        //setTasks(filterTasks)
    }

    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks})
        //setTasks([newTask, ...tasks])
    }

    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
        const todoListTasks = tasks[todoListID] // массив
        const task = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
        //const task = tasks.find(t => t.id === taskID)
        // псевдоложь (false) = 0, -0, null, "", NaN, undefined
        //if (task) {
        //    task.isDone = isDone
        //    setTasks([...tasks])
        // }
    }

    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        const todoListTasks = tasks[todoListID] // массив
        const task = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
        //const task = tasks.find(t => t.id === taskID)
        // псевдоложь (false) = 0, -0, null, "", NaN, undefined
        //if (task) {
        //    task.isDone = isDone
        //    setTasks([...tasks])
        // }
    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id != todoListID))
        delete tasks[todoListID]
        setTasks({...tasks})

    }

    function addTodolist(title: string) {
        const newTodolistID = v1()
        const newTodolist: TodoListType = {
            id: newTodolistID,
            title: title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodolist])
        setTasks({
            ...tasks,
            [newTodolistID]: []
        })
    }

    function changeTodolistTitle(todoListID: string, title: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.title = title
            setTodoLists([...todoLists])
        }
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start"  color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" >
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
                    // let taskForTodolist = tasks[tl.id]
                    // if (tl.filter === 'active') {
                    //     taskForTodolist = tasks[tl.id].filter(task => !task.isDone)
                    // }
                    // if (tl.filter === 'completed') {
                    //     taskForTodolist = tasks[tl.id].filter(task => task.isDone)
                    // }
                    return (
                        <Grid item>
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

export default App;
