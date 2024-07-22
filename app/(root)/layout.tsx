import StreamVideoProvider from '@/providers/StreamClientProvider';
import { Metadata } from 'next';
import React, { ReactNode } from 'react';

export const metadata: Metadata = {
	title: 'YOOM',
	description: 'A video conferencing app',
	icons: {
		icon: 'icon.ico',
	},
};

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<main>
			<StreamVideoProvider>{children}</StreamVideoProvider>
		</main>
	);
};

export default RootLayout;
