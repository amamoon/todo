'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
}

export default function Form(){

    const [taskInput, setTaskInput] = useState('');
    const router = useRouter();

    const handleSubmit = async () => {
        const createResponse = await fetch('/api/todo', {
            method: 'POST',
            headers: defaultHeaders,
            body: JSON.stringify({
                taskInput: taskInput
            })
        })
        router.refresh();
    }

    return(
        <form onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
        }}>
            <input 
                className="rounded w-full p-2"
                type="text" 
                name="taskInput"
                value={taskInput}
                onChange={(e) => {
                    setTaskInput(e.target.value)
                }}
            />
            <button type="submit">
                Add
            </button>
        </form>
    )


}