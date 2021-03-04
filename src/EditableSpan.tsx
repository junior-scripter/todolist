import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    value: string
    getNewTitle: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log("Editable span")
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.value)

    const onEditMode = () => {
        setEditMode(true)
    }

    const offEditMode = () => {
        setEditMode(false)
        if (title.trim()) {
            props.getNewTitle(title.trim())
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <TextField
                value={title}
                onBlur={offEditMode}
                autoFocus={true}
                onChange={onChangeHandler}
            />
            : <span onDoubleClick={onEditMode}>{title}</span>
    )
})

export default EditableSpan;
