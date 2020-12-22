import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddBox, TextFields} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addItem()
    }

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError("Title is required!")
        }
        setTitle("")
    }

    return (
        <div>
            <TextField
                variant={"outlined"}
                value={title}
                onChange={onChangeHandler}// читаем из инпута, что написано пользователем
                onKeyPress={onKeyPressEnter} // при клике на кнопку "Enter", происходит событие, добавление из инпута новая таска.
                className={error ? "error" : ""} // если error, то выполняется "error" иначе ""
                label={"Title"}
                error={!!error}
                helperText={error}
            />
            <IconButton color={"primary"}
                        onClick={addItem}>
                <AddBox />
            </IconButton>
            {/*<Button
                variant={"contained"}
                color={"primary"}
                onClick={addItem}>+</Button>*/}
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )
}

export default AddItemForm;