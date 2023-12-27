'use client';

import { useRouter } from "next/navigation";
import { endianness } from "os";
import { useState } from "react";
import { TodoRow } from "../models/models";
import Form from "./form";

const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
}

export function Todo(todo:TodoRow){
    const [isEdit, setIsEdit] = useState(false)
    const [editedTask, setEditedTask] = useState('')
    const todoToDelete = todo.id;
    const router = useRouter();

    const handleDelete = async () => {
        await fetch('/api/todo', {
            method: 'DELETE',
            headers: defaultHeaders,
            body: JSON.stringify({
                todoToDelete: todoToDelete
            })
        })
        router.refresh();
    }

    const handleEditButton = async () => {
        setIsEdit(true);
        router.refresh()
    }

    const handleEditSubmit = async () => {
        await fetch('/api/todo', {
            method: 'PUT',
            headers: defaultHeaders,
            body: JSON.stringify({
                updateTodo: {
                    newTask: editedTask,
                    id: todoToDelete
                }
            })
        })
        setIsEdit(false);
        router.refresh()
    }

    return(
        <tr>
            <td>
                {
                    isEdit ? <form 
                    className="flex p-2 flex-row"
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleEditSubmit()
                    }}>
                        <input 
                            className="rounded w-full text-black mr-2"
                            type="text" 
                            name="taskInput"
                            placeholder={isEdit ? todo.task : "get milk"}
                            value={editedTask}
                            onChange={(e) => {
                                setEditedTask(e.target.value)
                            }}
                        />
                        <button 
                            className="text-white bg-blue-700 font-medium rounded-sm p-2"
                            type="submit">
                            Add
                        </button>
                    </form>:<p className="font-medium text-gray-900 truncate dark:text-white">{todo.task}</p>
                }
            </td>
            <td><p>{todo.status}</p></td>
            <td>
                {
                    isEdit ? <></> :
                    <button
                        className="text-white bg-blue-700 font-medium rounded-sm p-2"
                        onClick={(e) => {
                            e.preventDefault()
                            handleEditButton()
                        }}
                    >
                        edit
                    </button>
                }
            </td>
            <td>
                <button
                className="text-white bg-red-700 font-medium rounded-sm p-2"
                value={todoToDelete}
                onClick={(e) => {
                    e.preventDefault()
                    handleDelete()
                }}>
                    Delete
                </button>
            </td>
        </tr>
    )
}