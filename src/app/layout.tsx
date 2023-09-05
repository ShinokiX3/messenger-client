import { RxProvider } from '@/store/provider';
import { Inter } from 'next/font/google';
import './globals.css';
import { getCookies } from 'cookies-next';
const { parseCookies, setCookie, destroyCookie } = require('nookies');
import { headers, cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Messenger',
	description: 'Messaging application',
	icons: {
		icon: './favicon.ico',
		apple: './apple-touch-icon.png',
		shortcut: ['./src/common/img/apple-touch-icon.png'],
	},
	manifest: '/src/common/img/site.webmanifest',
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="text-default-font-size text-color-text scrollbar">
				<RxProvider>{children}</RxProvider>
			</body>
		</html>
	);
}
