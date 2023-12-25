import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Form from './form'
import { Todo } from './todo'
import { TodoRow } from '../models/models'

export default async function Page() {

	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if(!user){
		throw Error('Unauthorized');
	}

	const {
		data: todos,
		error
	} = await supabase.from('todos').select().eq("user_id", user.id);

	if(error) throw Error(JSON.stringify(error))

	return (
		<>
			<h1>Welcome {user.email}</h1>
			<p>Add a new task here</p>
			<Form />
			<h1>Tasks:</h1>
			{
				(todos?.length != 0 && todos) ? todos.map((todo:TodoRow) => {
					return <Todo key={todo.id} id={todo.id} user_id={todo.user_id} task={todo.task} is_complete={todo.is_complete} created_at={todo.created_at} completed_date={todo.completed_date} status={todo.status} last_modified={todo.last_modified}/>
				})
				:
				<p>No todos for user: {user.email}</p>
			}
		</>
	)
}