import { Toaster } from '@/components/ui/toaster';
import { ClerkProvider } from '@clerk/nextjs';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import 'react-datepicker/dist/react-datepicker.css'
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'YOOM',
	description: 'A video conferencing app',
	icons: {
		icon: 'icon.ico',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<ClerkProvider
				appearance={{
					layout: {
						logoImageUrl: '/assets/icons/yoom-logo.svg',
						socialButtonsVariant: 'iconButton',
					},
					variables: {
						colorText: '#fff',
						colorPrimary: '#0e78f9',
						colorBackground: '#1c1f2e',
						colorInputBackground: '#252a41',
						colorInputText: '#fff',
					},
				}}>
				<body className={`${inter.className} bg-dark-2`}>
					{children}
					<Toaster />
				</body>
			</ClerkProvider>
		</html>
	);
}
