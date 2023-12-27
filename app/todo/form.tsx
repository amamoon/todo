'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TodoRow } from "../models/models";

const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
}

export default function Form(){

    const [taskInput, setTaskInput] = useState('');
    const router = useRouter();

    const handleSubmit = async () => {
        
        const createResponse = 
            await fetch('/api/todo', {
                method: 'POST',
                headers: defaultHeaders,
                body: JSON.stringify({
                    taskInput: taskInput
                })
            })
        setTaskInput('')
        router.refresh();
    }

    return(
        <form 
        className="flex p-2 flex-row"
        onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
        }}>
            <input 
                className="rounded w-full text-black mr-2"
                type="text" 
                name="taskInput"
                placeholder="get milk"
                value={taskInput}
                onChange={(e) => {
                    setTaskInput(e.target.value)
                }}
            />
            <button 
                className="text-white bg-blue-700 font-medium rounded-sm p-2"
                type="submit">
                Add
            </button>
        </form>
    )


}