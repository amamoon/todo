import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const cookieStore = cookies()
	    const supabase = createClient(cookieStore)
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if(!user){
            throw Error("Unauthorized");
        }

        const { 
            data: todos,
            error
        } = await supabase.from('todos').select('*').eq("todos.user_id", user.id);

        return NextResponse.json(todos, { 
            status: 201 
        });
    } catch(error) {
        return new NextResponse(JSON.stringify(error), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function POST(request:NextRequest) {

    const current_time = ((new Date()).toISOString()).toLocaleString()

    try {
        const cookieStore = cookies();
	    const supabase = createClient(cookieStore);
        const { taskInput } = await request.json();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if(!user){
            throw Error("Unauthorized");
        }

        const {
            data,
            error
        } = await supabase
        .from("todos")
        .insert({task: taskInput, user_id: user.id, status: 'planned', created_at:current_time, last_modified: current_time})
        .select();

        if(error){
            throw Error(JSON.stringify(error))
        } else {
            revalidatePath('/todo')
        }

        return NextResponse.json(data, {
            status: 201
        })

    } catch(error) {
        return new NextResponse(JSON.stringify(error), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

// Update Task
export async function PUT(request:NextRequest) {

    const current_time = ((new Date()).toISOString()).toLocaleString()

    try {
        const cookieStore = cookies();
	    const supabase = createClient(cookieStore);
        const { updateTodo } = await request.json();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if(!user){
            throw Error("Unauthorized");
        }

        const {
            data,
            error
        } = await supabase
        .from("todos")
        .update({task: updateTodo.newTask, user_id: user.id, status: 'planned', created_at:current_time, last_modified: current_time})
        .eq('id', updateTodo.id)
        .select();

        return NextResponse.json(data, {
            status: 201
        })

    } catch(error) {
        return new NextResponse(JSON.stringify(error), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function DELETE(request:NextRequest) {
    try {
        const cookieStore = cookies();
	    const supabase = createClient(cookieStore);
        const { todoToDelete } = await request.json();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if(!user){
            throw Error("Unauthorized");
        }

        const {
            data,
            error
        } = await supabase
        .from("todos")
        .delete()
        .eq('id', todoToDelete)
        .select();

        if(error){
            throw Error(JSON.stringify(error))
        } else {
            revalidatePath('/todo')
        }

        return NextResponse.json(data, {
            status: 201
        })

    } catch(error) {
        return new NextResponse(JSON.stringify(error), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}