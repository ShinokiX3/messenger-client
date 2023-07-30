import Content from '@/screen/content/content';
import Menu from '@/screen/menu/menu';

export default function Home() {
	// TODO: temprry .main-mobile-overflow
	return (
		<main className="grid grid-cols-grid-side-medium h-screen main-mobile-overflow">
			<Menu />
			<Content />
		</main>
	);
}
