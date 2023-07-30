import { Inter } from 'next/font/google';
import Menu from '@/screen/menu/menu';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

async function getResources() {
	const res = await fetch('https://example.com/api/resources');
	// Handle errors
	return res.json();
}

export default function ALayout({ children }: { children: React.ReactNode }) {
	return (
		<main className="grid grid-cols-grid-side-medium h-screen main-mobile-overflow">
			<Menu />
			{children}
		</main>
	);
}
