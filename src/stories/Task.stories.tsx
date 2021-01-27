import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/react/types-6-0';
import Task, {TaskPropsType} from "../Task";
import {action} from "@storybook/addon-actions";


export default {
    title: 'Todolist/Task',
    component: Task,
} as Meta;

const changeStatusCallBack = action('Status changed inside task')
const removeTaskCallBack = action('Remove changed inside task')
const changeTaskTitleCallBack = action('Tittle changed inside task')

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

const baseArgs = {
    changeStatus: changeStatusCallBack,
    removeTask:  removeTaskCallBack,
    changeTaskTitle: changeTaskTitleCallBack
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: '1', isDone: true, title: 'JS'},
    todolistId: 'TodolistId1'
};
export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: '2', isDone: false, title: 'CSS'},
    todolistId: 'TodolistId2'
};

// import React from 'react';
// import { Story, Meta } from '@storybook/react/types-6-0';
// import { action } from '@storybook/addon-actions';
// import Task, {TaskPropsType} from "../Task";
//
//
// export default {
//     title: 'Todolist/Task',
//     component: Task,
//     args: {
//         removeTask: action('Remove button inside Task clicked'),
//         changeTaskStatus: action('Status changed inside Task'),
//         changeTaskTitle: action('Tittle changed inside Task')
//     },
// } as Meta;
//
// const Template: Story<TaskPropsType> = (args) => <Task {...args} />;
// export const TaskIsDoneExample = Template.bind({});
// TaskIsDoneExample.args = {
//     taskId: '1',
//     isDone: true,
//     title: 'CSS',
//     todolistId: 'todolistId1',
// };
//
// export const TaskIsNotDoneExample = Template.bind({});
// TaskIsNotDoneExample.args = {
//     taskId: '2',
//     isDone: false,
//     title: 'JS',
//     todolistId: 'todolistId2',
// };
