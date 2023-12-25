'use client';

import { useRouter } from "next/navigation";
import { TodoRow } from "../models/models";

const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
}

export function Todo(todo:TodoRow){

    const todoToDelete = todo.id;
    const router = useRouter();

    const handleDelete = async () => {
        const deleteResponse = await fetch('/api/todo', {
            method: 'DELETE',
            headers: defaultHeaders,
            body: JSON.stringify({
                todoToDelete: todoToDelete
            })
        })
        router.refresh();
    }

    return(
        <>
            <li key={todo.id}>
                {todo.task}
            </li>
            <button
                value={todoToDelete}
                onClick={(e) => {
                    e.preventDefault()
                    handleDelete()
                }}>
                    Delete
            </button>
        </>
    )
}