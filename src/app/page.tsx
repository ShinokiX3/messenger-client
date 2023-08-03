import Content from '@/screen/content/content';
import Menu from '@/screen/menu/menu';
import { redirect } from 'next/navigation';

export default function Home() {
	// TODO: temprry .main-mobile-overflow
	// h-screen

	redirect('/a');

	return (
		<main className="grid grid-cols-grid-side-medium h-[100dvh] main-mobile-overflow">
			<Menu />
			<Content />
		</main>
	);
}
