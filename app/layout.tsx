import { GeistSans } from 'geist/font/sans';
import './globals.css';
import AuthButton from '@/components/AuthButton';
import Link from 'next/link';

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: 'http://localhost:3000'

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: 'Next.js and Supabase Starter Kit',
	description: 'The fastest way to build apps with Next.js and Supabase',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className={GeistSans.className}>
			<body className="bg-background text-foreground">
				<nav className="w-full flex border-b border-b-foreground/10 h-16">
					<div className='w-1/2 max-w-4xl flex justify-between p-3 text-sm flex-row text-left'>
						<button className='py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover'>
							<Link href={"/"}>Home</Link>
						</button>
					</div>
					<div className="w-1/2 max-w-4xl flex justify-between p-3 text-sm flex-row-reverse text-right">
						<AuthButton />
					</div>
				</nav>
				<main className="min-h-screen flex flex-col items-center p-4">
					{children}
				</main>
			</body>
		</html>
	)
}
