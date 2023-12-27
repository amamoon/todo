import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link"

export default async function Index() {


	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	
	const { data: { session }, error } = await supabase.auth.getSession()

	const loggedIn:boolean = !(session == null)

	return (
		<div className="flex-1 w-full flex flex-col gap-20 items-center">

			<div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
				<main className="flex-1 flex flex-col gap-6">
					<h2 className="font-bold text-4xl mb-4">Welcome to a basic Todo App</h2>
					{loggedIn ? 
					<p>navigate to the <Link className="underline" href={"/todo"}>app</Link></p> 
					:
					<p><Link className="underline" href={"/login"}>login or sign up</Link></p> 
					}
					<div>
						<p>built primarily using:</p>
						<ul>
							<li>nextjs & </li>
							<li>supabase</li>
						</ul>
					</div>
				</main>
			</div>

			<footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
				<p>
					<small>
						Copyright 2023 Akeef Mamoon
					</small>
				</p>
			</footer>
		</div>
	)
}
