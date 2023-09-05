import { Inter } from 'next/font/google';
import Menu from '@/screen/menu/menu';
import { headers, cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Chats',
	description: 'All the chats listed here',
};

async function verifyUser() {
	const nextCookies = cookies();
	const token = nextCookies.get('token');

	if (!token) redirect('/auth');

	const user = await fetch(
		'https://messenger-server-six.vercel.app/auth/check',
		{
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token.value}`,
			},
		}
	).then((data) => data.json());

	if (user.statusCode === '500') redirect('/auth');
	else return user;
}

// TODO: trying dvh value, prev value is h-screen

export default async function ALayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await verifyUser();
	return (
		<main className="grid grid-cols-grid-side-medium h-screen-dvh main-mobile-overflow">
			<Menu />
			{children}
		</main>
	);
}
